/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController)

    function ProfileController($scope, UserService){
      $scope.user=$rootScope;
        console.log($rootScope);

      $scope.update=update;

        function update(user)
        {
            console.log(user);
            UserService.updateUser(user._id,user,render);
        }

        function render (user) {
            $rootScope = user;
            console.log(user);
            $location.path("/profile");
        }

    }

})();