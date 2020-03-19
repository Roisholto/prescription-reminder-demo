<template>
  <div>
    <v-list>
      <v-list-item v-for=" (time, index) in timeToTakeEachPortion" :key="index">
        <v-list-item-content>
          <v-list-item-title>{{time}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon
            :disabled="adding_usage"
            :loading="adding_usage_for == index"
            @click="markAsTaken(index)">
            <v-icon :color="isTaken(index) ? 'primary': 'grey'" >
              {{getTakenIcon(index)}}
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-snackbar v-model="snackbar.show">
      {{snackbar.message}}
    </v-snackbar>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios' ;
import {API_ENDPOINT} from '@/constants' ;

export default {
  name:"MedUsage",
  props:{
    med_id:{
      type:Number,
      required: true
    },

    dosage_count:{
      required:true,
      type:Number
    },

    dosage:{
      required:true,
      type:Number,
    },

    dosage_interval:{
      required:true,
      type:Number
    },

    start:{
      type:String,
      required:true,
    },
    usage:{
      type: Array,
      required: true
    }
  },

  data(){
    return {
      adding_usage:false,
      //index of
      adding_usage_for:null,

      snackbar:{
        show:false,
        message:'',
        color:''
      }
    }
  },

  computed:{
    // the number of times this will be taken
    numberOfPortionsToTake(){
      return this.dosage_count/this.dosage ;
    },

    mergeTaken(){
      let all = Array(this.numberOfPortionsToTake).fill(null) ;
      this.usage.forEach((item) => {
        all[item.portion] = item ;
      });

      return all ;
    },

    timeToTakeEachPortion(){
      let s = [], t ;
      for(let i=0; i < this.numberOfPortionsToTake; i++)
        {
        t = moment(this.start).add(this.dosage_interval*i, 'seconds') ;
        s.push(t.format('llll'))
        }

      return s
    }
  },

  methods:{
    isTaken(index){
      return this.mergeTaken[index] ? true : false ;
    },

    getTakenIcon(index){
      return this.mergeTaken[index] ? 'mdi-check-circle' : 'mdi-check-circle-outline' ;
    },

    markAsTaken(index){
      if(this.isTaken(index)){
         return
       }

      let url = `${API_ENDPOINT}/medusage`
      let data = {
        med_id:this.med_id,
        portion: index
      }
      let vm = this ;
      vm.adding_usage = true ;
      vm.adding_usage_for = index ;

      axios.post(url, data)
        .then(function(r){
          let d = r.data ;
          if(d.succ)
            {
            vm.$emit('usage-added', d.data.entry) ;
            }
          else
            {
            vm.snackbar.message = d.description ;
            vm.snackbar.show = true ;
            }
        })
        .finally(function(){
          vm.adding_usage_for = null
          vm.adding_usage = false
        })
    }
  }


}
</script>
