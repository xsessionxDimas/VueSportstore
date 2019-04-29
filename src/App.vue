<template>
  <router-view />
</template>

<script>
import storeComponent from './components/Store.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',  
  methods: {
    ...mapActions(["getData"])
  },
  created() {
     this.getData();
  }
}
</script>
