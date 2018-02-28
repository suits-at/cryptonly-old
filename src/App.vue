<template>
  <div id="app">
    <header>
      <span>cryptonly</span>
      <a href="https://github.com/suits-at/cryptonly" title="Github">
        <font-awesome-icon :icon="['fab', 'github']" title="Github"/>
      </a>
    </header>
    <main>
      <!--<img src="./assets/logo.png" alt="Vue.js PWA">-->
      <router-view></router-view>
    </main>
    <footer>
      <span>cryptonly</span>
      <a href="https://github.com/suits-at/cryptonly" title="Github">
        <font-awesome-icon :icon="['fab', 'github']" title="Github"/>
      </a>
    </footer>
  </div>
</template>
<script>

  import fontawesome from '@fortawesome/fontawesome';
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

  fontawesome.library.add(faGithub);

  export default {
    name: 'app',
    components: {
      FontAwesomeIcon,
    },
  };</script>

<style>
  body {
    margin: 0;
  }

  html {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  header, footer {
    padding: 15px 25px 15px 25px;
    background-color: #35495E;
    color: #ffffff;
    font-size: 24px;
  }

  header a, footer a {
    float: right;
  }

  a, a:visited {
    color: white;
  }
</style>
