'use strict';

exports.__esModule = true;
exports.iconByState = exports.colorByState = undefined;

var _ui = require('@mozaik/ui');

var colorByState = exports.colorByState = function colorByState(colors, state) {
    if (state === 'received' || state === 'created' || state === 'started') {
        return colors.warning;
    }

    if (state === 'errored' || state === 'failed') {
        return colors.failure;
    }

    if (state === 'passed') {
        return colors.success;
    }

    return colors.unknown;
};

var iconByState = exports.iconByState = function iconByState(state) {
    if (state === 'received' || state === 'created') {
        return _ui.PauseCircleIcon;
    }

    if (state === 'started') {
        return _ui.PlayCircleIcon;
    }

    if (state === 'passed') {
        return _ui.CheckCircleIcon;
    }

    if (state === 'errored') {
        return _ui.AlertTriangleIcon;
    }

    if (state === 'failed') {
        return _ui.AlertCircleIcon;
    }

    if (state === 'canceled') {
        return _ui.SlashIcon;
    }

    return _ui.HelpIcon;
};