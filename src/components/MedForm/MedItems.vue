<template>
  <div>
    <div v-for="(item, index) in items" class="d-flex align-center" :key="index">
      <MedItem :item="item" class="flex-grow-1"/>
      <v-btn @click="removeItem(index)" icon>
        <v-icon>
          mdi-minus-circle
        </v-icon>
      </v-btn>
    </div>
    <div class="d-flex justify-end">
      <v-btn icon class="justify-self-end">
        <v-icon color="" @click="addItem">
          mdi-plus-circle
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import MedItem from './MedItem.vue' ;

export default {
  name:"MedItems",

  props:{
    items:{
      type:Array,
      required: true
    },
  },

  model: {
    prop: 'items',
    event: 'input'
    },

  data(){
    return {
      local_items:[]
    }
  },

  watch:{
    items(){
      this.$emit('input', this.local_items) ;
    }
  },

  components:{
    MedItem
  },

  methods:{
    addItem(){
      this.items.push({name:'', dosage:'', dosage_interval:'', dosage_count:'0' }) ;
    },

    removeItem(index){
      this.items.splice(index, 1) ;
    }
  }
}
</script>
