<template>
  <div>

    <div class="button" >
      <button type="button" id="test" class="butt" >Notifications On/Off</button>
      <button @click="captureImage" class="butt">Take a Photo!</button>
      <button @click="clearButton" class="butt">Clear applied filters</button>
      <button @click="imageDown" class="butt" >Download image </button>
     </div>

      
       <video id="output" class="selfie"></video>
      <canvas id="photo" v-show="imgUrl"></canvas> 
    
    
    <Settings :imgUrl="imgUrl" />
    <a class="download" id="download"></a>
    
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
        const videoElem = document.querySelector("#output");
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
     imageDown() {
      const canvas = document.querySelector("canvas");
      const img = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.getElementById("download");
      link.setAttribute("download", "HeresyIMG.png");
      link.setAttribute("href", img);
      link.click();
    }
  },
     

  
};
</script>

<style lang="scss" >

button {
  width: 200px;
  height: 45px;
  padding: 1rem;
  margin: 20px;
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
    color: #000;
    transform: translateY(-7px);
  }
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
  
    canvas {
    margin: auto;
    max-width: 800px !important;
    max-height: 500px !important;
  }
  }
  .butt {
    margin: auto;
  }

  
  
  canvas {
    margin: auto;
    max-width: 800px !important;
    max-height: 400px !important;
  }
}

@media screen and (min-width: 1024px) {
  // #output {
  //   width: 800px;
  //   height: 400px;
  //   margin: 2rem;
  // }
  #output {
    width: 700px;
    height: 500px;
  }

  canvas {
    margin: auto;
    max-width: 800px !important;
    max-height: 400px !important;
  }
}
</style>