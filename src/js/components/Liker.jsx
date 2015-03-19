'use strict'
var React   = require('react/addons');
var actions = require('../actions/Actions');
var Link    = require('react-router').Link;
var cities = require('../services/cities');

var Col = require('react-bootstrap/lib/Col');

var anonUser = {
	photo_big: 'http://vk.com/images/deactivated_200.gif',
	'first_name': 'Anon'
};

var Liker = React.createClass({

	mixins: [
		require('../mixins/timeAgo')
	],

	render: function() {
		var liker = this.props.liker;
		var likerAge = liker.bdate;
		var hasYear = likerAge ? !!likerAge.match(/\d{4}/) : false;
		var filteredByCity = !( !this.props.cityFilter || liker.city && liker.city.title.toLowerCase() === this.props.cityFilter );
		var filteredByAge = !( this.props.ageFilter && this.props.ageFilter === 18 );

		if (
			( liker.sex !== 1 ) ||
				filteredByCity ) {

			return null;
		}

		return (
			<Col xs={12} md={3}>
				<div className='profile-photo-container'>
					<img className='profile-photo' src={ liker.photo_200 } alt='photo'/>
				</div>
				<div className=''>
					<a href={ 'https://vk.com/id' + liker.uid }>{ liker['first_name'] }</a>
					<span> { liker.bdate }</span>
				</div>
			</Col>
		);
	}

});

module.exports = Liker;
