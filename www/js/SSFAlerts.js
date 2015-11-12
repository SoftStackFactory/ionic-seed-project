angular.module('SSFAlerts', [])
.service('SSFAlertsService', ['$ionicPopup', '$q', function ($ionicPopup, $q) {
    
    var service = this;
    
    service.showAlert = function(title, body, okText)
    {
        if(navigator.notification === undefined)
        {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: body,
                okText: (okText == undefined || okText == null) ? "OK" : okText
            });
            return alertPopup;
        }else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex)
            {
                defer.resolve(true);
            };
            
            navigator.notification.alert(body, confirmCallback, title, okText);
        }
    };
    
    service.showConfirm = function(title, body, okText, cancelText)
    {
        if(navigator.notification == undefined)
        {
            var confirmPopup = $ionicPopup.confirm({
                title: title,
                template: body,
                okText: (okText == undefined || okText == null) ? "OK" : okText, 
                cancelText: (cancelText == undefined || cancelText == null) ? "Cancel" : cancelText
            });
            return confirmPopup;
        }else {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex)
            {
                if(buttonIndex===1) {
                    defer.resolve(true);
                }else {
                    defer.resolve(false);
                }
            };
            var buttons = ["OK","Cancel"];
            if(okText != undefined)
                buttons[0] = okText;
            if(cancelText != undefined)
                buttons[1] = cancelText;
            navigator.notification.confirm(body, confirmCallback, title, buttons);
            return defer.promise;
        }
    };
}]);