<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>More</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">More</ion-title>
        </ion-toolbar>
      </ion-header>



      <ion-list>
        <ion-list-header>
          About
        </ion-list-header>

        <ion-item @click="link('whoami')">
          Developer
        </ion-item>
        <ion-item @click="link('calso')">
          Calso
        </ion-item>
        <ion-item @click="link('sprout')">
          Sprout
        </ion-item>


      </ion-list>
      <br>
      <ion-item @click="link('thanks')">
        Thank You :)
      </ion-item>

      <br>
      <ion-list>
        <ion-list-header>
          Reset
        </ion-list-header>

        <ion-item @click="reset('history')">
          History
        </ion-item>
        <ion-item @click="reset('recents')">
          Recents
        </ion-item>
        <ion-item @click="reset('statistics')">
          Statistics
        </ion-item>
        <ion-item @click="reset('all')">
          All
        </ion-item>


      </ion-list>


    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonListHeader, alertController
} from '@ionic/vue';

export default  {
  name: 'More',
  components: {
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonList, IonItem, IonListHeader
  },
  methods:{
    link(path){
      console.log(path);
      this.$router.push({ name:path })
    },
    async reset(whut){
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Confirm!',
          message: `Are you sure you want to delete ${whut}?`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'ion-danger',
              handler: blah => {
                console.log('Confirm Cancel:', blah)
              },
            },
            {
              text: 'Okay',
              cssClass: 'warning',

              handler: () => {
                this.remove(whut)
              },
            },
          ],
        });
      return alert.present();
    },

    remove(whut){
      switch (whut) {
        case 'history':
          this.$store.dispatch('resetHistory');
          break;
        case 'recents':
        this.$store.dispatch('resetRecents');
          break;
        case 'statistics':
        this.$store.dispatch('resetStatistics');
          break;
          case 'all':
          this.$store.dispatch('resetUserdata');
            break;
        default:

      }
    }
  }
}
</script>
