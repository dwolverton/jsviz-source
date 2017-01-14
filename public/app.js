(function(){
var app = angular.module("jsVizSource", []);
app.controller("main", function($scope, ajaxService) {
    $scope.start = {
        text: "{}",
        object: {},
        valid: true
    }
    $scope.goal = {
        text: "{}",
        object: {},
        valid: true
    }
    $scope.update = function() {
        parse($scope.start);
        parse($scope.goal);

        if ($scope.start.valid && $scope.goal.valid) {
            ajaxService.update($scope.start.object, $scope.goal.object);
        }
    }

    function parse(obj) {
        var text = obj.text.trim() || "{}";
        try {
            var val = eval("(" + text + ")");
            if (typeof val === "object") {
                obj.object = val;
                obj.valid = true;
                return;
            }
        } catch(e) {
        }
        obj.object = {};
        obj.valid = false;
    }
});
app.service("ajaxService", function($http) {
    this.update = function(start, goal) {
        $http.put("/default-problem.json", { start: start, goal: goal });
    }
});
}());
