<template lang="html">
  <ion-card class="tile" @click="preview">
    <img :src="src(category,code)" onerror="console.log('ERR');this.src='/fallback/tile.png'">
    <b>{{name}}</b><br>
    <span>{{description}}</span>
  </ion-card>
</template>
<script>

import { IonCard } from '@ionic/vue'


export default {
  name:'tile',
  props:{
    name:String,
    description:String,
    category:String,
    code:String
  },
  methods:{
    preview(){
      console.log('Preview:' + `${this.code}`);
      //this.$router.push('/app/me')
      this.$router.push({name:'subject', params:{category:this.category, subject:this.code} });
    },
    src(category, code){
      return `/db/${this.$store.state.course}/${category}/${code}/default.png`;
    }
  }
}
</script>
