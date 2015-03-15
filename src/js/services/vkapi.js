var request = require('superagent');
var nodeUrl = require('url');
var _ = require('underscore');

var urlFormatOptions = {
	protocol: 'https',
	domain: 'vk.com'
};

module.exports = {

	getPhotoInfoUrl: function( photoUrl ) {

		var photoId = photoUrl.match(/photo-([\d\_]+)/)[1];

		return nodeUrl.format(_.extend( urlFormatOptions, {
			path: 'method/photos.getById',
			query: {
				'photos': photoId
			}
		}));
	},

	getLikersInfoUrl: function( photoInfo ) {
		return nodeUrl.format(_.extend( urlFormatOptions, {
			path: 'method/likes.getList',
			query: {
				'item_id': likers
			}
		}));
	}
};
