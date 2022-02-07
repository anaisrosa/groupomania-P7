<template>
  <div class="feed">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h1>Feed des posts</h1>
      <!-- FEED DES POSTS -->
      <article v-for="(post, i) in posts" v-bind:key="post.id" class="postCard">
        <router-link :to="{ name: 'DetailsPost', params: { id: post.id } }">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p>Posté par : {{ post.user.pseudo }}</p>
        </router-link>
        <button>Modifier</button> |
        <button @click="deletePostById(post.id, i)">Suprimer ce post</button>
        <!-- <button @click="deleteAllData">Suprimer tout</button> -->
      </article>
    </div>
  </div>
</template>

<script>


export default {
  name: "Feed",
  data() {
    let posts = [];
    return {
      posts,
      
    };
  },
  methods: {
    async getPostsData() {
      try {
        let response = await fetch("http://localhost:3000/api/posts");
        this.posts = await response.json();
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },
    

    formatresponse(dataResult) {
      return JSON.stringify(dataResult, null);
    },

    async deletePostById(id, index) {
      try {
        await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "delete",
        });
        this.posts.splice(index, 1);
      } catch (err) {
        this.deleteResult = err.message;
      }
    },
  
  },
  created() {
    this.getPostsData();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}

article {
  background-color: #42b983;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
}

form {
  margin: 1rem 0 0 0;
}
</style>
