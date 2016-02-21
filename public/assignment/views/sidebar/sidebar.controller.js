/**
 * Created by Sanil on 2/18/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController)

    function SidebarController($scope){
        //$rootScope=null;

        $scope.checkLogin=checkLogin;
        $scope.checkAdmin=checkAdmin;

        function checkLogin(){

            if($rootScope == null)
                return false;

            else
                return true;
        }

        function checkAdmin(){

            if($rootScope!=null)
                for(var i=0;i<$rootScope.roles.length;i++)
                {
                    if($rootScope.roles[i]=="admin")
                        return true;
                }

            return false;
        }

    }

})();