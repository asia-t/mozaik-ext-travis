'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bar = require('@nivo/bar');

var _ui = require('@mozaik/ui');

var _BuildHistoryItem = require('./BuildHistoryItem');

var _state = require('../lib/state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var margin = { top: 10, right: 20, bottom: 80, left: 70 };

var BuildHistogram = function (_Component) {
    _inherits(BuildHistogram, _Component);

    function BuildHistogram() {
        _classCallCheck(this, BuildHistogram);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    BuildHistogram.getApiRequest = function getApiRequest(_ref) {
        var owner = _ref.owner,
            repository = _ref.repository,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? BuildHistogram.defaultProps.limit : _ref$limit;

        return {
            id: 'travis.repositoryBuildHistory.' + owner + '.' + repository + '.' + limit,
            params: { owner: owner, repository: repository, limit: limit }
        };
    };

    BuildHistogram.prototype.render = function render() {
        var _props = this.props,
            owner = _props.owner,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var count = void 0;
        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData) {
            count = apiData.builds.pagination.count;
            var chartData = apiData.builds.items.map(function (build) {
                return {
                    build: build.number,
                    duration: Number((build.duration / 60).toFixed(2)), // converts s to mn
                    color: (0, _state.colorByState)(theme.colors, build.state)
                };
            }).reverse();

            body = _react2.default.createElement(_bar.ResponsiveBar, {
                margin: margin,
                data: chartData,
                indexBy: 'build',
                keys: ['duration'],
                padding: 0.2,
                theme: theme.charts,
                animate: false,
                colorBy: function colorBy(d) {
                    return d.data.color;
                },
                enableLabel: false,
                axisLeft: {
                    tickPadding: 7,
                    tickSize: 0,
                    legend: 'duration (mn)',
                    legendPosition: 'center',
                    legendOffset: -40
                },
                axisBottom: {
                    tickSize: 0,
                    tickPadding: 10,
                    legend: 'build number',
                    legendPosition: 'center',
                    legendOffset: 60,
                    tickRotation: -90,
                    format: function format(number) {
                        return '#' + number;
                    }
                }
            });
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'builds',
                subject: title ? null : owner + '/' + repository,
                count: count,
                icon: _ui.BarChartIcon
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { disablePadding: true, style: { overflowY: 'hidden' } },
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return BuildHistogram;
}(_react.Component);

BuildHistogram.propTypes = {
    owner: _propTypes2.default.string.isRequired,
    repository: _propTypes2.default.string.isRequired,
    limit: _propTypes2.default.number.isRequired,
    title: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        builds: _propTypes2.default.shape({
            pagination: _propTypes2.default.shape({
                count: _propTypes2.default.number.isRequired
            }).isRequired,
            items: _propTypes2.default.arrayOf(_BuildHistoryItem.BuildPropType).isRequired
        }).isRequired
    }),
    apiError: _propTypes2.default.object,
    theme: _propTypes2.default.object.isRequired
};
BuildHistogram.defaultProps = {
    limit: 20
};
exports.default = BuildHistogram;