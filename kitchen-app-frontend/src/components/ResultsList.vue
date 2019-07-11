<template>
  <div>
    <ul>
      <li v-for="row in paginatedData">
        <div>{{ row.action }}</div>
        <span>{{ row.dish }} {{ row.station }}</span>
        <div></div>
        <span>{{ row.duration }} {{ row.startTime }}</span>
      </li>
    </ul>
    <button @click="prevPage" :disabled="pageNumber==0">
      Previous
    </button>
    <button @click="nextPage" :disabled="pageNumber >= pagecount -1">
    Next
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ResultsList',
  data(){
    return {
      // default to page 0
      pageNumber: 0,
      size: 10 
    }
  },
  methods:{
    nextPage(){
      this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    }
  },
  computed: {
    ...mapGetters({
      filterResults: 'GET_FILTER_RESULTS',
    }),
    pageCount() {
      const l = this.filterResults.length;
      const s = this.size;

      return Math.ceil(l/s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;

      return this.filterResults.slice(start, end);
    }
  }
}
</script>

<style>

</style>
