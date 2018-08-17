'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('lodash'),
    omit = _require.omit;

var _require2 = require('./travis'),
    Travis = _require2.Travis;

var states = ['received', 'created', 'started', 'errored', 'failed', 'passed'];

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
var client = function client(mozaik) {
    var travis = new Travis(process.env.TRAVIS_API_BASE_URL, process.env.TRAVIS_API_TOKEN, mozaik.request, mozaik.logger);

    return {
        /**
         * Fetch repository info.
         *
         * @param {string} owner
         * @param {string} repository
         *
         * @returns {Promise}
         */
        repository: async function repository(_ref) {
            var owner = _ref.owner,
                repo = _ref.repository;

            var repositoryId = owner + '/' + repo;

            var repository = await travis.getRepository(repositoryId);
            var default_branch = await travis.getRepositoryBranch(repositoryId, repository.default_branch.name);

            var last_build = void 0;
            if (default_branch.last_build !== undefined) {
                last_build = travis.removeItemMeta(default_branch.last_build);
            }

            return _extends({}, repository, {
                default_branch: omit(default_branch, ['last_build']),
                last_build: last_build
            });
        },


        /**
         * Fetch latest build.
         *
         * @param {string} owner
         * @param {string} repository
         * @param {string} [branchName]
         *
         * @returns {Promise}
         */
        latestRepositoryBuild: async function latestRepositoryBuild(_ref2) {
            var owner = _ref2.owner,
                repo = _ref2.repository,
                branchName = _ref2.branchName;

            var repositoryId = owner + '/' + repo;

            var repository = await travis.getRepository(repositoryId);
            var branch = await travis.getRepositoryBranch(repositoryId, branchName || repository.default_branch.name);

            var last_build = void 0;
            if (branch.last_build !== undefined) {
                last_build = await travis.getBuild(branch.last_build.id, ['job.state', 'job.number', 'job.started_at', 'job.finished_at', 'job.queue']);
            }

            return _extends({}, repository, {
                current_branch: omit(branch, ['last_build']),
                last_build: last_build
            });
        },


        /**
         * Fetch repository build history.
         *
         * @param {string} owner
         * @param {string} repository
         * @param {number} limit
         *
         * @returns {Promise}
         */
        repositoryBuildHistory: async function repositoryBuildHistory(_ref3) {
            var owner = _ref3.owner,
                repo = _ref3.repository,
                limit = _ref3.limit;

            var repositoryId = owner + '/' + repo;

            var repository = await travis.getRepository(repositoryId);
            var builds = await travis.getRepositoryBuilds(repositoryId, { limit: limit });

            return {
                repository: repository,
                builds: builds
            };
        },


        /**
         * Fetch repository builds stats.
         *
         * @param {string} owner
         * @param {string} repository
         *
         * @returns {Promise}
         */
        repositoryBuildsStats: async function repositoryBuildsStats(_ref4) {
            var owner = _ref4.owner,
                repo = _ref4.repository;

            var repositoryId = owner + '/' + repo;

            var total = await travis.getRepositoryBuilds(repositoryId, { limit: 1 }).then(function (_ref5) {
                var pagination = _ref5.pagination;
                return pagination.count;
            });
            var byState = await Promise.all(states.map(function (state) {
                return travis.getRepositoryBuilds(repositoryId, {
                    limit: 1,
                    state: state
                }).then(function (_ref6) {
                    var pagination = _ref6.pagination;
                    return pagination.count;
                });
            })).then(function (counts) {
                return counts.map(function (count, i) {
                    return {
                        state: states[i],
                        count: count
                    };
                });
            });

            return { total: total, stats: byState };
        }
    };
};

module.exports = client;