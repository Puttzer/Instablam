<template>
  <div class="wrapper">

    <div class="main">
      <img src="../../public/img/icons/photography-256.png" class="selfie" alt="">

      <div class="uppertext">
      <h1>Oh hello there!</h1>
      <h3>Here you can take a quick picture of yourself for any of your needs!</h3>
      </div>
      
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
.uppertext{
    color: #2EE59D;
    font-family: 'Fira Code';
  }

.selfie {
  width: 150px;
  margin: auto;
}

@media screen and (min-width: 768px){

}

@media screen and (min-width: 1024px){

}
</style>
