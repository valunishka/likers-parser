let Spinner = require('./Spinner.jsx');
let React = require('react/addons');

let LikerImage = React.createClass({

  getDefaultProps: function() {
    return {
      loader: '../../img/loading.gif',
      showImage: false
    };
  },

  componentDidUpdate: function(prevProps) {
    if (!this.props.showImages && prevProps.viewport) {
      this.updatePosition();
    }
  },

  updatePosition: function() {
    let el = this.getDOMNode();
    this.props.updateImagePosition(el.y, el.offsetHeight);
  },

  render: function() {
    let img = ( this.props.showImage ) ? this.props.likerImage: this.props.loader;
    return (
      <img src={img} alt={this.props.alt} />
    );
  }

});

module.exports = LikerImage;
