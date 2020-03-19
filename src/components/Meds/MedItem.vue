<template>
  <tr>
    <td class="">{{item.name}}</td>
    <td class="">{{item.dosage}}</td>
    <td class="">{{item.dosage_count}}</td>
    <td class="">{{getInterval(item.dosage_interval)}}</td>
    <td class="">
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
            icon
            small
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list dense>
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          @click="item.action"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>

      <v-dialog v-model="showdialog" max-width="400">
        <v-card>
          <v-card-title>Delete Prescription</v-card-title>
          <v-card-text>
            Are you sure you want to take this action?
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="showdialog = false">Cancel</v-btn>
            <v-btn text color="primary" @click="deleteItem()" :loading="deleting">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="showusage">
        <v-card>
          <v-card-title>Usage</v-card-title>
          <MedUsage
            :start="item.start_at"
            :med_id="item.id"
            :dosage="item.dosage"
            :dosage_count="item.dosage_count"
            :dosage_interval="item.dosage_interval"
            :usage="item.medusage"
            @usage-added="usageAddedEvent"
            />
            <v-card-actions class="justify-end">
              <v-btn text @click="showusage = false">Close</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar.show">
        {{snackbar.message}}
      </v-snackbar>
    </td>
  </tr>
  <!--<div class="row align-center">

    <div class="col px-2">

    </div>

  </div> -->
</template>
<script>
import MedUsage from './MedUsage.vue' ;
import moment from 'moment' ;
import axios from 'axios' ;
import {API_ENDPOINT} from '@/constants.js' ;

export default {
  name: "MedItem",

  props: {
    displayMode:{
      type:String,
      default:()=>'grid'
    },

    item: {
      type: Object,
      required: true
    }
  },

  data(){
    return {
      menu:[
        {
          title:"Delete",
          action:this.showDeleteDialog
        },
        {
          title:"Progress",
          action:this.viewUsage
        }
      ],
      deleting:false ,
      showdialog:false,
      snackbar:{
        show:false,
        message:'',
        color:''
      },

      showusage:false
    }
  },


  components:{
    MedUsage
  },

  methods:{
    getInterval(x){
      return moment.duration(parseFloat(x), 'seconds').humanize();
    },

    showDeleteDialog(){
      this.showdialog = true ;
      console.log('show dialog') ;
    },

    deleteItem(){
      let url = `${API_ENDPOINT}/meds/${this.item.id}`
      let vm = this ;
      vm.deleting = true ;
      axios.delete(url)
        .then(function(r){
          let data = r.data ;
          if(data.succ)
            {
            // emit an event that the item is delete ;
            vm.$emit('item-deleted') ;
            vm.showdialog = false
            }
          else
            {
            // display a message
            vm.snackbar.message= data.description
            vm.snackbar.show = true
            }
        })
        .finally(function(){
          vm.deleting = false ;
        })
    },

    viewUsage(){
      this.showusage = true ;
    },

    usageAddedEvent(ev){
      this.$emit('usage-added',ev)
    }

  }
}
</script>
