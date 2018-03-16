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
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Overview</span>
          </md-list-item>

          <md-list-item to="/watchlist" @click="toggleMenu">
            <md-icon>visibility</md-icon>
            <span class="md-list-item-text">Watchlist</span>
          </md-list-item>

          <md-list-item to="/portfolio" @click="toggleMenu">
            <md-icon>assessment</md-icon>
            <span class="md-list-item-text">Portfolio</span>
          </md-list-item>

          <md-list-item to="/gainers" @click="toggleMenu">
            <md-icon>trending_up</md-icon>
            <span class="md-list-item-text">Gainers</span>
          </md-list-item>

          <md-list-item to="/loosers" @click="toggleMenu">
            <md-icon>trending_down</md-icon>
            <span class="md-list-item-text">Loosers</span>
          </md-list-item>

          <md-list-item to="/profile" @click="toggleMenu">
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text">Profile</span>
          </md-list-item>

          <md-list-item to="/settings" @click="toggleMenu">
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Settings</span>
          </md-list-item>

          <md-list-item to="/information" @click="toggleMenu">
            <md-icon>info</md-icon>
            <span class="md-list-item-text">Information</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>

    </md-app>
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
  .router-link-exact-active{
    background: rgba(0,0,0,0.12);
  }

</style>
