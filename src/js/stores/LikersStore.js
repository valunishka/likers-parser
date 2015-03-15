'use strict';

var Reflux = require('reflux');
var actions = require('../actions/Actions');
var vkapi = require('../services/vkapi');

var LIKERS_PER_PAGE = 50;

var LikersStore = Reflux.createStore({

	listenables: actions,

	init: function() {

		this.likers = {};

		this.settings = {
			currentPage: 1,
			url: '',
			nextPage: true,
			offset: 0,
			isLoaded: false,
			isLoading: false,
			filterOptions: {
				currentValue: 'All',
				values: {
					'All': 'All',
					'City': 2,
					'Age': 1
				}
			},
			sortOptions: {
				currentValue: 'newest',
				values: {
					// values mapped to firebase locations
					'newest': 'time'
				}
			}
		};
	},

	setSortBy: function( value ) {
		this.settings.sortOptions.currentValue = value;
	},

	setFilterBy: function( value ) {
		this.settings.filterOptions.currentValue = value;
		// var filteredPosts = this.getFilteredPosts(value);
		var filteredPosts = this.currentPuclicData.posts;

		this.trigger(this._getThisData());
	},

	loadMoarLikers: function() {
		this.settings.offset += LIKERS_PER_PAGE;
		this.loadLikersFromPhotoUrl();
	},


	getDefaultData: function() {
		return this._getThisData();
	},

	_getThisData: function() {

		return {
			likers: this.likers || {},
			settings: this.settings
		};
	},

	loadLikersFromPhotoUrl: function( url = this.settings.url ) {
		var settings = this.settings;


		settings.url = url;
		settings.isLoaded = true;
		console.log("Load likers from photo url");
		// this.trigger( this._getThisData() );

		request
			.get('/all')
			.end(function( err, res ) {
				console.log('Response', res);
				this.currentPuclicData = res;
				this.trigger({
					currentPuclicData: this.currentPuclicData,
					settings
				});
			});
	},


});


module.exports = LikersStore;
