<template lang="html">
  <ion-page>
    <!-- Back button with custom text and icon -->
    <ion-header class="ion-no-border">
      <ion-toolbar >
        <ion-buttons slot="start" >
          <ion-back-button
              text="Subject"
              :icon="chevronBack"
              >
          </ion-back-button>
        </ion-buttons>

        <ion-buttons slot="end" class="ion-padding">
          <em>{{size}}%</em>
          <ion-button @click="larger">
            <ion-icon :icon="add"/>
          </ion-button>

          <ion-button @click="smaller">
            <ion-icon :icon="remove" />
          </ion-button>

          <ion-button>
            <ion-icon :icon="sunny" />
          </ion-button>

        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>


      <div class="header-art">
        <img :src="banner" onerror="this.src='/fallback/tile.png'">
        <h4 class="ion-padding browse-header">{{name}}</h4>
        <span>{{description}}</span><br>
      </div>

      <ol :style="`font-size: ${size}%;`">
        <li v-for="(item, i) in data" :key="i">
          <b>{{item.question}}</b>

          <ul>
            <li answer>{{item.answer}}</li>
            <li v-for="(choice, c) in item.choices" :key="c">{{choice}}</li>
          </ul>
        </li>
      </ol>


      <ion-label class="ion-padding">
      </ion-label>


    </ion-content>
  </ion-page>
</template>

<script>


import {
  IonPage, IonContent,
  IonButtons, IonHeader, IonToolbar,
  IonBackButton, IonButton,
  IonLabel,

} from '@ionic/vue';

import { chevronBack, sunny, sunnyOutline, add, remove } from 'ionicons/icons';


export default {
  setup(){
    return{
      chevronBack, sunny, sunnyOutline, add, remove
    }
  },
  components:{
    IonPage, IonContent,
    IonButtons, IonHeader, IonToolbar,
    IonBackButton, IonButton,
    IonLabel,
  },


  data(){
    return{
      name:'Subject',
      description:'Subject description',
      data:[],

      size:50,
    }
  },
  methods:{
    larger(){
      //if(this.size>=170){ return }
      console.log('text larger');
      this.size+=5;
    },
    smaller(){
      //if(this.size<=40){ return }
      console.log('text smaller');
      this.size-=5;
    }
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




}
</script>


<style media="screen" scoped>
    [answer]{
      color: green;
    }

    ol > li{
      margin-bottom: 1em;
    }





</style>
