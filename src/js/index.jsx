import React from 'react/addons';
import Reflux from 'reflux';
import Router from 'react-router';
import actions from './actions/Actions';
import LikersFeed from './views/LikersFeed.jsx';

// var EventEmitter = require('events').EventEmitter;
// window.EventEmitter = new EventEmitter();

let RouteHandler = Router.RouteHandler;
let Route = Router.Route;
// let NotFoundRoute = Router.NotFoundRoute;
let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;

let App = React.createClass({

  getInitialState() {
    return {};
  },

	render() {
    return (
			<RouteHandler { ...this.props }/>
		);
	}
});

let routes = (
	<Route handler={ App }>
		<Route name="likers" path="/likers/:pageNum" handler={ LikersFeed } ignoreScrollBehavior />
		<DefaultRoute name="home" handler={ LikersFeed } />
	</Route>
);

Router.run(routes, (Handler, state) => {
  React.render(<Handler params={ state.params } />, document.querySelector('.js-main-container'));
});
