var _ = require('underscore');
var citiesService = require('./cities');

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

var _executeGetLikers = function ( photoInfo, params ) {
	var itemsPerPage = 5000;
	var query = {
		owner_id : photoInfo.owner_id,
		item_id : photoInfo.id,
		itemsToLoad: itemsPerPage,
		offset: params && params.offset || 0,
		v : 5.28
	},
	likers = [];

	return new Promise(function( resolve, reject ) {

		var getLikes = function( offset ) {

			VK.Api.call('execute.getLikes', query, function( response ){

				response = response.response;

				if ( !response.length ) return resolve( likers );
				likers = likers.concat( response );

				if ( likers.length < likedCount ){
					if ( likedCount - likers.length < itemsPerPage ){
						itemsPerPage = likedCount - likers.length;
					}
					setTimeout(function() {
						getLikes( query.offset++ );
					}, 500);
				} else if ( likers.length >= likedCount ) {
					_.filter( likers, function( liker ) {
						return liker.sex === 2;
					});
					resolve( likers );
				}
			});
		};

		getLikes();
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
			if ( likedCount === 0 ) likedCount = response.count;
			resolve( photoInfo );
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
	return _.map(users, function( user ) { return user.city });
};

var loadLikersFromPhotoUrl = function( photoUrl ) {

	return new Promise(function( resolve ) {
		var likeCounts = 0;

		_getPhotoInfo( photoUrl )
			.then( _getLikedUsers )
			.then( _executeGetLikers )
			.then(function( response ) {
				resolve( response );
			});
	});
};

module.exports = {
	loadLikersFromPhotoUrl: loadLikersFromPhotoUrl
};
