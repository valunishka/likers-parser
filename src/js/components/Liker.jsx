'use strict'
var React   = require('react/addons');
var actions = require('../actions/Actions');
var moment = require('moment');

var Col = require('react-bootstrap/lib/Col');


var Liker = React.createClass({

	render: function() {
		var liker = this.props.liker;
		var likerAge = liker.bdate;
		var hasYear = likerAge ? !!likerAge.match(/\d{4}/) : false;
		var filteredByCity = !( !this.props.cityFilter || liker.city && liker.city.title.toLowerCase() === this.props.cityFilter );
		var filteredByAge = !( this.props.ageFilter && this.props.ageFilter === 18 );
		var filteredBySex = liker.sex !== 1;

		if ( filteredBySex || filteredByCity ) {
			return null;
		}

		return (
			<Col xs={12} md={3}>
				<div className='profile-photo-container'>
					<img className='profile-photo' src={ liker.photo_200 } alt='photo'/>
				</div>
				<div className=''>
					<a href={ 'https://vk.com/id' + liker.id }>{ liker['first_name'] }</a>
					<span> { liker.bdate }</span>
				</div>
			</Col>
		);
	}

});

module.exports = Liker;
