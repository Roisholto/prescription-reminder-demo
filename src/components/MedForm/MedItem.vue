<template>
  <div class="d-flex">
    <div class="pr-2">
      <v-text-field v-model="item.name" placeholder="name" hint="Name of drug"></v-text-field>
    </div>
    <div class="px-2">
      <v-text-field v-model="item.dosage" placeholder="dosage" hint="The amount to take per time"></v-text-field>
    </div>
    <div class="px-2">
      <v-text-field v-model="item.dosage_count" placeholder="dosage count" hint="max dosage "></v-text-field>
    </div>
    <div class="px-2">
      <v-text-field v-model="item.dosage_interval" placeholder="interval" type="number"  hint="The next due time to take this drug"></v-text-field>
    </div>
  </div>
</template>
<script>
export default{
  name:"MedItem",
  props:{
    item:{
      required:true,
      type:Object,
      // name dosage interval
    }
  }
}
</script>
