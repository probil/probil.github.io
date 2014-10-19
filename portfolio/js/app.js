var app = angular.module('app', ['ngSanitize']);

app.controller("mainController", function ($scope, $http, $location) {
    function setLanguage(gl) {
        var userLang = gl || $location.search()['gl'] || navigator.language || navigator.userLanguage;

        var file = "";
        switch (userLang) {
            case "uk":
                file = "l18n/data_uk.json";
                break;
            case "ru":
                file = "l18n/data_ru.json";
                break;
            default:
                file = "l18n/data_en.json";
                break;
        }
        $http.get(file).success(function (response) {
            $scope.strings = response;
        });
    }
    setLanguage();

    /* === Hide loader block after page loaded === */
    angular.element(window).bind('load', function() {
        angular.element(document.querySelector('.loading')).remove();
    });
});
