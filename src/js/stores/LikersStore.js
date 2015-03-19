'use strict';

var Reflux = require('reflux');
var actions = require('../actions/Actions');
var vkapi = require('../services/vkapi');
var _ = require('underscore');
var Firebase = require('firebase');
var latestSearchesRef = new Firebase('https://liker-finder.firebaseio.com/latestSearches');
var SearchesRef = new Firebase('https://liker-finder.firebaseio.com/Searches');

var cities = require('../services/cities');

var LIKERS_PER_PAGE = 50;

var LikersStore = Reflux.createStore({

	listenables: actions,

	init: function() {

		this.likers = [];

		this.settings = {
			currentPage: 1,
			url: '',
			nextPage: true,
			offset: 0,
			isLoaded: false,
			isLoading: false,
			latestSearches: [],
			filterOptions: {
				currentValue: 'All',
				cityFilter: null,
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
		this.trigger(this._getThisData());
	},

	setCityFilterBy: function( city ) {
		this.settings.filterOptions.cityFilter = city.toLowerCase();
		console.log('Cities', cities.getCitiesInfo());
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
			likers: this.likers || [],
			settings: this.settings
		};
	},

	saveLastestSearchEntity: function( params ) {

		latestSearchesRef.push( params );

	},

	loadLikersFromPhotoUrl: function( url = this.settings.url ) {
		var settings = this.settings;


		settings.url = url;
		settings.isLoading = true;
		console.log("Load likers from photo url");
		// this.trigger( this._getThisData() );

		SearchesRef.push( url );

		vkapi.loadLikersFromPhotoUrl( url ).then(_.bind(function( res ) {

			this.saveLastestSearchEntity({
				url: url,
				results: res.length
			});

			this.likers = res;
			this.trigger({
				likers: res,
				settings: this.settings
			});
		}, this)).catch(( err ) => {
			console.log('Error! - ', err);
		});
	},


});


module.exports = LikersStore;
