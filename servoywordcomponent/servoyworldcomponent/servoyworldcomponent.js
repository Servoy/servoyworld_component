angular.module('servoyworldServoyworldcomponent',['servoy']).directive('servoyworldServoyworldcomponent', function() {  
    return {
      restrict: 'E',
      scope: {
          model: '=svyModel',
          handlers: "=svyHandlers",
          api: "=svyApi",
          svyServoyapi: '='
      },
      controller: function($scope, $element, $attrs) {
          
          // implement the api requestFocus, this is done by adding it to $scope.api object that was declared above (line 7)
          $scope.api.requestFocus = function() {
              // use jquery to find the elements input and call focus on that
              var inputEl = $element.find('input');
              inputEl[0].focus();
          }
          
          $scope.callServer = function() {
              $scope.svyServoyapi.callServerSideApi("sayHello", ["NG1 Client"]).then(function(value){
                  console.log(value);
              })
          }
      },
      templateUrl: 'servoyworld/servoyworldcomponent/servoyworldcomponent.html'
    };
  })