<template>
  <div id="app">
    <FilterSelection></FilterSelection>
    <div></div>
    <ResultsList></ResultsList>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FilterSelection from './components/FilterSelection.vue'
import ResultsList from './components/ResultsList'

export default {
  name: 'app',
  components: {
    FilterSelection,
    ResultsList,
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
