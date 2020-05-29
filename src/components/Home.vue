<template>
  <div class="wrapper">
    <div class="main">
      <img src="../../public/img/icons/photography-256.png" class="selfie" alt="">
      <MediaDevice/>
    </div>
  </div>
</template>

<script>
import MediaDevice from "../components/MediaDevice.vue"
export default {
  name: 'home.vue',
  components: {
    MediaDevice
  }
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.selfie {
  width: 150px;
  margin: auto;
}

@media screen and (min-width: 768px){

}

@media screen and (min-width: 1024px){

}
</style>
