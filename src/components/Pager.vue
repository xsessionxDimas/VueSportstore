<template>
  <div class="row">
    <div class="col-3 form-group">
        <select v-on:change="changePageSize" class="form-control">
            <option value="4">4 per page</option>
            <option value="8">8 per page</option>
            <option value="12">12 per page</option>
        </select>
    </div>
    <div class="text-right col" v-if="pageCount > 1">
      <div class="btn-group mx-2">
        <button
          class="btn"
          v-for="i in pageNumbers"
          v-bind:key="i"
          v-bind:class="getClass(i)"
          v-on:click="setCurrentPage(i)"
        >{{ i }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    /* call data from vuex treat as dictionary with key is the name of the property */
    ...mapState(["currentPage"]),
    ...mapGetters(["pageCount"]),
    pageNumbers() {
      return [...Array(this.pageCount + 1).keys()].slice(1);
    }
  },
  methods: {
    getClass(page) {
      return page == this.currentPage ? "btn-primary" : "btn-secondary";
    },
    ...mapMutations(["setCurrentPage", "setPageSize"]),
    changePageSize($event) {
        this.setPageSize(Number($event.target.value));
    }
  }
};
</script>
