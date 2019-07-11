<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions([
      'FIND_INITIAL_VALUES',
      'FIND_FILTERED_DATA'
      ])
  },
  mounted () {
    this.FIND_INITIAL_VALUES();
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
