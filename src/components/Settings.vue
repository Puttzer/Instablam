<template>
  <div class="filters" v-show="imgUrl">
    <div class="filter">
      <label for="brightness">Brightness</label>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        :value="0"
        id="brightness"

        v-on:change="changeBrightness"
      />
    </div>
    <div class="filter">
      <label for="contrast">Contrast</label>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        value="0"
        v-on:change="changeContrast"
        id="contrast"
      />
    </div>
    <div class="filter">
      <label for="saturaction">Saturaction</label>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        value="0"
        v-on:change="changeSaturaction"
        id="saturation"
      />
    </div>
    <div class="filter">
      <label for="vibrance">Vibrance</label>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        value="0"
        v-on:change="changeVibrance"
        id="vibrance"
      />
    </div>
    <div class="filter">
      <label for="exposure">Exposure</label>
      <input
        type="range"
        min="-100"
        max="100"
        step="1"
        value="0"
        v-on:change="changeExposure"
        id="exposure"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["imgUrl"],
  methods: {
    changeBrightness(event) {
      const value = parseInt(event.target.value);
      console.log(event.target.value);
      this.Caman("#photo", this.imgUrl, function() {
        //  nollställer filter
        this.revert();

        // set the new brightness level and renders to the brightness chosen
        this.brightness(value).render();

        
      });
    },
    changeContrast(event) {
      const value = parseInt(event.target.value);
      console.log(event.target.value);
      this.Caman("#photo", this.imgUrl, function() {
        this.revert();
        this.contrast(value).render();
        
      });
    },
    changeSaturaction(event) {
      const value = parseInt(event.target.value);
      console.log(event.target.value);
      this.Caman("#photo", this.imgUrl, function() {
        this.revert();
        this.saturation(value).render();
      });
    },
    changeVibrance(event) {
      const value = parseInt(event.target.value);
      console.log(event.target.value);
      this.Caman("#photo", this.imgUrl, function() {
        this.Caman("#photo", this.imgUrl, function() {
        this.revert();
        this.vibrance(value).render();
      });
      });
    },
    changeExposure(event) {
      const value = parseInt(event.target.value);
      console.log(event.target.value);
      this.Caman("#photo", this.imgUrl, function() {
        this.Caman("#photo", this.imgUrl, function() {
        this.revert();
        this.exposure(value).render();
      });
      });
    }
  }
};
</script>

<style lang="scss" >
.filters {
  width: 100%;
  margin: auto;
  padding: 1rem;
  label {
    margin: auto;
    padding: 1.2rem;
    color: #2EE59D;
    font-family: 'Fira Code';
    font-size: 1.17em

  }
  filter {
    width: 200px;
  }
}
@media screen and (min-width: 768px) {
  .filters {
    width: 100%;
  }
  input {
    width: 500px;
    justify-items: center;
  }
  
}
</style>