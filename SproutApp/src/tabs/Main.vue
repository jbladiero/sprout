<template>
  <ion-page >
    <ion-tabs>
      <ion-tab-bar slot="bottom">

        <ion-tab-button tab="me" href="/app/me">
          <ion-icon :icon="person" />
          <ion-label>Me</ion-label>

        </ion-tab-button>

        <ion-tab-button tab="browse" href="/app/browse">
          <ion-icon :icon="albums" />
          <ion-label>Browse</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="history" href="/app/history">
          <ion-icon :icon="time" />
          <ion-label>History</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="more" href="/app/more">
          <ion-icon :icon="cube" />
          <ion-label>More</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>

  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage,  } from '@ionic/vue';
import { person, albums, bookmark, reader, time, cube } from 'ionicons/icons';


export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage,  },
  setup() {
    return {
      person, albums, bookmark, reader, time, cube
    }
  },
  computed:{
    showTabs(){
      return this.$store.state.showTabs;
    }
  },
  methods:{
    link(path){
      console.log(path);
      this.$router.push({ name:path })
    }
  }
}
</script>
