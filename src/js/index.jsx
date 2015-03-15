var React = require('react/addons');
var Reflux  = require('reflux');

var Router        = require('react-router');
var RouteHandler  = Router.RouteHandler;
var Route         = Router.Route;
// var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Link          = Router.Link;

var actions       = require('./actions/Actions');
var LikersFeed    = require('./views/LikersFeed.jsx');

var App = React.createClass({

	getInitialState: function() {
		return {};
	},


	render: function() {

		return (
			<RouteHandler { ...this.props }/>
		)
	}
});

var routes = (
	<Route handler={ App }>
		<Route name="likers" path="/likers/:pageNum" handler={ LikersFeed } ignoreScrollBehavior />
		<DefaultRoute name="home" handler={ LikersFeed } />
	</Route>
);

Router.run(routes, function(Handler, state) {
  React.render(<Handler params={ state.params } />, document.querySelector('.js-main-container'));
});
