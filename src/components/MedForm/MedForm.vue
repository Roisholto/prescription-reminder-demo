<template>
  <v-card>
    <v-card-text>
      <v-form id="add-med-form" ref="medForm" @submit.prevent="formSubmit">
        <v-text-field
          name="label"
          placeholder="Label"
          v-model="local_inputs.label"
          hint="Enter a label you can use to group medications"
          :rules="[v => !!v || 'Name is required']"
          >
        </v-text-field>
        <MedItems :items="local_inputs.meds"/>
        <div class="d-flex flex-column">
          <div class="">Start at</div>
          <div class="d-flex">
            <div style="width:100px" class="pr-2">
              <v-text-field
                @click="[time_vars.comp = 0 , time_vars.open = true]"
                v-model="time_vars.date"
                ref="preorderInput"
                hide-details
                placeholder="Date"/>
            </div>
            <div style="width:80px">
              <v-text-field
                hide-details
                  @click="[time_vars.comp = 1 ,time_vars.open = true]"
                  v-model="time_vars.time"
                  placeholder="Time"/>
            </div>
          </div>
        </div>

        <v-textarea name="notes" v-model="local_inputs.notes" placeholder="Notes"/>
      </v-form>
      <v-dialog v-model="time_vars.open" max-width="400">
        <v-date-picker
          v-model="time_vars.date"
          color="primary"
          @input="time_vars.open = false"
          v-if="time_vars.comp == 0">
        </v-date-picker>
        <v-time-picker
          v-model="time_vars.time"
          @input="time_vars.open = false"
          v-else>
        </v-time-picker>
      </v-dialog>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn type="submit" color="primary" form="add-med-form" :loading="requesting">
        SUBMIT
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{snackbar.message}}
    </v-snackbar>
  </v-card>
</template>
<script>
import MedItems from './MedItems.vue' ;
import { required } from 'vuelidate/lib/validators'
import {addFromMedGroup, updateMed} from '@/api/medform.js' ;
import moment from 'moment' ;

export default {
  name:"MedForm",
  props:{

    action:{
      type:String,
      default:()=>'create'
    },

    inputs:{
      type:Object,
      required:false,
      default:()=>{
        return {
          label: '',
          meds: [],
          notes: ''
        }
      }
    }
  },

  data(){
    return {
      local_inputs:{},
      time_vars:{
        open:false,
        comp:'date',
        date:null,
        time:null
      },
      snackbar:{
        color:'',
        show:false,
        message:''
      },
      requesting:false
    }
  },

  validations:{
    label:{
      required
    }
  },

  computed:{
    start_at:{
      set(x){
        let str = x.split(' ') ;
        this.time_vars.date= str[0] ;
        this.time_vars.time = str[1] ;
      },

      get(){
        let t = this.time_vars.date+' '+this.time_vars.time ;
        let a = moment(t)
        return  a.format();
      }
    }
  },

  components:{
    MedItems
  },

  beforeMount(){
    this.local_inputs = Object.assign(this.local_inputs, this.inputs) ;
  },

  methods:{
    formSubmit(){

      // ensure
      if(this.$refs.medForm.validate()){
        console.log('submitting form') ;
        let vm = this ;
        this.requesting = true ;
        let req = this.action == 'create' ? addFromMedGroup : updateMed ;
        req(this.inject_var())
          .then(function(resp){
            console.log(resp)
            let data = resp.data ;
            if(data.succ)
              {
              vm.snackbar.message='Input added' ;
              vm.$router.push({name:"med-list"})
              vm.snackbar.color="success" 
              }
            else
              {
              vm.snackbar.message= data.description
              vm.snackbar.color="danger"
              }
            vm.snackbar.show = true ;
          })
          .catch(function(e){
            console.log('error requesting', e) ;
          })
          .finally(function(){
            vm.requesting = false ;
          })

      }
      else
        {
        console.log('validation failed') ;
        }
      // this.$v.$touch()
    },

    inject_var(){
      let input = Object.assign({},this.local_inputs) ;
      let vm = this ;
      input.meds.forEach(function(v){
        v.start_at = vm.start_at
        v.interval = parseFloat(v.interval) ;
      })
    //   delete input.start

      return input ;
    }
  }
}
</script>
