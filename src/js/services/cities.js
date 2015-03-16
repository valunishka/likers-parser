var _ = require('underscore');
var cities = {};

var getCitiesInfo = function( citiesIds ) {

	if ( !citiesIds ) return ( cities );

	return new Promise(function( resolve ) {
		var query = {
			city_ids: citiesIds
		};
		VK.Api.call('database.getCitiesById', query, function( response ) {
			response = response.response;
			_.forEach(response, (item) => {
				cities[ item.cid ] = item;
			});
			resolve( cities );
		});
	});
};

var getCityNameById = function( cityId ) {
	if ( !cityId ) return '';
	return cities[ cityId ].name;
};

module.exports = {
	getCitiesInfo,
	getCityNameById
};
