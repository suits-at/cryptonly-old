<template>
  <div>
    <div v-if="posts && posts.length">
      <div id="headings">
        <h2>#</h2>
        <h2>Name</h2>
        <h2>Market Cap</h2>
        <h2>Price</h2>
        <h2>Change 1h</h2>
        <h2>Change 24h</h2>
        <h2>Change 7d</h2>
      </div>
      <div v-for="post of posts" id="grid">
        <p>{{post.rank}}</p>
        <p>{{post.name}}</p>
        <p>{{post.market_cap_usd}}</p>
        <p>{{post.price_usd}} $</p>
        <p>{{post.percent_change_1h}}%</p>
        <p>{{post.percent_change_24h}}%</p>
        <p>{{post.percent_change_7d}}%</p>
      </div>
    </div>

    <div v-if="errors && errors.length">
      <div v-for="error of errors">
        {{error.message}}
      </div>
    </div>
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
<style>
  #headings, #grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
</style>
