// app.controller('loginController', ['$scope', function($scope) {
//   $scope.validate = function() {
//         console.log($scope.login);
//         console.log($scope.password);
//         if(!$scope.login){
//         	$scope.message = "Merci de rentrer un nom d'utilisateur."
//         	return;
//         }

//         if (!$scope.password){
//         	$scope.message = "Merci de rentrer un mot de passe."
//         	return;
//         }
        	

//     };
// }]);

app.controller('loginController',Controller);

function Controller($location, AuthenticationService) {
    var vm = this;

    vm.login = login;

    initController();

    function initController() {
        // reset login status
        AuthenticationService.Logout();
    };

    function login() {
        vm.loading = true;
        AuthenticationService.Login(vm.username, vm.password, function (result) {
            if (result === true) {
                $location.path('/');
            } else {
                vm.error = 'Username or password is incorrect';
                vm.loading = false;
            }
        });
    };
}
