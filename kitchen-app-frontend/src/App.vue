<template>
  <div id="app">
    <FilterSelection></FilterSelection>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FilterSelection from './components/FilterSelection.vue'

export default {
  name: 'app',
  components: {
    FilterSelection,
  },
  methods: {
    ...mapActions([
      'FIND_INITIAL_VALUES',
      'FIND_FILTERED_DATA'
      ])
  },
  mounted () {
    //this.FIND_INITIAL_VALUES();
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
  margin-top: 60px;
}
</style>
