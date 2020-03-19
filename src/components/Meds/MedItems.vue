// list each prescription
<template>
  <div class="">
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Dosage</th>
          <th class="text-left">Total Dosage</th>
          <th class="text-left">Interval</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <MedItem
          v-for="(item, index) in items"
          :item="item"
          :key="item.id"
          @item-deleted="itemDeletedEvent"
          @usage-added="usageAddedEvent(index, $event)"/>
      </tbody>
    </template>
  </v-simple-table>

  </div>
</template>
<script>
import MedItem from './MedItem.vue' ;

export default{
  name:"MedItems",

  props:{
    group:Object,

    items:{
      type:Array,
      required: true
    },


  },

  data(){
    return {
      local_items:[]
    }
  },




  components:{
    MedItem
  },

  mounted(){
    this.local_items = Array.from(this.items) ;
  },

  methods:{
    itemDeletedEvent(i){
      this.items.splice(i, 1) ;
    },

    usageAddedEvent(i, $e){
      this.items[i].medusage.push($e)
    }
  }
}
</script>
