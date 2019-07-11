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

  },
  getters: {

  },
  mutations: {
  	UPDATE_FILTER_VALUES ({ state }, filterValues ) {
  		this.state.filterValues = filterValues;
  	},

  },
  actions: {
  	FIND_FILTER_VALUES ({ commit }, filters) {
  		const request = {
  			method: 'GET',
  			url: 'http://localhost:5000/initialData'
  		};

  		axios(request).then( function(response) {
  			commit('UPDATE_FILTER_VALUES', response.data);
  		})
  		.catch(function (error) {
  			console.log(error);
  		});
  	},
  	
  }
})
