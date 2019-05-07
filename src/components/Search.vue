<template>
    <div class="row my-2" v-if="showSearch">
        <label class="col-2 col-form-label text-right">Search:</label>
        <input  v-bind:value="searchTerm" v-on:input="doSearch" 
                placeholder="Enter search term" class="col form-control">
        <button class="col-1 btn btn-sm btn-secondary mx-4" v-on:click="handleClose">Close</button>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(["showSearch", "searchTerm"])
    },
    methods: {
        ...mapMutations(["setShowSearch"]),
        ...mapActions(["clearSearch", "search"]),
        handleClose() {
            this.clearSearch();
            this.setShowSearch(false);
        },
        doSearch($event){
            this.search($event.target.value);
        }
    }  
}
</script>

