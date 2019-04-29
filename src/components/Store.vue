<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a href="#" class="navbar-brand">SPORST STORE</a>
            </div>
        </div>
        <div class="row">
            <div class="col-2 bg-info p2">
                <category-list />
            </div>
            <div class="col-10 p-2">
                <product-list />
            </div>
        </div>
    </div>
</template>

<script>

import productList from './ProductList.vue';
import categoryList  from './CategoryList.vue';

export default {
    components: {
        productList,
        categoryList
    }
}
</script>

