import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	filterValues : {
  		action : [],
  		dish : [],
  		station : []
  	},
  	actionFilterValue : "any",
  	dishFilterValue : "cake",
  	stationFilterValue : "any",
  	filterResults: [], 

  },
  getters: {

  },
  mutations: {
  	UPDATE_INITIAL_VALUES ({ state }, filterValues ) {
  		this.state.filterValues = filterValues;
  	},
  	UPDATE_FILTER_RESULTS ({ state }, results ) {
  		this.state.filterResults = results;
  		console.log(this.state.filterResults)
  	},

  },
  actions: {
  	FIND_INITIAL_VALUES ({ commit }) {
  		const request = {
  			method: 'GET',
  			url: 'http://localhost:5000/initialData'
  		};

  		axios(request).then( function(response) {
  			commit('UPDATE_INITIAL_VALUES', response.data);
  		})
  		.catch(function (error) {
  			console.log(error);
  		});
  	},
  	FIND_FILTERED_DATA ({ commit }) {
  		const request = {
  			method: 'PUT',
  			url: 'http://localhost:5000/filterData',
  			params: { 
  				action : this.state.actionFilterValue,
  				dish : this.state.dishFilterValue,
  				station : this.state.stationFilterValue
  			}
  		};

  		axios(request).then( function(response) {
  			commit('UPDATE_FILTER_RESULTS', response.data)
  		})
  		.catch(function (error) {
  			console.log(error);
  		})
  	},
  	
  }
})
