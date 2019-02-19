app.controller('homeController', ['$scope','$http','$interval',function($scope,$http,$interval) {
				
	// Heure
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);

    //Récupération des appareils
	$http.get('front/assets/raw/devices.json').then(function(response) {
	   $scope.devices = response.data.devices;
	   getStatus($scope, $http, $interval);
	});

}]);


// var config = {headers:  {
//         'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplamVmY2diIiwiaWF0IjoxNTE5MDc4ODU3LCJleHAiOjE1MTkxNjUyNTd9.kxL9BCC4kG_oh7G0U-Cp58aQ1sTzptgWHOCyLT2Fb-s'
//     }
// };

function getStatus($scope, $http, $interval){

	var status = function (){
		angular.forEach($scope.devices, function(value, key) {

			var url = "http://localhost:8080/api/status/"+value.ip;
			
			$http.get(url).then(
				function(response) {
					if (response.data.success){
						value.status = response.data.status;
					}
					console.log(value);
				},
				function(data) {
			      console.log(data);
			      location.reload();
			    }
			);
		});
	}

	status();
	$interval(status, 30*1000);
};