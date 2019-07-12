<template>
  <div class="filter">
    <span v-for="key in filterKeys">
      <label id="label" for="component-dropdown"> {{ key }} </label>
      <dropdown id="component-dropdown" :filterKey="key" :options="allOptions[key]"></dropdown>
    </span>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dropdown from './dropdown.vue'

export default {
  name: 'FilterSelection',
  props: {
    filterKeys: Array,
  },
  components: {
    dropdown
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
        this.FIND_FILTERED_DATA();
      },
      deep: true,
    },
  },
}
</script>

<style>
.filter {
  display: flex;
  width: 50%;
  justify-content: space-between;
}

.label {
  display: inline;
  margin: 10%;
}

</style>
