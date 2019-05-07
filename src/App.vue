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
       initializeCartData: "cart/initializeCartData"
    })
  },
  created() {
     this.initializeCartData(this.$store);
  }
}
</script>
