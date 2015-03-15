var request = require('superagent');
var nodeUrl = require('url');
var _ = require('underscore');

var urlFormatOptions = {
	protocol: 'https',
	domain: 'vk.com'
};

module.exports = {

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

	_getPhotoInfo: function( photoUrl ) {
		var photoId = photoUrl.match(/photo([\-\d\_]+)/)[1];
		return new Promise(function( resolve ) {
			VK.Api.call('photos.getById', { photos : photoId }, function( response ) {
				resolve( response.response[0] );
			});
		});
	},

	_countUsers: function( ownerId, itemId ) {
		var query = {
			owner_id : ownerId,
			item_id : itemId
		}
		VK.Api.call('execute.countLikes', query, function( response ) {

		});
	},

	loadLikersFromPhotoUrl: function( photoUrl ) {

	}
};
