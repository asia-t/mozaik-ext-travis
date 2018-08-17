'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n'], ['\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    display: grid;\n    grid-row-gap: 1.6vmin;\n    grid-template-columns: 0.6vmin 1fr 1fr 1fr;\n    grid-column-gap: 2vmin;\n    padding-right: 2vmin;\n    margin: 2vmin 0;\n'], ['\n    display: grid;\n    grid-row-gap: 1.6vmin;\n    grid-template-columns: 0.6vmin 1fr 1fr 1fr;\n    grid-column-gap: 2vmin;\n    padding-right: 2vmin;\n    margin: 2vmin 0;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    grid-row-start: 1;\n    grid-row-end: 3;\n'], ['\n    grid-row-start: 1;\n    grid-row-end: 3;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n    color: ', ';\n    ', ';\n'], ['\n    color: ', ';\n    ', ';\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n    flex: 1;\n    display: flex;\n    align-items: flex-end;\n    margin-bottom: 2vmin;\n'], ['\n    flex: 1;\n    display: flex;\n    align-items: flex-end;\n    margin-bottom: 2vmin;\n']),
    _templateObject6 = _taggedTemplateLiteralLoose(['\n    width: 100%;\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-column-gap: 2vmin;\n    grid-row-gap: 1.4vmin;\n    padding: 0 2vmin 0 2.6vmin;\n'], ['\n    width: 100%;\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-column-gap: 2vmin;\n    grid-row-gap: 1.4vmin;\n    padding: 0 2vmin 0 2.6vmin;\n']);

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

var Header = _styledComponents2.default.div(_templateObject2);

var StateIndicator = _styledComponents2.default.div(_templateObject3);

var Value = _styledComponents2.default.span(_templateObject4, function (props) {
    return props.theme.colors.textHighlight;
}, function (props) {
    return (0, _ui.typography)(props.theme, 'default', 'strong');
});

var Footer = _styledComponents2.default.div(_templateObject5);

var Jobs = _styledComponents2.default.div(_templateObject6);

var LatestRepositoryBuild = function (_Component) {
    _inherits(LatestRepositoryBuild, _Component);

    function LatestRepositoryBuild() {
        _classCallCheck(this, LatestRepositoryBuild);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LatestRepositoryBuild.getApiRequest = function getApiRequest(_ref) {
        var owner = _ref.owner,
            repository = _ref.repository;

        return {
            id: 'travis.latestRepositoryBuild.' + owner + '.' + repository,
            params: { owner: owner, repository: repository }
        };
    };

    LatestRepositoryBuild.prototype.render = function render() {
        var _props = this.props,
            owner = _props.owner,
            repository = _props.repository,
            repoInfo = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var subject = void 0;
        var count = void 0;
        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        if (repoInfo) {
            subject = repoInfo.current_branch.name;
            count = '#' + repoInfo.last_build.number;

            var Icon = (0, _state.iconByState)(repoInfo.last_build.state);
            var color = (0, _state.colorByState)(theme.colors, repoInfo.last_build.state);

            body = _react2.default.createElement(
                Container,
                null,
                _react2.default.createElement(
                    Header,
                    null,
                    _react2.default.createElement(StateIndicator, { style: { background: color } }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        prefix: _react2.default.createElement(Icon, { size: '1.8vmin', color: color }),
                        label: _react2.default.createElement(
                            Value,
                            { style: { color: color } },
                            repoInfo.last_build.state
                        )
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        prefix: _react2.default.createElement(_ui.GitBranchIcon, { size: '1.8vmin' }),
                        label: _react2.default.createElement(
                            'span',
                            null,
                            'branch ',
                            _react2.default.createElement(
                                Value,
                                null,
                                repoInfo.current_branch.name
                            )
                        )
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        prefix: _react2.default.createElement(_ui.CalendarIcon, { size: '1.8vmin' }),
                        label: repoInfo.last_build.started_at !== null ? _react2.default.createElement(
                            _react.Fragment,
                            null,
                            'about',
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { style: { color: theme.colors.textHighlight } },
                                (0, _moment2.default)(repoInfo.last_build.started_at).fromNow()
                            )
                        ) : 'n/a'
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        prefix: _react2.default.createElement(_ui.GitCommitIcon, { size: '1.8vmin' }),
                        label: _react2.default.createElement(
                            'span',
                            null,
                            'commit',
                            ' ',
                            _react2.default.createElement(
                                Value,
                                null,
                                repoInfo.last_build.commit.sha.slice(0, 7)
                            )
                        ),
                        style: { gridRowStart: 2, gridColumnStart: 3 }
                    }),
                    _react2.default.createElement(_ui.WidgetLabel, {
                        prefix: _react2.default.createElement(_ui.ClockIcon, { size: '1.8vmin' }),
                        label: repoInfo.last_build.duration !== null ? _react2.default.createElement(
                            'span',
                            { style: { color: theme.colors.textHighlight } },
                            (0, _duration.secondsToString)(repoInfo.last_build.duration)
                        ) : 'n/a',
                        style: { gridRowStart: 2, gridColumnStart: 4 }
                    })
                ),
                _react2.default.createElement(
                    Footer,
                    null,
                    _react2.default.createElement(
                        Jobs,
                        null,
                        _react2.default.createElement(
                            _ui.Text,
                            { variant: 'small' },
                            'Build jobs'
                        ),
                        repoInfo.last_build.jobs.map(function (job, i) {
                            var JobIcon = (0, _state.iconByState)(job.state);
                            var jobColor = (0, _state.colorByState)(theme.colors, job.state);

                            return _react2.default.createElement(
                                _react.Fragment,
                                { key: job.id },
                                _react2.default.createElement(
                                    'span',
                                    {
                                        style: {
                                            gridColumnStart: 1,
                                            gridRowStart: i + 2
                                        }
                                    },
                                    _react2.default.createElement(JobIcon, {
                                        size: '2.2vmin',
                                        color: jobColor,
                                        style: {
                                            display: 'inline-block',
                                            verticalAlign: 'middle'
                                        }
                                    }),
                                    ' ',
                                    _react2.default.createElement(_ui.HashIcon, {
                                        size: '1.6vmin',
                                        style: {
                                            display: 'inline-block',
                                            verticalAlign: 'middle'
                                        }
                                    }),
                                    _react2.default.createElement(
                                        'span',
                                        { style: { color: color } },
                                        _react2.default.createElement(
                                            _ui.Text,
                                            { variant: 'strong' },
                                            job.number
                                        ),
                                        ' ',
                                        job.state
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    {
                                        style: {
                                            gridColumnStart: 2,
                                            gridRowStart: i + 2
                                        }
                                    },
                                    _react2.default.createElement(_ui.CalendarIcon, {
                                        size: '1.6vmin',
                                        style: {
                                            display: 'inline-block',
                                            verticalAlign: 'middle'
                                        }
                                    }),
                                    ' ',
                                    job.started_at ? _react2.default.createElement(
                                        'span',
                                        { style: { color: theme.colors.textHighlight } },
                                        (0, _moment2.default)(job.started_at).fromNow()
                                    ) : 'n/a'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    {
                                        style: {
                                            gridColumnStart: 3,
                                            gridRowStart: i + 2
                                        }
                                    },
                                    job.queue
                                )
                            );
                        })
                    )
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: owner + '/' + repository,
                subject: subject,
                count: count,
                icon: _ui.GitBranchIcon,
                subjectPlacement: 'append'
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

    return LatestRepositoryBuild;
}(_react.Component);

LatestRepositoryBuild.propTypes = {
    owner: _propTypes2.default.string.isRequired,
    repository: _propTypes2.default.string.isRequired,
    apiError: _propTypes2.default.object,
    apiData: _propTypes2.default.shape({
        slug: _propTypes2.default.string.isRequired,
        description: _propTypes2.default.string.isRequired,
        github_language: _propTypes2.default.string,
        current_branch: _propTypes2.default.shape({
            name: _propTypes2.default.string.isRequired
        }).isRequired,
        last_build: _propTypes2.default.shape({
            number: _propTypes2.default.number.string,
            state: _propTypes2.default.string.isRequired,
            started_at: _propTypes2.default.string,
            duration: _propTypes2.default.number,
            jobs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
                number: _propTypes2.default.string.isRequired,
                state: _propTypes2.default.string.isRequired,
                queue: _propTypes2.default.string.isRequired,
                started_at: _propTypes2.default.string
            })).isRequired
        })
    }),
    theme: _propTypes2.default.object.isRequired
};
exports.default = LatestRepositoryBuild;