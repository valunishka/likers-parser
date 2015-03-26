'use strict'

var React      = require('react/addons');
var Reflux     = require('reflux');
var actions    = require('../actions/Actions');
var likersStore = require('../stores/LikersStore');
var Waypoint   = require('react-waypoint');
var Spinner    = require('../components/Spinner.jsx');
var Liker      = require('../components/Liker.jsx');
var Router     = require('react-router');
var _          = require('underscore');

var Jumbotron = require('react-bootstrap/lib/Jumbotron');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var ProgressBar = require('react-bootstrap/lib/ProgressBar');
var Panel = require('react-bootstrap/lib/Panel');
var Modal = require('react-bootstrap/lib/Modal');
var Infinite = require('react-infinity');

var paginationOffset = 20;

var LikersFeed = React.createClass({

	mixins: [
		Router.Navigation,
		Reflux.listenTo(likersStore, 'onStoreUpdate')
	],

	getInitialState: function() {
		var likersData = likersStore.getDefaultData();
		return {
			isLoading: false,
			isloaded: false,
			onAuthAgree: false,
			likers: likersData.likers || [],
			countRenderedLikers: 0,
			sortOptions: likersData.settings.sortOptions,
			filterOptions: likersData.settings.filterOptions,
			nextPage: likersData.settings.nextPage,
			currentPage: likersData.settings.currentPage
		};
	},

	onStoreUpdate: function(likersData) {
		// if (!likersData.posts.length) {
		// 	// if no posts are returned
		// 	this.transitionTo('home');
		// }
		this.setState({
			isLoading: likersData.isLoading || false,
			isLoaded: likersData.settings.isLoaded,
			likers: likersData.likers,
			sortOptions: likersData.settings.sortOptions,
			filterOptions: likersData.settings.filterOptions,
			nextPage: likersData.settings.nextPage,
			currentPage: likersData.settings.currentPage
		});
	},

	updateSortBy: function(e) {
		e.preventDefault();
		var currentPage = this.state.currentPage || 1;

		actions.setSortBy(this.refs.sortBy.getDOMNode().value);

		this.setState({
			isLoading: true
		});

		if (currentPage === 1) {
			actions.stopListeningToPosts();
			actions.listenToPosts(currentPage);
		} else {
			this.transitionTo('likes', { pageNum: 1 });
		}
	},

	updateFilterBy: function(event) {
		event.preventDefault();

		var currentPage = this.state.currentPage || 1;

		actions.setFilterBy(this.refs.filterBy.getDOMNode().querySelector('input').value);
		this.setState({
			isLoading: true
		});

		// if (currentPage === 1) {
		// 	actions.stopListeningToPosts();
		// 	actions.listenToPosts(currentPage);
		// } else {
		// 	this.transitionTo('posts', { pageNum: 1 });
		// }

	},

	updateCityFilterBy: function( event ) {
		event.preventDefault();

		this.setState({
			isLoading: true
		});

		actions.setCityFilterBy( this.refs.cityFilterInput.getDOMNode().querySelector('input').value );

	},

	loadMoarLikes: function() {
		// if (this.state.isLoaded) {
		// 	this.setState({ isLoading: true });
		// 	actions.loadMoarLikes();
		// }

		this.setState({
			countRenderedLikers: this.state.countRenderedLikers + paginationOffset
		});
	},

	onNewSearch: function() {
		var url = this.refs.urlInput.getDOMNode().querySelector('input').value;

		this.setState({
			isLoading: true
		});

		//TODO match photo id
		// if (url) url = url.match(/\/([\w\d]+)$/)[1];
		actions.loadLikersFromPhotoUrl( url || 'https://vk.com/mdk?z=photo-10639516_361350455%2Falbum-10639516_00%2Frev' );
	},

	getLikersToRender: function( likers ) {
		var result = likers.slice( this.state.countRenderedLikers, paginationOffset );
		return result;
	},

	getMoarLikersToRender: function( likers ) {
		this.setState({
			countRenderedLikers: this.state.countRenderedLikers + paginationOffset
		});
	},

	onAuthAgree: function() {
		this.setState({
			authAgree: true
		});
		VK.init({
			apiId: 4830522
		});
		VK.Auth.login();
	},

	handleKeyPress: function( event ) {
		console.log(event.type, event.which, event.timeStamp);
		if ( event.which === 13 ) this.onNewSearch();
	},

	render: function() {
		var likers = this.state.likers,
			currentPage = this.state.currentPage || 1,
			countRenderedLikers = this.state.countRenderedLikers,
			sortOptions = this.state.sortOptions,
			filterOptions = this.state.filterOptions,
			cityFilter = this.state.filterOptions.cityFilter,
			filterValues = Object.keys(filterOptions.values),
			sortValues = Object.keys(sortOptions.values);

		likers = _.map(likers, function( liker ) {
			if ( !_.isObject(liker) ) return;
			return (
				<Liker
					liker={ liker }
					filterBy={ filterOptions.values[filterOptions.currentValue] }
					cityFilter={ cityFilter }
					key={ liker.uid } />
			);
		});

		var options = sortValues.map(function(optionText, i) {
			return <option value={ sortOptions[ i ] } key={ i }>{ optionText }</option>;
		});

		filterOptions = filterValues.map((text, i) => {
			return <option value={ filterOptions[ i ] } key={ i }>{ text }</option>;
		});

		return (
			<div className='posts-wrapper container'>
				<Jumbotron>
					<h1>Find your destiny</h1>
					<p>Тут, ты, кароч, можешь найти себе тянку. Навеяно постом шаристого анона.</p>
					<quote> короче к делу<br/>

					ПАЛЮ МЕГА СУПЕР ГОДНЫЙ СПОСОБ НАХОДИТЬ ТЯН,КОТОРЫЕ В ПОИСКАХ ПАРНЯ/СТРАДАЮТ ХУИСТРАДАНИЕМ НА ПОЧВЕ ОТСУТСТВИЯ ПАРНЯ.<br/>

					Нужно короче,чтобы можно было брать какой-то пост/ картинку,и чтобы происходила сортировка по ней среди тех,кто лайкнул эту запись по городам.Можно еще и по возрасту прикрутить<br/>

					Есть такая тема,как всякие паблики со шкурами постят пикрелейтед и шкуры их лайкают.Но сами понимаете при лайках 3к+ а их на много больше на пабликах типо ИБД(прост пример),да 100 лайков то сидеть,прокликивать шкур и смотреть какая из них с твоего города не очень занимательное занятие(если ты не с ДС-ДС2).<br/>
					Стандартными средствами макаки дурова такое не предусмотрели.<br/>
					Анон,все в твоих рука,если ты шаришь в веб ты подаришь этому миру ахуенейший инструмент.<br/>
					</quote>
					<p>
						<a href='https://vk.com/mdk?z=photo-10639516_361350455%2Falbum-10639516_00%2Frev'>пример поста хуестраданий</a>
						<br/>
						<a href='https://vk.com/pages?oid=-1&p=photos.getById'>Почему нужна авторизация вк</a>
					</p>

				</Jumbotron>
				<Panel className={ 'post-finder-dashboard row' }>
					<Input
						type={'text'}
						placeholder='https://vk.com/mdk?z=photo-10639516_361350455%2Falbum-10639516_00%2Frev'
						onKeyPress={ this.handleKeyPress }
						label={ 'Ссылка на пикчу' }
						ref={ 'urlInput' } />
					<Button
						onClick={ this.onNewSearch }
						bsStyle={ 'primary' } >
						Make magic
					</Button>
					<div className='city-filter-container'>
						<Input
							type={ 'text' }
							placeholder={ 'Moscow' }
							label={ 'Фильтрация по городу'}
							ref={ 'cityFilterInput' } />
						<Button
							onClick={ this.updateCityFilterBy }
							bsStyle="primary" >
							Filter
						</Button>
					</div>
				</Panel>
				<Grid>
					<Row className="show-grid">
						{ this.state.isLoading ? '' : { likers } }
						{ this.state.isLoading ? <ProgressBar active now={45} /> : '' }
						<hr />
						<Waypoint onEnter={ this.getMoarLikersToRender }/>
					</Row>
				</Grid>

				{ !true ?
					<div className='static-modal'>
						<Modal title='Информация для параноиков'
							bsStyle='primary'
							backdrop={ false }
							animation={ false }
							onRequestHide={ this.handleHideModal }>
							<div className='modal-body'>
								Приложение использует <a href='https://vk.com/pages?oid=-1&p=photos.getById'>метод </a>
								api вконтакта требующий авторизации
							</div>
							<div className='modal-footer'>
								<Button onClick={ this.onAuthAgree }>Ok</Button>
							</div>
						</Modal>
					</div>
					:
					''
				}

			</div>
		);
	}

});

module.exports = LikersFeed;
