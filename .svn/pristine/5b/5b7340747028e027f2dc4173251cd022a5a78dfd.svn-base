<template>
  <div id="app" class="gb">
    <img class="title img-responsive" src="./assets/title.png" />
    <webLeft />
    <router-view></router-view>
  </div>
</template>

<script>
  import webLeft from "./common/web/left.vue";
  export default {
    name: "app",
    components: {
      webLeft
    },
    created() {
      let version = navigator.userAgent.toLowerCase();
      window.console.log("version>>>>>>" + version);
    }
  };
</script>

<style>
  .gb {
    height: 1080px;
    background-image: url("./assets/bg.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0;
    overflow: hidden;
    position: absolute;
    width: 1920px;
  }
  .title {
    /* width: 100%;
    text-align: center;
    max-height: 100%; */
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
