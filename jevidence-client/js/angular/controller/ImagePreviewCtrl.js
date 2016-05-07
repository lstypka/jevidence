reportNgApp.controller('ImagePreviewCtrl', function ($scope, Lightbox) {

    $scope.openLightboxModal = function (url) {
        Lightbox.openModal([
            { url: url, thumbUrl: url}
        ], 0);
    };
});