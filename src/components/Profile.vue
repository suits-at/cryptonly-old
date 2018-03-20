<template>
  <div>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </div>
</template>

<script>
  import * as firebase from "firebase";
  import * as firebaseui from "firebaseui";
  // import config from json file
  // to be able to exclude credentials from from git
  import firebaseConfig from "../../static/json/firebaseConfig.json";

  firebase.initializeApp(firebaseConfig);

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  const uiConfig = {
    callbacks: {
      signInSuccess() {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
      uiShown() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);

  export default {
    name: 'profile',
  };</script>
