<template>
    <div>
        <div class="card m-1 p 1 bg-light" v-for="(p, i) in products" v-bind:key="`${i}-${p.id}`">
            <h4>{{p.name + "-" + p.category}} 
                <span class="badge badge-pill badge-primary float-right mt-1 mr-1">
                    <!-- pipeline angular style -->
                    {{p.price | currency}}
                </span>
            </h4>
            <div class="card-text bg-white p-1">
                {{p.description}}
                <button class="btn btn-success btn-sm float-right"
                  v-on:click="handleProductAdd(p)">
                    Add To Cart
                </button>
            </div>               
        </div>
        <pager />
    </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";
import pager from "./Pager";

export default {
    components: {
        pager
    },
    computed: {
        /* call data from vuex treat as dictionary with key is the name of the property */
        ...mapGetters({
            products: "processedProducts"
        })
    },
    filters: {
        
    },
    methods: {
        ...mapMutations({ addProduct: "cart/addProduct" }),
        handleProductAdd(product){
            console.log(product);
            this.addProduct(product);
            this.$router.push("/cart");
        }
    }
}
</script>