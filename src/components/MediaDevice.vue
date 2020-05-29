<template>
  <div>
    <div class="button" tabindex="0">
      <button id="test" class="butt" tabindex="0">Accenpt the use of push notifications</button>
      <button @click="captureImage" class="butt">Take a photo of yourself!</button>
    </div>
    <canvas id="photo" v-show="imgUrl"></canvas>
    <video id="me" class="selfie"></video>
    <!-- <Filters :imgUrl="imgUrl" /> -->
  </div>
</template>

<script>
// import Filters from "@/components/Filters.vue";
export default {
  components: {
    // Filters
  },
  data() {
    return {
      stream: {},
      imgUrl: "",
      oldValue: ""
    };
  },
  mounted() {
    this.getMedia();
  },
  methods: {
    // Gets a "stream" from a media device that allows us see what the camera is currently seeing, Will be needed to allow us to take good pics!
    async getMedia() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        const videoElem = document.querySelector("#me");
        videoElem.srcObject = this.stream;
        videoElem.addEventListener("loadedmetadata", () => {
          videoElem.play();
        });
        console.log(this.stream);
      } catch (error) {
        console.log(error);
      }
    },
    
    // The captureImage method allows us to take a snapshot of our "stream" and post it as a picture! Not downloadable as of 25/5!
    async captureImage() {
      console.log(this.stream);
      const mediaTrack = this.stream.getVideoTracks()[0];
      console.log(mediaTrack);
      const captureImg = new ImageCapture(mediaTrack);
      const photo = await captureImg.takePhoto();
      console.log(photo);
      const imgUrl = URL.createObjectURL(photo);
      console.log(imgUrl);
      this.imgUrl = imgUrl;
      this.$refs.photo = imgUrl;
      setTimeout(() => {
        this.renderCaman();
      }, 2000);
    },
     renderCaman() {
      this.Caman("#photo", this.imgUrl, function() {
        this.render();
      });
    },
    
  }
};
</script>

<style lang="scss" >
button {
  
  width: 200px;
  height: 45px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #2EE59D;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
  }
}
#me {
  width: 300px;

  margin: 1rem auto;
}

canvas[style] {
  max-width: 300px;
  max-height: 200px;
  margin: auto;
}


@media screen and (min-width: 768px) {
  button {
    margin: auto;
    
  }
  
  #me {
    width: 700px;
    height: 500px;
  }
  canvas {
    margin: auto;
    max-width: 800px !important;
    max-height: 500px !important;
  }
}

@media screen and (min-width: 1024px) {
  #me {
    width: 800px;
    height: 400px;
    margin: 2rem;
  }
}
</style>