/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController)

    function HeaderController($scope){
        $rootScope=null;
        $scope.checkRootScope=checkRootScope;
        $scope.logout=logout;
        $scope.checkAdmin=checkAdmin;


        function checkRootScope(){

            if($rootScope == null)
                return true;

            else{
                $scope.username=$rootScope.username;
                return false;
            }
        }

        function checkAdmin(){

            for(var i=0;i<$rootScope.roles.length;i++)
            {
                if(roles[i]=="admin")
                    return true;
            }


            return false;
        }

        function logout(){
            $rootScope=null;
        }

    }

})();