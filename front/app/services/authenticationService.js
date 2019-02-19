(function () {
    'use strict';
 
    app.factory('AuthenticationService', Service);
 
    function Service($http, $localStorage) {
        var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
 
        return service;
 
        function Login(username, password, callback) {
            $http.post('http://localhost:8080/api/authenticate', { username: username, password: password })
            .then(
                function (response) {
                    // login successful if there's a token in the response

                    if (response.data.success) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.data.token };
 
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
 
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                },
                function(data) {
                  console.log(data);
                });
        }
 
        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();