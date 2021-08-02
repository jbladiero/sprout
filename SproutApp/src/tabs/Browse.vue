<template>
  <ion-page>
    <ion-header class="ion-no-border" >
      <ion-toolbar>
        <ion-title>
          Browse
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-header collapse="condense" class="ion-no-border">
        <ion-toolbar>
          <ion-title size="large">Browse</ion-title>
        </ion-toolbar>
      </ion-header>


      <ion-grid  class="browser">

        <h3 class="ion-padding browse-header">Categories</h3>

        <ion-scroll scrollX="true">
          <ion-row class="horizontal">
            <ion-col sizeXs="10" sizeSm="5" sizeMd="4" sizeLg="4" sizeXl="4" v-for="(category,code) in categories" :key="code">
              <vtile :name="category.name" :description="category.description" :code="`${code}`"></vtile>
            </ion-col>
          </ion-row>
        </ion-scroll>


        <h3 class="ion-padding browse-header">Recents</h3>
        <ion-row>

          <ion-col sizeXs="10" sizeSm="5" sizeMd="4" sizeLg="4" sizeXl="4" v-for="(recent, r) in recents" :key="r">
            <tile :name="recent.name" :description="recent.description" :category="recent.category" :code="recent.code"></tile>
          </ion-col>
        </ion-row>


      </ion-grid>












      <fab></fab>

    </ion-content>


  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { IonGrid, IonRow, IonCol, IonScroll } from '@ionic/vue'


import tile from '@/_browse/tile'
import vtile from '@/_browse/vtile'
import fab from '@/components/fab'




export default  {
  name: 'Browse',

  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
   //IonCardContent, IonCardSubtitle, IonCardTitle,
    IonGrid, IonRow, IonCol, IonScroll,
    tile, vtile, fab
   },

  computed:{
    course(){
      return this.$store.state.data || { name:'', description:'', data:{} };
    },
    categories(){
      return this.course.data || {}
    },
    name(){
      return this.$store.state.name;
    },
    description(){
      return this.$store.state.course.toUpperCase();
    },
    recents(){
      return this.$store.state.recents;
    }

  },



}
</script>
