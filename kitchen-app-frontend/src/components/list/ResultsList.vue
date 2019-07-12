<template>
  <div style="width: 49%">
    <div id="buttons">
      <button @click="prevPage" :disabled="pageNumber==0"> Previous </button>
       {{ (pageNumber+1)*size-size+1 }} to {{ (pageNumber+1)*size }} of {{ pageCount*size }}
      <button @click="nextPage" :disabled="pageNumber >= pageCount -1"> Next </button>
    </div>
    <div id="list" align="left">
      <ul>
        <li id="li" v-for="row in paginatedData">
          <div><strong>{{ row.action }}</strong></div>
          <div>Dish: <em>{{ row.dish }}</em></div> 
          <div>Location: <em>{{ row.station }}</em></div> 
          <div>Duration: <em>{{ row.duration }}</em></div>
          <div>Start Time: <em>{{ row.startTime }}</em></div>
        </li>
      </ul>
    </div>
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
      size: 8 
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
    // split list into multiple pages based on size and current page number
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;

      return this.filterResults.slice(start, end);
    }
  }
}
</script>

<style>
  #list {
    text-align: left;
    display: flex;
    justify-content: space-around;
  }

  #buttons {
    justify-content: space-between;
    margin: 10px;
    margin-left: 0px; 
    display: flex;
  }

  ul{
    border: 1px solid black;
    margin: 0px;
    padding: 0px;
  }

  #li {
  list-style-type: none;
  padding: 10px 10px;
  text-transform: capitalize;
  }

</style>
