<template lang="html">
  <ion-page>

    <ion-content :fullscreen="true" >

      <div class="ion-padding">
        <h1 class="title">Setup</h1>

      </div>


      <div class="ion-padding">
        <ion-label>
          Username/Nickname
        </ion-label>
        <ion-input placeholder="username" class="username" v-model="name"></ion-input>
        <ion-label>
          Full Name
        </ion-label>
        <ion-input placeholder="username" class="username" v-model="fullname"></ion-input>
        </div>

        <h1 class="ion-padding">
          Courses
        </h1>
        <ion-item
          v-for="(c,i) in courses" :key="i"
          :color="(selected==i ? 'primary' : '')"
          @click="selected=i"
          >
          <ion-thumbnail slot="start">
            <img :src="source(c)" alt="" onerror="this.src='/fallback/tile.png'">
          </ion-thumbnail>
          <ion-label>
            <b>{{c.name}}</b><br>
            <span>{{c.description}}</span>

          </ion-label>
        </ion-item>


        <div class="ion-padding">
          <h1>Terms and Conditions</h1>
          <p>
            This app was made only as a "container" of review materials specifically for Multiple Choice Questions (MCQ).
            The developer does not intend to copyright any material whatsoever.
            The compilation is an original work while the materials belong to their respective authors.
            This app was made for small group of people only and redistributing it without the developer's permision is prohibited.
            The developer is not liable for any false information that may had been included within the testbanks.
            If you happen to see some errors, please contact the developer so that it will be rectified.
            <b>The app is not for sale, because it will always be free</b>. The developer does not intend to raise any form of money from this app.
            The developer reserves the right to make sudden amendments to the terms and conditions.
          </p>

          <h1>Privacy statement</h1>
          <p>
            The app is configured to work offline, all the user information and user data is saved locally and is natively stored.
            The information flow is designed to work unidirectionally, which basically means that you won't be able to sync multiple devices.
            If you wish to update the testbank, the only way would be to download the latest app update.
          </p>

          <h1>Developer's Notes</h1>
          <p>
            This version is a beta preview intended for a small group of people. The test banks are still in it's early development phase.
            The descriptions and material artworks does not reflect the actual content, please bear with it (I do it for fun).
            The artworks and descriptions will be fixed at a later stage of development.
          </p>



        </div>

        <ion-item>
          <ion-checkbox v-model="agree" slot="start">

          </ion-checkbox>
          I agree to the terms and conditions

        </ion-item>

        <br><br>
        <div class="ion-padding">
          <ion-button expand="block" @click="start" :disabled="disabled">Let's Get Started</ion-button>

        </div>
        <br>



    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';

import { IonInput, IonItem, IonThumbnail, IonLabel, IonCheckbox } from '@ionic/vue';

import { IonButton } from '@ionic/vue';



export default {
  components:{
    IonPage, IonContent,
    IonInput, IonItem, IonThumbnail, IonLabel,
    IonButton, IonCheckbox
  },
  data(){
    return{
      name:'',
      fullname:'',
      selected:'',
      index:{},
      agree:false,
    }
  },
  methods:{
    source(c){
      return `/db/${c.code}/preview.png`
    },
    start(){
      const course = this.selected;
      this.$store.dispatch('setup', { name:this.name, fullname:this.fullname, course:course })
    }
  },
  computed:{
    courses(){
      return this.index.data || {};
    },
    disabled(){
      if(this.selected=='' || this.name=='' || this.fullname==''){
        return true
      }else {
        return !this.agree;
      }
    }
  },
  created(){
    this.$store.state.showTabs = false;


  },
  mounted(){
    this.$store.dispatch('getIndex').then(index=>{
      this.index = index
    })
  }

}
</script>

<style lang="css" scoped>

  .title{
    font-size: 200%;
    font-weight: bold;
  }
</style>
