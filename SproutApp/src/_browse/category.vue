<template>
<ion-page>
  <!-- Back button with custom text and icon -->
  <ion-header class="ion-no-border">
    <ion-toolbar >
      <ion-buttons slot="start" >
        <ion-back-button
            text="Browse"
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
      <ion-button class="header-button" @click="start">Start</ion-button>
      <ion-button class="header-button" @click="select=!select">{{selectButton}}</ion-button>
    </div>

    <ion-list>
      <ion-item v-for="(subject, s) in data" :key="s" @click="open(s)">

        <ion-thumbnail>
          <img :src="src(s)" alt="" onerror="this.src='/fallback/tile.png'" class="thumb">
        </ion-thumbnail>
        <ion-label class="item-subject">
          <b>{{subject.name}}</b>
          <span>{{subject.description}}</span>
        </ion-label>
        <ion-toggle v-show="select" v-model="subject.checked"></ion-toggle>
      </ion-item>
    </ion-list>
    <ion-label class="ion-padding">
      {{items}}
    </ion-label>


  </ion-content>
</ion-page>





</template>

<script>
import {
  IonPage, IonContent,
  IonButtons, IonHeader, IonToolbar,
  IonButton, IonToggle, IonBackButton,
  IonList, IonItem, IonLabel, IonThumbnail,
} from '@ionic/vue';

import { chevronBack } from 'ionicons/icons';




export default {
  setup(){
    return{
      chevronBack
    }
  },
  components: {
    IonPage, IonContent, IonButtons, IonHeader, IonToolbar,
    IonList, IonItem, IonLabel, IonThumbnail,
    IonButton, IonToggle,
    IonBackButton,
  },

  computed:{
    category(){
      return this.$route.params.category
    },
    banner(){
      return `/db/${this.$store.state.course}/${this.category}/default.png`;
    },
    selectButton(){
      return (this.select ? 'Cancel' : 'Select Subject' )
    },
    items(){
      const subs = Object.keys(this.data).length
      return `${this.count} item(s), ${subs} subject(s)`
    }
  },
  methods:{
    back(){
      this.$router.push('/app/browse')
    },
    start(){
      const course = this.$store.state.course;
      console.log(this.data);
      let bank = []
      if(this.select){
        //create an array of subject list to be loaded
        bank = Object.keys(this.data).filter(v=>{
          return this.data[v].checked
        }).map(subject=>{
          return {
            category:this.name,
            subject:this.data[subject],
            path: `/db/${course}/${this.category}/${subject}/index.json`
          }
        });

        console.log('BANK');
        console.log(bank);
      }
      else {
        bank = Object.keys(this.data).map(subject=>{
          return {
            category:this.name,
            subject:this.data[subject].name,
            path:`/db/${course}/${this.category}/${subject}/index.json`
          }
        });
      }
      window.MCQ.reset();
      this.$store.dispatch('getTokens', bank)
    },
    open(sub){
      if(this.select) return
      console.log('Navigating to: '+sub);

      this.$store.dispatch('setRecent', {
        name:this.data[sub].name,
        description:this.data[sub].description,
        code:sub,
        category:this.category
      })

      this.$router.push({name:'subject', params:{ category:this.category, subject:sub }})

    },
    src(code){
      return `/db/${this.$store.state.course}/${this.category}/${code}/default.png`;
    }
  },
  data(){
    return {

      // index file of category
      name:"",
      description:"",
      count:0,
      data:{},

      //
      select:false,
      selection:[],
    }
  },
  mounted(){
    console.log('Category Init');
    console.log(this.category);


    this.$store.dispatch('getCategory', this.category ).then(res=>{
      this.name = res.name;
      this.description = res.description;
      this.count = res.count;
      this.data = res.data;
      Object.keys(this.data).map(v=>{
        this.data[v].checked = false
      })
    })

  }

};
</script>
