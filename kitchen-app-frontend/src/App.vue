<template>
  <div id="app">    
    <FilterSelection :filterKeys="filterKeys"></FilterSelection>
    <div id="body" v-if="!loading">
      <ResultsList></ResultsList>
      <AggregateResults :filterKeys="filterKeys"></AggregateResults>
    </div>
    <div v-else align="center">
      <Circle9 size="120px" id="spinner"></Circle9>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FilterSelection from './components/filter/FilterSelection.vue';
import ResultsList from './components/list/ResultsList';
import AggregateResults from './components/aggregate/AggregateResults';
import Circle9 from 'vue-loading-spinner/src/components/Circle9';

export default {
  name: 'app',
  components: {
    FilterSelection,
    ResultsList,
    AggregateResults,
    Circle9
  },
  data () {
    return {
      // keys of which filter can be changed for 
      
    }
  },
  computed: {
    ...mapGetters({
      loading: 'GET_LOADING_STATE',
      filterKeys : 'GET_FILTER_KEYS'
    })
  },
  methods: {
    ...mapActions([
      'FIND_FILTERED_DATA'
      ])
  },
  mounted () {
    // get the data whenever the app begins 
    this.FIND_FILTERED_DATA();
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

#spinner {
  width: 200px; 
  height: 200px; 
  transform: scale(.75);
}

</style>
