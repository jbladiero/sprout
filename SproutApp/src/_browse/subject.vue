<template lang="html">
  <ion-page>
    <!-- Back button with custom text and icon -->
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-buttons slot="start" >
          <ion-back-button
              :icon="chevronBack"
              >
          </ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>


      <div class="header-art">
        <img :src="banner" onerror="this.src='/fallback/tile.png'">
        <h4 class="ion-padding browse-header">{{name}}</h4>
        <span>{{description}}</span><br>
        <ion-button class="header-button" @click="start">Take MCQ</ion-button>
        <ion-button class="header-button" @click="read">Read All</ion-button>
      </div>


      <ion-list>
        <ion-item v-for="(item, i) in data" :key="i" @click="open(i)">

          <ion-label class="item-subject">
            <b>{{item.question}}</b>
            <span>{{item.answer}}</span>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-label class="ion-padding">
      </ion-label>


    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonPage, IonContent,
  IonButtons, IonHeader, IonToolbar,
  IonButton, IonBackButton,
  IonList, IonItem, IonLabel,
  modalController
} from '@ionic/vue';

import { chevronBack } from 'ionicons/icons';
import Preview from '@/_browse/preview.vue'


export default {
  setup(){
    return{
      chevronBack
    }
  },
  components:{
    IonPage, IonContent,
    IonButtons, IonHeader, IonToolbar,
    IonButton, IonBackButton,
    IonList, IonItem, IonLabel,
  },


  data(){
    return{
      name:'Subject',
      description:'Subject description',
      data:[]

    }
  },
  mounted(){
    console.log('Subject');
    if(this.category=='' || this.subject==''){
      this.$router.push({name:'browse'})
      return
    }

    this.$store.dispatch('getSubject', {category:this.category, subject:this.subject}).then(res=>{
      this.name = res.name;
      this.description = res.description;
      this.data = res.data;
    })


  },
  computed:{
    course(){
      return this.$store.state.course;
    },
    category(){
      return this.$route.params.category || '';
    },
    subject(){
      return this.$route.params.subject || '';
    },
    items(){
      return `${this.data.length} Items`
    },
    banner(){
      return `/db/${this.course}/${this.category}/${this.subject}/default.png`;

    }
  },
  methods:{

    async open(i) {
      console.log(i);
      const modal = await modalController
        .create({
          component: Preview,
          componentProps: { token:this.data[i] },
          backdropDismiss:true,
          swipeToClose:true,
        })
      return modal.present();
    },
    start(){
      const category = this.$store.state.data.data[this.category].name
      window.MCQ.reset();
      this.$store.dispatch('getTokens', [{
        category:category,
        subject:this.name,
        path:`/db/${this.course}/${this.category}/${this.subject}/index.json`
      }])
    },
    read(){
      this.$router.push({name:'read', params:{ category:this.category, subject:this.subject }})
    }


  }






}
</script>
