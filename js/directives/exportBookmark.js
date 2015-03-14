define(
[
    'underscore'
],
function(_) { 'use strict';

var exportBookmarkFactory = function(bookmarksStorage, exporter) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: '/partials/exportBookmark.tpl.html',
        link: function ($scope, $element) {
            $element.find('.action-button').on('click', function () {

                bookmarksStorage.getAll(function(bookmarks, setttings) {

                    var fileData = exporter.exportToNetscape(bookmarks);
                    var blob = new Blob([fileData], { type:"application/json;charset=utf-8;" });     
                    
                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href',window.URL.createObjectURL(blob));
                    downloadLink.attr('download', 'deweyapp.json');
                    downloadLink[0].click();
                });                
            });
        }
    };
};

return [
    'bookmarksStorage',
    'exporter',
    exportBookmarkFactory
];

});
