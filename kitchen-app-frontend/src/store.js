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
  	loading: true,
    filterKeys: ['action', 'dish', 'station']
  },
  getters: {
  	GET_FILTER_OPTIONS ( state ) {
  		return state.filterValues;
  	},
  	GET_SELECTED_VALUE ( state ) {
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
  	},
    GET_FILTER_KEYS ( state ) {
      return state.filterKeys;
    }

  },
  mutations: {
  	UPDATE_DISTINCT_VALUES ({ state }, filterValues ) {
      this.state.filterKeys.forEach( function(key) {
        if ( filterValues[key].length > 1 ) {
  		    this.state.filterValues[key] = filterValues[key];
        }
      }, this);
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
      // update value of loading 
  		commit('UPDATE_LOADING', true);

      // send the current selected values which are being filtered on
  		const selectedValues = this.state.selectedValues;
  		const request = {
  			method: 'PUT',
  			url: 'http://127.0.0.1:5000/filterData',
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
        // update the value of loading since HTTP request finished
  			commit('UPDATE_LOADING', false);
  		})
  		.catch(function (error) {
  			console.log(error);
  		})
  	},
    // change the selected values when the filter set changes 
  	FILTER_CHANGED ({commit, dispatch}, payload){
  		commit('UPDATE_SELECTED_VALUE', payload);
  	}
    
  }
})
