<template>

  <div style="">


      <v-list ref="theNavs" style="" dense>
          <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>

          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-2"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            @click=" item.click ? item.click() : null"
            :to="item.to ? item.to : null"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
</template>
<script>

export default{
    name:"leftNav",
    data:function(){
        return{
            publicPath: process.env.BASE_URL,

            items: [
                { icon: 'mdi-circle-outline', text: 'Signin' , to:{name:'login'}},
                { icon: 'mdi-circle-outline', text: 'Register' , to:{name:'register'}},
                { icon: 'mdi-circle-outline', text: 'Your Meds' , to:{name:'med-list'}},
                { icon: 'mdi-circle-outline', text: 'Add Med' , to:{name:'add-med'}},
              ]
        }
    },
    computed:{


    },
    components:{
      
    },
    mounted:function(){

    },
    methods:{
      gotoUrl:function(url){
        window.location = url
      }
    },
    beforeDestroy:function()
        {

        }
}
</script>
