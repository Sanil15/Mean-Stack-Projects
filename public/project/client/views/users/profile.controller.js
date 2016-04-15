/**
 * Created by Sanil on 3/1/2016.
 */

(function(){

    'use strict';

    angular
        .module("CarPoolApp")
        .controller("ProfileController",ProfileController)

    function ProfileController(UserService,$routeParams, $location, ReviewService, MessageService) {

        var vm = this;
        vm.createReview=createReview;
        vm.updateReview= updateReview;
        vm.sendMessage = sendMessage;

        function init() {

            UserService.findUserById($routeParams.username)
                .then(function(response){
                    if(response.data){
                        vm.user=response.data;
                        return ReviewService.findAllReviewsForUser(vm.user.username);
                    }
                })
                .then(function(response){
                    vm.reviews=response.data;
                });

            vm.review={};
            vm.message={};

            var __slice = [].slice;

            (function($, window) {
                var Starrr;

                Starrr = (function() {
                    Starrr.prototype.defaults = {
                        rating: void 0,
                        numStars: 5,
                        change: function(e, value) {}
                    };

                    function Starrr($el, options) {
                        var i, _, _ref,
                            _this = this;

                        this.options = $.extend({}, this.defaults, options);
                        this.$el = $el;
                        _ref = this.defaults;
                        for (i in _ref) {
                            _ = _ref[i];
                            if (this.$el.data(i) != null) {
                                this.options[i] = this.$el.data(i);
                            }
                        }
                        this.createStars();
                        this.syncRating();
                        this.$el.on('mouseover.starrr', 'span', function(e) {
                            return _this.syncRating(_this.$el.find('span').index(e.currentTarget) + 1);
                        });
                        this.$el.on('mouseout.starrr', function() {
                            return _this.syncRating();
                        });
                        this.$el.on('click.starrr', 'span', function(e) {
                            return _this.setRating(_this.$el.find('span').index(e.currentTarget) + 1);
                        });
                        this.$el.on('starrr:change', this.options.change);
                    }

                    Starrr.prototype.createStars = function() {
                        var _i, _ref, _results;

                        _results = [];
                        for (_i = 1, _ref = this.options.numStars; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
                            _results.push(this.$el.append("<span class='btn btn-danger glyphicon .glyphicon-star-empty-2x'></span>"));
                        }
                        return _results;
                    };

                    Starrr.prototype.setRating = function(rating) {
                        if (this.options.rating === rating) {
                            rating = void 0;
                        }
                        this.options.rating = rating;
                        this.syncRating();
                        return this.$el.trigger('starrr:change', rating);
                    };

                    Starrr.prototype.syncRating = function(rating) {
                        var i, _i, _j, _ref;

                        rating || (rating = this.options.rating);
                        if (rating) {
                            for (i = _i = 0, _ref = rating - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                                this.$el.find('span').eq(i).removeClass('glyphicon-star-empty').addClass('glyphicon-star');
                            }
                        }
                        if (rating && rating < 5) {
                            for (i = _j = rating; rating <= 4 ? _j <= 4 : _j >= 4; i = rating <= 4 ? ++_j : --_j) {
                                this.$el.find('span').eq(i).removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                            }
                        }
                        if (!rating) {
                            return this.$el.find('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                        }
                    };

                    return Starrr;

                })();
                return $.fn.extend({
                    starrr: function() {
                        var args, option;

                        option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                        return this.each(function() {
                            var data;

                            data = $(this).data('star-rating');
                            if (!data) {
                                $(this).data('star-rating', (data = new Starrr($(this), option)));
                            }
                            if (typeof option === 'string') {
                                return data[option].apply(data, args);
                            }
                        });
                    }
                });
            })(window.jQuery, window);

            $(function() {
                return $(".starrr").starrr();
            });

            $( document ).ready(function() {

                $('#stars').on('starrr:change', function(e, value){
                    $('#count').html(value);
                    vm.review.rating=value;
                });

                $('#stars-existing').on('starrr:change', function(e, value){
                    $('#count-existing').html(value);
                });
            });

        }

        init();

        function sendMessage(){
            vm.message.toUser = vm.user.username;
            vm.message.fromUser = UserService.getCurrentUser().username;
            console.log(vm.message);
            MessageService.createMessage(vm.message)
                .then(function (response){
                    if(response.data){

                    }
                })
        }

        function createReview(){
            //console.log($scope.msg);

            vm.review.toUser = vm.user.username;
            vm.review.fromUser = UserService.getCurrentUser().username;
            console.log(vm.review);


            ReviewService.createReview(vm.review)
                .then(function(response){
                if(response.data)
                    init();
                })
        }

        function updateReview(review){
            ReviewService.updateReviewById(vm.selectedReviewId,review)
                .then(function(response){
                    if(response.data)
                        return  ReviewService.findAllReviews();
                })
                .then(function(response){
                    //console.log(response.data);
                    vm.reviews=response.data;
                    vm.review=null;
                    vm.selectedReview=null;
                    vm.selectedReviewId=-1
                });
        }

    }


})();