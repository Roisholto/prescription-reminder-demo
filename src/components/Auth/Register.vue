<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-center">
      SIGN UP
    </v-card-title>
    <v-form @submit.prevent="register">
      <v-card-text>
        <v-text-field name="username" placeholder="Name" v-model="form.name"></v-text-field>
        <v-text-field name="email" placeholder="Email" v-model="form.email"></v-text-field>
        <v-text-field name="password" type="password" placeholder="Password" v-model="form.password"></v-text-field>
        <v-text-field name="password_confirmation" type="password" placeholder="Confirm Password" v-model="form.password_confirmation"></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn type="submit" color="primary">
          Register
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
import {register} from '@/api/auth.js' ;

export default {
  name:"Register",

  data(){
    return{
      form:{
        email:null,
        name:null,
        password:null,
        password_confirmation:null
      },
      requesting: false
    }
  },

  methods:{
    register(){
      let data = this.form ;
      let vm = this ;
      this.requesting = true ;
      register(data)
        .then(function(){

        })
        .catch(function(){

        })
        .finally(function(){
          vm.requesting = false ;
        })
    }
  }
}
</script>
