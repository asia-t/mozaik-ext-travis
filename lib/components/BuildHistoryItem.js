'use strict';

exports.__esModule = true;
exports.BuildPropType = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n    display: grid;\n    grid-template-columns: 0.6vmin auto;\n    background: ', ';\n    ', ' &:hover {\n        background: ', ';\n    }\n'], ['\n    display: grid;\n    grid-template-columns: 0.6vmin auto;\n    background: ', ';\n    ', ' &:hover {\n        background: ', ';\n    }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    padding: 1.2vmin 2vmin 1.8vmin 1.2vmin;\n    display: grid;\n    grid-template-columns: 2.6vmin 2fr 1fr;\n    grid-column-gap: 1vmin;\n    grid-row-gap: 0.2vmin;\n    align-items: center;\n'], ['\n    padding: 1.2vmin 2vmin 1.8vmin 1.2vmin;\n    display: grid;\n    grid-template-columns: 2.6vmin 2fr 1fr;\n    grid-column-gap: 1vmin;\n    grid-row-gap: 0.2vmin;\n    align-items: center;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    grid-column-start: 2;\n    grid-column-end: 4;\n    padding-top: 0.8vmin;\n    ', ';\n'], ['\n    grid-column-start: 2;\n    grid-column-end: 4;\n    padding-top: 0.8vmin;\n    ', ';\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n    color: ', ';\n'], ['\n    color: ', ';\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _ui = require('@mozaik/ui');

var _state = require('../lib/state');

var _duration = require('../lib/duration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

var BuildPropType = exports.BuildPropType = _propTypes2.default.shape({
    number: _propTypes2.default.string.isRequired,
    state: _propTypes2.default.string.isRequired,
    duration: _propTypes2.default.number.isRequired,
    finished_at: _propTypes2.default.string.isRequired,
    branch: _propTypes2.default.shape({
        name: _propTypes2.default.string.isRequired
    }).isRequired,
    commit: _propTypes2.default.shape({
        message: _propTypes2.default.string.isRequired
    }).isRequired
});

var Container = _styledComponents2.default.div(_templateObject, function (props) {
    return props.theme.list.item.background;
}, function (props) {
    return props.theme.list.item.extend.trim();
}, function (props) {
    return props.theme.list.item.hover.background;
});

var Content = _styledComponents2.default.div(_templateObject2);

var CommitMessage = _styledComponents2.default.div(_templateObject3, function (props) {
    return (0, _ui.typography)(props.theme, 'default', 'small');
});

var TextHighlight = _styledComponents2.default.span(_templateObject4, function (props) {
    return props.theme.colors.textHighlight;
});

var BuildHistoryItem = function (_Component) {
    _inherits(BuildHistoryItem, _Component);

    function BuildHistoryItem() {
        _classCallCheck(this, BuildHistoryItem);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    BuildHistoryItem.prototype.render = function render() {
        var _props = this.props,
            build = _props.build,
            theme = _props.theme;


        var color = (0, _state.colorByState)(theme.colors, build.state);
        var Icon = (0, _state.iconByState)(build.state);

        return _react2.default.createElement(
            Container,
            null,
            _react2.default.createElement('div', { style: { background: color } }),
            _react2.default.createElement(
                Content,
                null,
                _react2.default.createElement(Icon, { size: '2vmin', color: color }),
                _react2.default.createElement(
                    'span',
                    { style: { whiteSpace: 'pre' } },
                    _react2.default.createElement(
                        _ui.Text,
                        { variant: 'strong', style: { color: theme.colors.textHighlight } },
                        build.branch.name
                    ),
                    ' ',
                    _react2.default.createElement(_ui.GitCommitIcon, {
                        size: '1.6vmin',
                        style: { display: 'inline-block', verticalAlign: 'middle' }
                    }),
                    ' ',
                    _react2.default.createElement(
                        _ui.Text,
                        { variant: 'small' },
                        build.commit.sha.slice(0, 7)
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { style: { whiteSpace: 'pre' } },
                    '#',
                    build.number,
                    ' ',
                    _react2.default.createElement(
                        _ui.Text,
                        { variant: 'small', style: { color: color } },
                        build.state
                    )
                ),
                _react2.default.createElement(
                    CommitMessage,
                    null,
                    build.commit.message
                ),
                build.finished_at && _react2.default.createElement(
                    _react.Fragment,
                    null,
                    _react2.default.createElement(
                        'span',
                        { style: { gridColumnStart: 2, gridColumnEnd: 4 } },
                        _react2.default.createElement(
                            _ui.Text,
                            { variant: 'small', style: { whiteSpace: 'pre' } },
                            _react2.default.createElement(_ui.ClockIcon, {
                                size: '1.6vmin',
                                style: { display: 'inline-block', verticalAlign: 'middle' }
                            }),
                            ' ',
                            'about',
                            ' ',
                            _react2.default.createElement(
                                TextHighlight,
                                null,
                                (0, _moment2.default)(build.started_at).fromNow()
                            ),
                            ' ',
                            'in',
                            ' ',
                            _react2.default.createElement(
                                TextHighlight,
                                null,
                                (0, _duration.secondsToString)(build.duration)
                            )
                        )
                    )
                )
            )
        );
    };

    return BuildHistoryItem;
}(_react.Component);

BuildHistoryItem.propTypes = {
    build: BuildPropType.isRequired,
    theme: _propTypes2.default.object.isRequired
};
exports.default = BuildHistoryItem;