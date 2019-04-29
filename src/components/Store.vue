<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col bg-dark text-white">
                <a href="#" class="navbar-brand">SPORST STORE</a>
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-info p2">
                <h4 class="text-white m-2">Categories</h4>
            </div>
            <div class="col-9 p-2">
                <ProductList />
            </div>
        </div>
    </div>
</template>

<script>

import ProductList from './ProductList.vue';

export default {
    components: {
        ProductList
    }
}
</script>

