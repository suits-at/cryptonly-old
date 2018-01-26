<template>
  <div>
    <div v-if="posts && posts.length">
      <table id="example" class="display" cellspacing="0" width="100%">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Market Cap</th>
          <th>Price</th>
          <th>Change 1h</th>
          <th>Change 24h</th>
          <th>Change 7d</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="post of posts">
          <td>{{post.rank}}</td>
          <td>{{post.name}}</td>
          <td>{{post.market_cap_usd}}</td>
          <td>{{post.price_usd}} $</td>
          <td>{{post.percent_change_1h}}%</td>
          <td>{{post.percent_change_24h}}%</td>
          <td>{{post.percent_change_7d}}%</td>
        </tr>
        </tbody>
      </table>
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
  $(document).ready(() => {
    $('#example').DataTable();
  });
</script>
<style>
</style>
