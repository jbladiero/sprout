<template>
  <ion-page id="me">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>{{name}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{name}}</ion-title>
        </ion-toolbar>
      </ion-header>


    <!-- Grid -->
    <ion-grid >
      <ion-row >

        <!-- User -->
        <ion-col sizeXs="20" sizeMd="20" sizeLg="10">
          <ion-card class="ion-padding user-tile user">

            <span>
              <ion-icon @click="test" :icon="person" size="small"/>
              <b>
                {{course}}
              </b>
            </span>
              <h2>
                {{fullname}}
              </h2>
              <p>
                “Have the courage to follow your heart and intuition. They somehow already know what you truly want to become. Everything else is secondary.”<br> -Steve Jobs
              </p>


          </ion-card>
        </ion-col>
        <!-- User -->


        <ion-col sizeXs="10" sizeMd="10" sizeLg="5" >
          <ion-card class="ion-padding user-tile rate">
            <center>
              <b>
                RATE
              </b>
              <h1>{{tally.percentage}}</h1>
              <b>PERCENT</b>
            </center>
          </ion-card>

        </ion-col>

        <ion-col sizeXs="10" sizeMd="10" sizeLg="5">
          <ion-card class="ion-padding user-tile answered">

            <center>
              <b>
                ANSWERED
              </b>
              <h1>{{tally.answered}}</h1>
              <b>ITEMS</b>
            </center>
          </ion-card>
        </ion-col>

      </ion-row>


      <h1 class="ion-padding">Overview</h1>
    <ion-row>

        <ion-col sizeXs="20" sizeMd="10" sizeLg="10" v-for="(stat, s) in statistics" :key="s">
        <!-- Statistics -->
        <ion-card class="ion-padding user-tile overview">

              <h5>{{s}}</h5>
              <h1>{{stat.correct}}/{{stat.answered}}</h1>
              <div class="bar">
                <div class="fill" :style="`width:${stat.percentage}%;`"></div>
              </div>
              <span :style="`width:${stat.percentage}%;`">{{stat.percentage}}%</span>

        </ion-card>
      </ion-col>
    </ion-row>


        <!-- Statistics -->

    </ion-grid>
    <!-- Grid -->



    </ion-content>
  </ion-page>
</template>

<script>
import
{
  IonPage,
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonIcon,
  IonCol, IonGrid, IonRow,
  IonCard,
} from '@ionic/vue';


import { person } from 'ionicons/icons';




export default  {
  name: 'Me',
  setup(){
      return{
        person
      }
  },
  data(){
    return {
      series: [{
        type:'area',
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }],

    }
  },
  computed:{
    name(){
      return this.$store.state.name
    },
    fullname(){
      return this.$store.state.fullname
    },
    course(){
      return this.$store.state.course.toUpperCase()
    },

    statistics(){
      return this.$store.state.statistics
    },

    tally(){
      let correct=0, answered=0;
      Object.keys(this.$store.state.statistics).map(v=>{
        answered+=this.$store.state.statistics[v].answered
        correct+=this.$store.state.statistics[v].correct
      })
      return {
        answered:answered,
        correct:correct,
        percentage:Math.floor(100*(correct/answered)) || 0
      }
    }
  },

  components: {
    IonPage,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonIcon,
    IonCol, IonGrid, IonRow,
    IonCard,

 },

}
</script>


<style scoped lang="scss">
  ion-icon{
    vertical-align: top;
  }

  ion-card{
    width: 100%;
    min-height: 177px;

  }

  .user-tile{
    color: white;
    background: var(--ion-color-primary);
    overflow: hidden;


    h1{
      font-size: 4em;
      font-weight: 300;
      text-shadow: 1px 3px #444444;
    }

    h2{
      font-size: 3em;
      font-weight: normal;
    }

    &.user{
      background: url('/assets/user/name.jpg');
      background-size: cover;
      background-position: right;
    }

    &.rate{
      background: url('/assets/user/rate.jpg');
      background-size: cover;
    }
    &.answered{
      background: url('/assets/user/answered.jpg');
      background-size: cover;
    }

    &.overview{
      background: url('/assets/user/overview.jpg');
      background-size: cover;
    }


  }

  .bar{
    width: 100%;
    height: 11px;
    background: var(--red);
    border-radius: 4px;
    overflow: hidden;
    border: 0.4px solid #444;

  }

  .bar .fill{
    height: 11px;
    border-right: 0.4px solid #444;
    background: var(--green);
  }

  span{
    display: block;
    text-align: right;
    min-width: 2em;
  }

</style>
