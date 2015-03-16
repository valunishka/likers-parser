var request = require('superagent');
var nodeUrl = require('url');
var _ = require('underscore');
var citiesService = require('./cities');

var urlFormatOptions = {
	protocol: 'https',
	domain: 'vk.com'
};

var likedCount = 0;


	// _getLikersInfoUrl: function( photoInfo ) {
	// 	return nodeUrl.format(_.extend( urlFormatOptions, {
	// 		path: 'method/likes.getList',
	// 		query: {
	// 			'item_id': likers
	// 		}
	// 	}));
	// 	var ownerId = photoInfo.owner_id,
	// 		itemId = photoInfo.id,
	// 		photoSrc = photoInfo.photo_big;
	// 	return new Promise(function( resolve, reject ) {
	// 		VK.Api.
	// 	});
	// },

var _getPhotoInfo = function( photoUrl ) {
	var photoId = photoUrl.match(/photo([\-\d\_]+)/)[1];
	return new Promise(function( resolve ) {
		VK.Api.call('photos.getById', { photos : photoId, v : 5.28 }, function( response ) {
			resolve( response.response[0] );
		});
	});
};

var _getLikedUsers = function( photoInfo, params ) {

	return new Promise(function( resolve ) {
		var query = {
			owner_id : photoInfo.owner_id,
			item_id : photoInfo.id,
			type: 'photo'
		};

		if ( params ) _.extend( query, params );

		VK.Api.call('likes.getList', query, function( response ) {
			response = response.response;
			console.log('MEssage', response);
			if ( likedCount === 0 ) likedCount = response.count;
			resolve( response.users );
		});
	});
};

var _getUsersInfo = function( users ) {

	return new Promise(function( resolve ) {
		var query = {
			uids: users.join(','),
			fields: 'bdate,sex,photo_big,city'
		};

		VK.Api.call('users.get', query, function( response ) {
			response = response.response;
			resolve( response );
		});

	});
};

var _updateCitiesInfo = function( users ) {
	return citiesService.getCitiesInfo( users );
};

var _extractCityIds = function( users ) {
	return _.map(users, (user) => { return user.city });
};

var loadLikersFromPhotoUrl = function( photoUrl ) {

	return new Promise(function( resolve ) {
		var likeCounts = 0;

		_getPhotoInfo( photoUrl )
			.then( _getLikedUsers )
			.then( _getUsersInfo )
			.then(function( response ) {
				_updateCitiesInfo( _extractCityIds( response ) ).then(function() { resolve( response ) });
			});
	});
};

module.exports = {
	loadLikersFromPhotoUrl: loadLikersFromPhotoUrl
};
