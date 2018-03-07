angular.module('classify')
    .factory('socket', function (socketFactory) {
        var ioSocket = io('');

        return socketFactory({
            ioSocket: ioSocket
        });
    });
