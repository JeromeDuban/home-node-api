app.config(function($routeProvider) {
        var test = "bla";
        $routeProvider
        .when("/", {
            templateUrl : "front/app/components/home/homeView.html",
            controller : "homeController"
        })
        .when("/login", {
            templateUrl : "front/app/components/login/loginView.html",
            controller : "loginController",
            controllerAs : "vm"
        });
    }
).run(run);

function run($rootScope, $http, $location, $localStorage, AuthenticationService) {

    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    continueRouting($rootScope, $http, $location, $localStorage, AuthenticationService);
    
}

function continueRouting($rootScope, $http, $location, $localStorage, AuthenticationService){
// redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {

        var url = "http://localhost:8080/api/ping";
        $http.get(url).then(
            function(response) {
                redirect($location,$localStorage);
            },
            function(data) {
                if ($localStorage.currentUser) {
                    AuthenticationService.Logout();
                }
                redirect($location,$localStorage);
            }
        );

    });
};


function redirect($location,$localStorage ){
    var publicPages = ['/login'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
        $location.path('/login');
    }
}