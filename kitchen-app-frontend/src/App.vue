<template>
  <div id="app">
    <FilterSelection :filterKeys="filterKeys"></FilterSelection>
    <div id="body" v-if="!loading">
      <ResultsList></ResultsList>
      <AggregateResults :filterKeys="filterKeys"></AggregateResults>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FilterSelection from './components/FilterSelection.vue';
import ResultsList from './components/ResultsList';
import AggregateResults from './components/AggregateResults';

export default {
  name: 'app',
  components: {
    FilterSelection,
    ResultsList,
    AggregateResults
  },
  data () {
    return {
      filterKeys : ['action', 'dish', 'station'],
    }
  },
  computed: {
    ...mapGetters({
      loading: 'GET_LOADING_STATE'
    })
  },
  methods: {
    ...mapActions([
      'FIND_FILTERED_DATA'
      ])
  },
  mounted () {
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


</style>
