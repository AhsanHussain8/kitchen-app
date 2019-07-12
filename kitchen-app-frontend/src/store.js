import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	filterValues : {
  		action : ["any"],
  		dish : ["any"],
  		station : ["any"]
  	},
  	selectedValues : {
	  	action : "any",
	  	dish: "any",
	  	station : "any",
	},
  	filterResults: [], 
  	aggregateDurations : {
  		action : [],
  		dish : [],
  		station : []
  	},
  	totalDuration: 0,
  	loading: false
  },
  getters: {
  	GET_SINGLE_FILTER_OPTIONS ( state ) {
  		return state.filterValues;
  	},
  	GET_SINGLE_SELECTED_VALUE ( state ) {
  		return state.selectedValues;
  	},
  	GET_FILTER_RESULTS ( state ) {
  		return state.filterResults;
  	},
  	GET_DURATIONS ( state ) {
  		return state.aggregateDurations;
  	},
  	GET_AVERAGE_DURATION ( state ) {
  		return state.totalDuration/state.filterResults.length;
  	},
  	GET_LOADING_STATE( state ) {
  		return state.loading;
  	}

  },
  mutations: {
  	UPDATE_DISTINCT_VALUES ({ state }, filterValues ) {
  		this.state.filterValues = filterValues;
  	},
  	UPDATE_FILTER_RESULTS ({ state }, results ) {
  		this.state.filterResults = results;
  	},
  	UPDATE_AGGREGATE_DURATIONS({ state }, durations ) {
  		this.state.aggregateDurations = durations;
  	},
  	UPDATE_SELECTED_VALUE({ state }, payload) {
  		const key = payload.key;
  		this.state.selectedValues[key] = payload.newVal;
  	},
  	UPDATE_TOTAL_DURATION({ state }, duration) {
  		this.state.totalDuration = duration;
  	},
  	UPDATE_LOADING({ state }, value) {
  		this.state.loading = value;
  	}

  },
  actions: {
  	FIND_FILTERED_DATA ({ commit, state }) {
  		commit('UPDATE_LOADING', true);
  		const selectedValues = this.state.selectedValues;
  		const request = {
  			method: 'PUT',
  			url: 'http://localhost:5000/filterData',
  			params: { 
  				action : selectedValues.action,
  				dish : selectedValues.dish,
  				station : selectedValues.station
  			}
  		};

  		axios(request).then( function(response) {
  			commit('UPDATE_FILTER_RESULTS', response.data['resultsList']);
  			commit('UPDATE_DISTINCT_VALUES', response.data['distinctValues']);
  			commit('UPDATE_AGGREGATE_DURATIONS', response.data['aggregateDurations']);
  			commit('UPDATE_TOTAL_DURATION', response.data['totalDuration']);
  			commit('UPDATE_LOADING', false);
  		})
  		.catch(function (error) {
  			console.log(error);
  		})
  	},
  	FILTER_CHANGED ({commit, dispatch}, payload){
  		commit('UPDATE_SELECTED_VALUE', payload);
  	}
  }
})
