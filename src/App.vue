<template>
  <LeftNavLayout>
    <router-view />
  </LeftNavLayout>
</template>

<script>
import LeftNavLayout from './layouts/leftNavLayout' ;
export default {
  name: 'App',

  components: {
    LeftNavLayout
  },

  data: () => ({
    //
  }),

  beforeMount(){

  }
};
</script>
