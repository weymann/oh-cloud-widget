angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope) {
  // console.log("Config: "+$scope.itemValue($scope.config.Day0)  )

  var forecastArray = [["","","","","","","",""],["","","","","","","",""]];
  $scope.labels = ["Heute", "Morgen", "2", "3", "4", "5", "6", "7"];
  $scope.data = [
    [10, 0, 0, 0, 20, 0, 0, 0],
    [2, 0, 0, 0, 5, 0, 0, 0]
  ];
  if (typeof $scope.config !== 'undefined') {
    $scope.labels[2] = $scope.itemValue($scope.config.Day2Date).substring(0,10)
    $scope.labels[3] = $scope.itemValue($scope.config.Day3Date).substring(0,10)
    $scope.labels[4] = $scope.itemValue($scope.config.Day4Date).substring(0,10)
    $scope.labels[5] = $scope.itemValue($scope.config.Day5Date).substring(0,10)
    $scope.labels[6] = $scope.itemValue($scope.config.Day6Date).substring(0,10)
    $scope.labels[7] = $scope.itemValue($scope.config.Day7Date).substring(0,10)
    
    forecastArray[0][0] = $scope.itemValue($scope.config.Day0CloudForecast)
    forecastArray[0][1] = $scope.itemValue($scope.config.Day1CloudForecast)
    forecastArray[0][2] = $scope.itemValue($scope.config.Day2CloudForecast)
    forecastArray[0][3] = $scope.itemValue($scope.config.Day3CloudForecast)
    forecastArray[0][4] = $scope.itemValue($scope.config.Day4CloudForecast)
    forecastArray[0][5] = $scope.itemValue($scope.config.Day5CloudForecast)
    forecastArray[0][6] = $scope.itemValue($scope.config.Day6CloudForecast)
    forecastArray[0][7] = $scope.itemValue($scope.config.Day7CloudForecast)

    forecastArray[1][0] = $scope.itemValue($scope.config.Day0Rainfall)
    forecastArray[1][1] = $scope.itemValue($scope.config.Day1Rainfall)
    forecastArray[1][2] = $scope.itemValue($scope.config.Day2Rainfall)
    forecastArray[1][3] = $scope.itemValue($scope.config.Day3Rainfall)
    forecastArray[1][4] = $scope.itemValue($scope.config.Day4Rainfall)
    forecastArray[1][5] = $scope.itemValue($scope.config.Day5Rainfall)
    forecastArray[1][6] = $scope.itemValue($scope.config.Day6Rainfall)
    forecastArray[1][7] = $scope.itemValue($scope.config.Day7Rainfall)

    var i;
    for (i = 0; i < 8; i++) {
      var str = forecastArray[0][i]
      var split = str.split(" ");
      if(split[0] != "N/A") {
          var floatVal = parseFloat(split[0]).toFixed(1)
          console.log("Number " + floatVal)   
          $scope.data[0][i] = floatVal 
      } else {
       console.log("found N/A")
      }

      var str = forecastArray[1][i]
      var split = str.split(" ");
      if(split[0] != "N/A") {
          var floatVal = parseFloat(split[0]).toFixed(5)
          console.log("Number " + floatVal * 100)   
          $scope.data[1][i] = (floatVal * 100).toFixed(1)
      } else {
       console.log("found N/A")
      }

    }
  }
  

    $scope.series = ['Bewoelkung', 'Niederschlag'];
    $scope.colors = [ '#878787','#45b7cd', '#ff8e72'];
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
            ticks : { beginAtZero : true, max:100 }
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right',
            ticks : { beginAtZero : true }
          }
        ]
      }
    };

});

/**
 * GET https://api.darksky.net/forecast/f36af303a886531740e1f57fae872842/50.5562,8.4944
 */