<template>
  <v-form @submit.prevent="login">
    <v-card max-width="400" class="mx-auto">
      <v-card-title class="justify-center text-uppercase">Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="form.email" placeholder="Email"></v-text-field>
        <v-text-field v-model="form.password" placeholder="Password" type="password"></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn type="submit" color="primary">login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
<script>
import axios from 'axios' ;
import {API} from '@/constants.js' ;

export default{
  name:"Login",
  data(){
    return{
      form:{
        email:null,
        password:null
      },
      requesting:false
    }
  },

  mounted(){

  },

  methods:{
    login(){
      // Login...
      let url = `${API}/login` ;
      let form = this.form ;

      axios.post(url, form)
        .then(function(r){
          console.log('r', r) ;
        })
      }
    }
}
</script>
