<template>
  <div class="filter">
    <span v-for="key in filterKeys">
      <label for="component-dropdown"> {{ key }} </label>
      <dropdown id="component-dropdown" :filterKey="key" :options="allOptions[key]"></dropdown>
    </span>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dropdown from './dropdown.vue'

export default {
  name: 'FilterSelection',
  components: {
    dropdown
  },
  data () {
    return {
      filterKeys : ['action', 'dish', 'station'],
    }
  },
  methods: {
    ...mapActions([
      'FIND_FILTERED_DATA' // dispatch when selected array changes 
      ])
  },
  computed: {
    ...mapGetters({
      allOptions: 'GET_SINGLE_FILTER_OPTIONS',
      selectedValues: 'GET_SINGLE_SELECTED_VALUE'
      }),
  },
  watch: {
    selectedValues: {
      handler() {
        console.log(this.selectedValues);
        this.FIND_FILTERED_DATA();
      },
      deep: true,
    },
  },
}
</script>

<style>

</style>
