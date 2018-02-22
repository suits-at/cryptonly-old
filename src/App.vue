<template>
  <div id="app">
    <header>
      <span>cryptonly</span>
      <a href="https://github.com/suits-at/cryptonly"><font-awesome-icon :icon="icon" /></a>
    </header>
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">-->
      <router-view></router-view>
    </main>
  </div>
</template>
<script>

  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

  export default {
    name: 'app',
    computed: {
      icon() {
        return faGithub;
      },
    },
    components: {
      FontAwesomeIcon,
    },
  };
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  header {
    padding: 15px 25px 15px 25px;
    background-color: #35495E;
    color: #ffffff;
    font-size: 24px;
  }

  header a{
    float: right;
  }

  a:visited{
    color: white;
  }
</style>
