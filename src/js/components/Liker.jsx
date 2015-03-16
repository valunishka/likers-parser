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
		var liker = this.props.liker,
			userAge = this.timeAgo(liker.bighday);

		if (
			( this.props.filterBy !== 'All' && liker.sex !== this.props.filterBy ) ||
			( this.props.cityFilter && this.props.cityFilter !== cities.getCityNameById( liker.city ).toLowerCase() ) ) {

			return null;
		}

		return (
			<Col xs={12} md={3}>
				<div className='profile-photo-container'>
					<img className='profile-photo' src={ liker.photo_big } alt='photo'/>
				</div>
				<div className=''>
					<a href={ 'https://vk.com/id' + liker.uid }>{ liker['first_name'] }</a>
				</div>
			</Col>
		);
	}

});

module.exports = Liker;
