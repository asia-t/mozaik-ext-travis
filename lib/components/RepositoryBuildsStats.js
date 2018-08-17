'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: ', ';\n    ', ' font-size: 4vmin;\n'], ['\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    color: ', ';\n    ', ' font-size: 4vmin;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _pie = require('@nivo/pie');

var _ui = require('@mozaik/ui');

var _state = require('../lib/state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var margin = { top: 30, right: 70, bottom: 30, left: 70 };

var Total = _styledComponents2.default.div(_templateObject, function (props) {
    return props.theme.colors.textHighlight;
}, function (props) {
    return (0, _ui.typography)(props.theme, 'display');
});

var RepositoryBuildsStats = function (_Component) {
    _inherits(RepositoryBuildsStats, _Component);

    function RepositoryBuildsStats() {
        _classCallCheck(this, RepositoryBuildsStats);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    RepositoryBuildsStats.getApiRequest = function getApiRequest(_ref) {
        var owner = _ref.owner,
            repository = _ref.repository;

        return {
            id: 'travis.repositoryBuildsStats.' + owner + '.' + repository,
            params: { owner: owner, repository: repository }
        };
    };

    RepositoryBuildsStats.prototype.render = function render() {
        var _props = this.props,
            owner = _props.owner,
            repository = _props.repository,
            title = _props.title,
            apiData = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (apiData && !apiError) {
            var chartData = apiData.stats.filter(function (_ref2) {
                var count = _ref2.count;
                return count > 0;
            }).map(function (stat) {
                return _extends({}, stat, {
                    id: stat.state,
                    label: stat.state,
                    value: stat.count,
                    color: (0, _state.colorByState)(theme.colors, stat.state)
                });
            });

            body = _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(_pie.ResponsivePie, {
                    data: chartData,
                    margin: margin,
                    colorBy: function colorBy(d) {
                        return d.color;
                    },
                    theme: theme.charts,
                    innerRadius: 0.7,
                    cornerRadius: 3,
                    padAngle: 0.8,
                    slicesLabelsTextColor: 'inherit:darker(2.6)',
                    radialLabelsLinkHorizontalLength: 10,
                    radialLabelsLinkDiagonalLength: 10,
                    radialLabelsLinkStrokeWidth: 2,
                    radialLabelsLinkColor: 'inherit',
                    radialLabelsTextColor: 'inherit:brighter(0.6)',
                    animate: false
                }),
                _react2.default.createElement(
                    Total,
                    null,
                    apiData.total
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'builds',
                subject: title ? null : owner + '/' + repository,
                icon: _ui.PieChartIcon
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { disablePadding: true },
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return RepositoryBuildsStats;
}(_react.Component);

RepositoryBuildsStats.propTypes = {
    owner: _propTypes2.default.string.isRequired,
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiError: _propTypes2.default.object,
    apiData: _propTypes2.default.shape({
        total: _propTypes2.default.number.isRequired,
        stats: _propTypes2.default.arrayOf(_propTypes2.default.shape({
            count: _propTypes2.default.number.isRequired,
            state: _propTypes2.default.string.isRequired
        })).isRequired
    }),
    theme: _propTypes2.default.object.isRequired
};
exports.default = RepositoryBuildsStats;