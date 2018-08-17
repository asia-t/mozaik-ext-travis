'use strict';

exports.__esModule = true;
var secondsToString = exports.secondsToString = function secondsToString(duration) {
    var hours = Math.floor(duration / 3600) % 24;
    var minutes = Math.floor(duration / 60) % 60;
    var seconds = duration % 60;

    var parts = [];
    if (hours > 0) parts.push(hours + ' hrs');
    if (minutes > 0) parts.push(minutes + ' min');
    if (seconds > 0) parts.push(seconds + ' sec');

    return parts.join(' ');
};