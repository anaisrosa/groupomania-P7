<template>
  <div class="feed">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h1>Feed des posts</h1>

      <article v-for="(post, i) in posts" v-bind:key="post.id" class="postCard">
        <router-link :to="{ name: 'DetailsPost', params: { id: post.id }}">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p>Posté par : {{ post.user.pseudo}}</p>
          </router-link>
          <button>Modifier</button> |
          <button @click="deletePostById( post.id, i)">Suprimer ce post</button> |
          <button @click="deleteAllData">Suprimer tout</button>
      </article>
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
        console.log(this.posts);
      } catch (error) {
        console.log(error);
      }
    },

    formatresponse(dataResult) {
      return JSON.stringify(dataResult, null);
    },

    async deleteAllData() {
      try {
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "delete",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        this.deleteResult = this.formatResponse(result);

      } catch (err) {
        this.deleteResult = err.message;
      }
    },

    async deletePostById(id, index) {
       try {
        await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: "delete",
          }
        );
        this.posts.splice(index, 1 );

      } catch (err) {
        this.deleteResult = err.message;
      }
     
    },
  },
  created() {
    this.getData();
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
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
