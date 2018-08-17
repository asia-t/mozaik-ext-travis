'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

var _BuildHistoryItem = require('./BuildHistoryItem');

var _BuildHistoryItem2 = _interopRequireDefault(_BuildHistoryItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuildHistory = function (_Component) {
    _inherits(BuildHistory, _Component);

    function BuildHistory() {
        _classCallCheck(this, BuildHistory);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    BuildHistory.getApiRequest = function getApiRequest(_ref) {
        var owner = _ref.owner,
            repository = _ref.repository,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? BuildHistory.defaultProps.limit : _ref$limit;

        return {
            id: 'travis.repositoryBuildHistory.' + owner + '.' + repository + '.' + limit,
            params: { owner: owner, repository: repository, limit: limit }
        };
    };

    BuildHistory.prototype.render = function render() {
        var _props = this.props,
            owner = _props.owner,
            repository = _props.repository,
            title = _props.title,
            hideHeader = _props.hideHeader,
            apiData = _props.apiData,
            apiError = _props.apiError,
            theme = _props.theme;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var buildCount = void 0;
        if (apiData && !apiError) {
            buildCount = apiData.builds.pagination.count;
            body = _react2.default.createElement(
                'div',
                null,
                apiData.builds.items.map(function (build) {
                    return _react2.default.createElement(_BuildHistoryItem2.default, { key: build.id, build: build, theme: theme });
                })
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            !hideHeader && _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'builds',
                subject: title ? null : owner + '/' + repository,
                count: buildCount,
                icon: _ui.ActivityIcon
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                { disablePadding: true, isHeaderless: hideHeader },
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return BuildHistory;
}(_react.Component);

BuildHistory.propTypes = {
    owner: _propTypes2.default.string.isRequired,
    repository: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    limit: _propTypes2.default.number.isRequired,
    hideHeader: _propTypes2.default.bool.isRequired,
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
BuildHistory.defaultProps = {
    limit: 10,
    hideHeader: false
};
exports.default = BuildHistory;