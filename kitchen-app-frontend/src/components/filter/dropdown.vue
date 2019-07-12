<template>
	<span class="dropdown">
      <select
        class="select"
        v-model="selectedOption"
        @input="event => { $emit('input', event.target.value) }">
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </span>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'dropdown',
  props: {
    value: null,
    filterKey: String,
    options: Array, 
  },
  data () {
    return {
      selectedOption: 'any'
    }
  },
  methods: {
    ...mapActions([
      'FILTER_CHANGED',
      'FIND_FILTERED_DATA'
      ])
  },
  watch: {
    selectedOption: function (newValue) {
      this.FILTER_CHANGED({ 'newVal' : newValue, 'key': this.filterKey });
  },
}
}
</script>

<style>
  .select {
    width: 100px;
  }

</style>
