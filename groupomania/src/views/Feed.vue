<template>
  <div class="feed">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h1>Feed des posts</h1>

      <div v-for="post in posts" v-bind:key="post.id">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p><br>
    </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Feed",
  data() {
    let posts = [];
    return {
      posts,
    };
  },
  methods: {
    async getData() {
      try {
        let response = await fetch("http://localhost:3000/api/posts");
        this.posts = await response.json();
        console.table(this.posts);
      } catch (error) {
        console.log(error);
      }
    },
    
  },
  created () {
    this.getData();
},

}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
