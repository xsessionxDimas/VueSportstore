<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a href="#" class="navbar-brand">SPORST STORE</a>
                <cart-summary />
            </div>
        </div>
        <div class="row">
            <div class="col-2 bg-info p2">
                <category-list class="mb-5"/>
                <button class="btn btn-block btn-warning mt-5"
                        v-on:click="setShowSearch(true)">
                    Search
                </button>
            </div>
            <div class="col-10 p-2">
                <search />
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>

import productList   from './ProductList.vue';
import categoryList  from './CategoryList.vue';
import cartSummary   from './CartSummary.vue';
import search        from './Search.vue';
import { mapMutations, mapActions } from 'vuex';


export default {
    components : {
        productList,
        categoryList,
        cartSummary,
        search
    },
    methods : {
        ...mapActions(["getData"]),
        ...mapMutations(["setShowSearch"])
    },
    created : function() {
        this.getData();
    }
}
</script>

