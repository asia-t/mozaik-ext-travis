'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n'], ['\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    flex: 1;\n    display: flex;\n    align-items: center;\n    ', ';\n'], ['\n    flex: 1;\n    display: flex;\n    align-items: center;\n    ', ';\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    display: grid;\n    grid-row-gap: 1.6vmin;\n'], ['\n    display: grid;\n    grid-row-gap: 1.6vmin;\n']);

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

var Container = _styledComponents2.default.div(_templateObject);

var Description = _styledComponents2.default.div(_templateObject2, function (props) {
    return (0, _ui.typography)(props.theme, 'default', 'small');
});

var Grid = _styledComponents2.default.div(_templateObject3);

var Repository = function (_Component) {
    _inherits(Repository, _Component);

    function Repository() {
        _classCallCheck(this, Repository);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Repository.getApiRequest = function getApiRequest(_ref) {
        var owner = _ref.owner,
            repository = _ref.repository;

        return {
            id: 'travis.repository.' + owner + '.' + repository,
            params: { owner: owner, repository: repository }
        };
    };

    Repository.prototype.render = function render() {
        var _props = this.props,
            owner = _props.owner,
            repository = _props.repository,
            title = _props.title,
            repoInfo = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (repoInfo) {
            var Icon = (0, _state.iconByState)(repoInfo.last_build.state);
            var color = (0, _state.colorByState)(theme.colors, repoInfo.last_build.state);

            body = _react2.default.createElement(
                Container,
                null,
                _react2.default.createElement(
                    Description,
                    null,
                    repoInfo.description
                ),
                _react2.default.createElement(
                    Grid,
                    null,
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: _react2.default.createElement(
                            _ui.Text,
                            {
                                variant: 'strong',
                                style: { color: theme.colors.textHighlight }
                            },
                            repoInfo.default_branch.name
                        ),
                        prefix: _react2.default.createElement(_ui.GitBranchIcon, { size: '1.8vmin' })
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: repoInfo.last_build ? _react2.default.createElement(
                            _react.Fragment,
                            null,
                            'last build',
                            ' ',
                            _react2.default.createElement(
                                _ui.Text,
                                { variant: 'strong', style: { color: color } },
                                repoInfo.last_build.state
                            )
                        ) : 'n/a',
                        prefix: _react2.default.createElement(Icon, { size: '1.8vmin', style: { color: color } })
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: repoInfo.last_build ? _react2.default.createElement(
                            'span',
                            null,
                            (0, _moment2.default)(repoInfo.last_build.started_at).fromNow(),
                            ' in',
                            ' ',
                            (0, _duration.secondsToString)(repoInfo.last_build.duration)
                        ) : 'n/a',
                        prefix: _react2.default.createElement(_ui.ClockIcon, { size: '1.8vmin' })
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        label: 'language',
                        prefix: _react2.default.createElement(_ui.CodeIcon, { size: '1.8vmin' }),
                        suffix: repoInfo.github_language ? repoInfo.github_language : 'n/a'
                    })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || '',
                subject: title ? null : owner + '/' + repository,
                icon: _ui.InfoIcon
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Repository;
}(_react.Component);

Repository.propTypes = {
    owner: _propTypes2.default.string.isRequired,
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    apiError: _propTypes2.default.object,
    apiData: _propTypes2.default.shape({
        slug: _propTypes2.default.string.isRequired,
        description: _propTypes2.default.string.isRequired,
        github_language: _propTypes2.default.string,
        default_branch: _propTypes2.default.shape({
            name: _propTypes2.default.string.isRequired
        }).isRequired,
        last_build: _propTypes2.default.shape({
            state: _propTypes2.default.string.isRequired,
            started_at: _propTypes2.default.string,
            duration: _propTypes2.default.number
        })
    }),
    theme: _propTypes2.default.object.isRequired
};
exports.default = Repository;