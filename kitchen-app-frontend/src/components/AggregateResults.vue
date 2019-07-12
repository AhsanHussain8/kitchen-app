<template>
  <div v-if="allDurations.action.length > 0" id="donuts">
    <vc-donut id="donut"
    v-for="key in filterKeys" 
    :total="100.1" has-legend legend-placement="top" :sections="allDurations[key]"></vc-donut>
  </div>
</template>

<script>
import Vue from 'vue'
import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';
Vue.use(Donut);

import { mapGetters } from 'vuex';

export default {
  name: 'AggregateResults',
  components: {
  },
  props: {
    filterKeys: Array,
  },
  computed: {
    ...mapGetters({
      allDurations: 'GET_DURATIONS'
    }),
  },
}
</script>

<style>
  #donuts {
    width: 50%;
  }

  #body {
    display: flex;
  }

  #donut {
    margin-bottom: 25px;
  }


</style>
