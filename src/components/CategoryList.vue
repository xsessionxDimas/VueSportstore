<template>
    <div class="container-fluid">
        <div class="row my-2" v-for="c in categories" v-bind:key="c">
            <button class="btn btn-block" 
                    v-on:click="setCurrentCategory(c)"
                    v-bind:class="getClass(c)">
                    {{ c }}
            </button>
        </div>
    </div>    
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(["currentCategory"]),
        ...mapGetters(["categories"])
    },
    methods: {
        getClass(category) {
            return category == this.currentCategory ? "btn-primary" : "btn-secondary";
        },
        ...mapActions(["setCurrentCategory"])
    }
}
</script>

