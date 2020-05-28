<template>
  <div class="wrapper">
    <div class="content">
      <h4>Test!</h4>
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
  h4{
    color: red;
  }
  .camera {
  width: 100px;
  margin: auto;
}
</style>
