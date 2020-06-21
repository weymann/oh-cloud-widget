// https://mattslocum.github.io/ng-webworker/demo/
angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope, $http) {

  $scope.series = ['Bewoelkung', 'Niederschlag'];
  $scope.colors = ['#878787', '#007fff', '#45b7cd'];
  $scope.datasetOverride = [
    {
      label: "Bewoelkung",
      borderWidth: 3,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      type: 'line',
      yAxisID: 'y-axis-1'
    },
    {
      label: "Niederschlag",
      borderWidth: 1,
      type: 'bar',
      yAxisID: 'y-axis-2'
    }
  ];

  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: { beginAtZero: true, max: 100 }
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right',
          ticks: { beginAtZero: true }
        }
      ]
    }
  };

  $scope.config.appid = "7c82a05c28361abc8ab90b9f0faf18fa";
  $scope.config.latitude = 50.555969;
  $scope.config.longtitude = 8.495388;


  var myWorker = new Worker("../static/js/doubler.js");

  myWorker.onmessage = function (oEvent) {
    console.log("Schedule")
    getForecastData()
    sleep(60 * 60 * 1000).then(() => {
      console.log("timeout - new schedule")
      myWorker.postMessage(2);
    });
  };

  myWorker.postMessage(2); // start the worker.

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getForecastData() {
    // http://api.openweathermap.org/data/2.5/forecast?q=Wetzlar&appid=7c82a05c28361abc8ab90b9f0faf18fa&units=metric&lang=de
    var query = "https://api.openweathermap.org/data/2.5/forecast?lat=" + $scope.config.latitude + "&lon="
      + $scope.config.longtitude + "&appid=" + $scope.config.appid + "&units=metric&lang=de";
    var data = {};
    var config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    };
    console.log("Call API")
    $http.post(query, data, config)
      .then(function successCallback(response) {
        console.log("Get forecast success");
        console.log(response.data);
        calculateForecastData(response.data);
        return "OK"
      }, function errorCallback(response) {
        console.log("Get balance: Failure");
        console.log("Status " + response.status + ": " + response.statusText);
        return "NOK"
      });
    console.log("Called API")
  }

  function calculateForecastData(data) {
    var dailyForecastArray = data.list;
    var cloudForecastArray = new Array();
    var rainForecastArray = new Array();
    var labelArray = new Array();
    for (let index = 0; index < dailyForecastArray.length; index++) {
      var element = dailyForecastArray[index];
      var d = new Date(element.dt * 1000);
      cloudForecastArray[index] = element.clouds.all

      rainForecastArray[index] = 0;
      var rain = element.rain
      if(rain != null) {
        rainForecastArray[index] = element.rain["3h"]
      }
      labelArray[index] = d.getHours()
      console.log(d + " : " + element.clouds.all);
    }
    $scope.data = [cloudForecastArray, rainForecastArray]
    $scope.labels = labelArray
    console.log($scope.data);
  }

});
