<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button show-small" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">cryptonly</span>
        <div class="md-toolbar-section-end">
          <a href="https://github.com/suits-at/cryptonly" title="Github">
            <md-icon><font-awesome-icon :icon="['fab', 'github']" title="Github"/></md-icon>
          </a>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="1">
          <span>Navigation</span>

          <div class="md-toolbar-section-end show-small">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to="/" @click="toggleMenu">
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Overview</span>
          </md-list-item>

          <md-list-item to="/hello" @click="toggleMenu">
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Portfolio</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>

    </md-app>
  </div>
</template>

<!--<template>
  <div id="app">
    <header>
      <span>cryptonly</span>
      <a href="https://github.com/suits-at/cryptonly" title="Github">
        <font-awesome-icon :icon="['fab', 'github']" title="Github"/>
      </a>
    </header>
    <main>
      &lt;!&ndash;<img src="./assets/logo.png" alt="Vue.js PWA">&ndash;&gt;
      <router-view></router-view>
    </main>
    <footer>
      <span>cryptonly</span>
      <a href="https://github.com/suits-at/cryptonly" title="Github">
        <font-awesome-icon :icon="['fab', 'github']" title="Github"/>
      </a>
    </footer>
  </div>
</template>-->
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
    data: () => ({
      menuVisible: false,
    }),
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible
      }
    }
  };</script>

<style>
  html {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .md-drawer {
    width: 210px;
  }

  /* show left arrow icon in menu only on xsmall devices */
  @media (min-width: 600px){
    .show-small {
      display: none;
    }
  }
</style>
