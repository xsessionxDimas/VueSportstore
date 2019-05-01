<template>
  <router-view />
</template>

<script>
import storeComponent from './components/Store.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',  
  methods: {
    ...mapActions({
      getData: "getData",
      initializeCartData: "cart/initializeCartData"
    })
  },
  filters: {
    /* apply on each element in the arrays data */
    currency(value) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", currency: "USD" 
        }).format(value);
    }
  },
  created() {
     this.getData();
     this.initializeCartData(this.$store);
  }
}
</script>
