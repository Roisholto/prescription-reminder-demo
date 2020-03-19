<template>
    <v-app id="">
        <v-navigation-drawer
            v-model="drawer"
            app
            width="280"
            >
            <slot name="leftNav">
              <leftNav/>
            </slot>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark
            >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title
                style="width: 300px"
                class="d-flex align-center"
                >
                <span class="text-capitalize">{{title ? title : appName}}</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <slot name="header"></slot>

            <template v-slot:extension v-if="useExtension">

                <!--<v-container class="">-->
                    <slot name="extension"></slot>
                <!--</v-container>-->
            </template>
        </v-app-bar>
        <v-content
        >
            <v-container
                class=""
                fluid
                >
                <slot />
            </v-container >
        </v-content>
    </v-app>
</template>

<script>
import {APP_NAME} from '@/constants.js' ;
import LeftNav from '@/components/LeftNav.vue' ;

export default {

    props: {
      source: String,
      title: {
          type: String,
          default:()=>''
      },
      useExtension:{
          type:Boolean,
          default:()=>false
      }
    },

    data: () => ({
     drawer: null,
     appName:APP_NAME,

    }),
    computed: {

    },

    components:{
      LeftNav
    },

    methods:{

    }
  }
</script>
