<template>
  <div>
    <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.name}}</strong></p>
        <p>Price: {{post.price_usd}} $</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        posts: [],
        errors: [],
      };
    },

    // Fetches posts when the component is created.
    created() {
      axios.get('https://api.coinmarketcap.com/v1/ticker/')
        .then((response) => {
          // JSON responses are automatically parsed.
          this.posts = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  };
</script>
