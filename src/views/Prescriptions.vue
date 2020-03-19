<template>
  <div>
    <v-breadcrumbs :items="bread"/>
    <MedItems :items="items"/>
  </div>
</template>
<script>
import MedItems from '@/components/Meds/MedItems.vue' ;
export default {
  name:"Prescriptions",

  props:{
    group:{
      type:Object
    },
    items:{
      type:Array,
      required:true,
      default(){
        return []
      }
    }
  },

  data(){
    return {
      bread:[
        {
          text: "Meds",
          link:true,
          disabled: false,
          exact:true,
          to: {name:"med-list"}
        },
        {
          text: "Prescription",
          link:true,
          disabled: false,
          exact:true,
          to: {name:"prescriptions"}
        }
      ]
    }
  },

  components:{
    MedItems
  }


}
</script>
