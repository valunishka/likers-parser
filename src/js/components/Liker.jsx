let React = require('react/addons');
let actions = require('../actions/Actions');
let moment = require('moment');
let LikerImage = require('./LikerImage.jsx');
let Col = require('react-bootstrap/lib/Col');

var Liker = React.createClass({

  getInitialState: function() {
    return {
      showImage: false
    };
  },

  getDefaultProps: function() {
    return {
      showImage: false
    };
  },

  componentWillMount: function() {
    // allow image display override
    if (this.props.showImage) {
      this.setShowImage(true);
    }
  },

  updateImagePosition: function(top, height) {
    // image is already displayed, no need to check anything
    if (this.state.showImage) {
      return;
    }

    // update showImage state if component element is in the viewport
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + this.props.viewport.height;

    if ((min <= (top + height) && top <= (max - 300))) {
      this.setShowImage(true);
    }
  },

  setShowImage: function(show) {
    this.setState({
      showImage: !!show
    });
  },

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
          <LikerImage
						className='profile-photo'
						src={this.props.image}
						alt={this.props.title}
						viewport={this.props.viewport}
						showImage={this.state.showImage}
						likerImage={ liker.photo_200 }
            updateImagePosition={this.updateImagePosition} />

				</div>
				<div>
					<a href={ 'https://vk.com/id' + liker.id }>{ liker['first_name'] }</a>
					<span> { liker.bdate }</span>
				</div>
			</Col>
		);
	}

});

module.exports = Liker;
