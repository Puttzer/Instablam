<template>
  <div>
    <div class="button" >
      <button type="button" id="test" class="butt" >Accenpt the use of push notifications</button>
      <button @click="captureImage" class="butt">Take a photo of yourself!</button>
      <button @click="clearButton" class="butt">clear all filters</button>
      <button @click="downloadImg" class="butt" id="download">Download image </button>
    </div>
    <canvas id="photo" v-show="imgUrl"></canvas>
    <video id="me" class="selfie"></video>
    <Settings :imgUrl="imgUrl" />
  </div>
</template>

<script>
import Settings from "@/components/Settings.vue";
export default {
  components: {
    Settings
  },
  data() {
    return {
      stream: {},
      imgUrl: "",
      // oldValue: ""
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

    clearButton() {
      if (document.querySelector("canvas") !== null) {
        document.querySelector("#photo").removeAttribute("data-caman-id");
        this.renderCaman("#photo", this.imgUrl);
      }
    },
    downloadImg() {
      this.Caman("#photo", this.imgUrl, function() {
        this.revert();
        this.brightness(document.querySelector('#brightness'));
        this.contrast(document.querySelector('#contrast'));
        this.saturation(document.querySelector('#saturation'));
        this.vibrance(document.querySelector('#vibrance'));
        this.exposure(document.querySelector('#exposure'));

        this.render(function () {
        this.save("FilterdImg.png");
        });
      });

      const link = document.getElementById("download");
      link.setAttribute("download", "FilterdImg.png");
      link.setAttribute("href", "FilterdImg.png");
      link.click();
    },
  },
     

  
};
</script>

<style lang="scss" >

button {
  width: 200px;
  height: 45px;
  font-family: "Fira Code";
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
  
  &:active,&:focus {
    background-color: #2ee59d;
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
    
    &:hover {
    background-color: #2ee59d;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }

    
  }
  .butt {
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