'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chalk = require('chalk');

var _require = require('lodash'),
    omit = _require.omit;

var Travis = function () {
    function Travis(baseUrl, token, request, logger) {
        _classCallCheck(this, Travis);

        this.baseUrl = baseUrl;
        this.token = token;
        this.request = request;
        this.logger = logger;
    }

    Travis.prototype.makeRequest = function makeRequest(path, qs) {
        var uri = '' + this.baseUrl + path;

        var options = {
            uri: uri,
            qs: qs,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'Travis-API-Version': '3',
                Authorization: 'token ' + this.token
            }
        };

        var paramsDebug = qs ? ' ' + JSON.stringify(qs) : '';
        this.logger.info(chalk.yellow('[travis] calling ' + uri + paramsDebug));

        return this.request(options);
    };

    Travis.prototype.removeItemMeta = function removeItemMeta(entity) {
        return omit(entity, ['@href', '@permissions', '@representation', '@type']);
    };

    Travis.prototype.getRepository = function getRepository(repositoryId) {
        var _this = this;

        return this.makeRequest('/repo/' + encodeURIComponent(repositoryId)).then(function (res) {
            return _this.removeItemMeta(res.body);
        });
    };

    Travis.prototype.getRepositoryBranch = function getRepositoryBranch(repositoryId, branchName) {
        var _this2 = this;

        return this.makeRequest('/repo/' + encodeURIComponent(repositoryId) + '/branch/' + branchName).then(function (res) {
            return _this2.removeItemMeta(res.body);
        });
    };

    Travis.prototype.getRepositoryBuilds = function getRepositoryBuilds(repositoryId) {
        var _this3 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return this.makeRequest('/repo/' + encodeURIComponent(repositoryId) + '/builds', options).then(function (res) {
            return {
                pagination: res.body['@pagination'],
                items: res.body.builds.map(function (build) {
                    return _this3.removeItemMeta(build);
                })
            };
        });
    };

    Travis.prototype.getBuild = function getBuild(buildId) {
        var _this4 = this;

        var include = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        return this.makeRequest('/build/' + buildId, {
            include: include.join(',')
        }).then(function (res) {
            return _this4.removeItemMeta(res.body);
        });
    };

    return Travis;
}();

exports.Travis = Travis;