<template>
  <div>
    <v-progress-linear indeterminate :active="fetching"></v-progress-linear>
    <div class="row">
      <div v-for="item in items" class="col-12 col-sm-6 col-md-3 " :key="item.id">
        <v-card>
          <v-card-subtitle class="subtitle-1 ">
            <div class="">{{item.label}}</div>
          </v-card-subtitle>
          <v-card-text>
            <div class="pb-2">Contains {{item.meds.length}} prescriptions</div>
            <div class="">Created  <span class="font-weight-bold">{{ created_at(item.created_at) }}</span> </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn class=""
              icon
              color="primary"
              :to="{name:'prescriptions', params:{items:item.meds, group:item}}">
              <v-icon >
                mdi-information-outline
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios' ;
import {API_ENDPOINT} from '@/constants.js' ;
import moment from 'moment' ;

export default{
  name:"MedList",

  data(){
    return {
      fetching: false,
      items:[]
    }
  },

  mounted(){
    this.fetchMeds() ;
  },

  methods:{
    created_at(x){
      return moment(x).fromNow() ;
    },

    fetchMeds(){
      let url = `${API_ENDPOINT}/medgroup` ;
      let vm = this ;
      vm.fetching = true ;
      axios.get(url)
        .then(function(r){
          let data = r.data ;
          if(data.succ){
            vm.items = data.data ;
          }
          else{
            // display an error message ;
          }
        })
        .catch(function(e){
          console.log('error fetching medgroup', e)
        })
        .finally(function(){
          vm.fetching = false
        }) ;
    }
  }
}
</script>
