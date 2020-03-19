<template>
  <leftNavLayout>
    <MedList />
  </leftNavLayout>
</template>
<script>
import MedList from '@/components/Meds/MedList.vue' ;
import LeftNavLayout from '@/layouts/leftNavLayout.vue' ;
export default {
  name:"ListMedsView",

  components:{
    MedList,
    LeftNavLayout
  }
}
</script>
