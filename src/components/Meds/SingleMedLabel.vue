<template>
  <v-card>
    <v-card-title>
      {{item.label}}
    </v-card-title>
    <v-card-text>
      
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn icon title="suspend this medication">
        <v-icon>
          mdi-pause
        </v-icon>
      </v-btn>
      <v-btn icon title="Delete this medication">
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name:"SingleMedLabel",
  props:{
    item:{
      type:Object,
      required:true,
    }
  },

  data(){
    return {}
  }

}
</script>
