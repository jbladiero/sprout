<template lang="html">
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Setup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Setup</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding">
        <ion-label>
          Username
        </ion-label>
        <ion-input placeholder="username" class="username" v-model="name"></ion-input>
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







    </ion-content>
    <ion-footer class="ion-padding">
      <ion-button expand="block" @click="start">Let's Get Started</ion-button>

    </ion-footer>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import { IonInput, IonItem, IonThumbnail, IonLabel } from '@ionic/vue';

import { IonFooter, IonButton } from '@ionic/vue';



export default {
  components:{
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonItem, IonThumbnail, IonLabel,
    IonFooter, IonButton
  },
  data(){
    return{
      name:'',
      selected:'',
      index:{}
    }
  },
  methods:{
    source(c){
      return `/db/${c.code}/preview.png`
    },
    start(){
      const course = this.selected;
      this.$store.commit('setup', { name:this.name, course:course })
      this.$store.state.showTabs = true;
      this.$router.push('/app/me');



    }
  },
  computed:{
    courses(){
      return this.index.data || {};
    }
  },
  mounted(){
    this.$store.state.showTabs = false;

    this.$store.dispatch('getIndex').then(index=>{
      this.index = index
    })
  }

}
</script>

<style lang="css" scoped>
</style>
