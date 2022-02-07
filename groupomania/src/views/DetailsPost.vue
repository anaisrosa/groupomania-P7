<template>
  <section class="post">
    <h1>Le titre du post est {{ post.title }}</h1>
    <p>Le contenu du post est {{ post.content }}</p>
    <p>Posté par : {{ post.user.pseudo }}</p>

    <!-- FORMULAIRE NOUVEAU COMMENTAIRE -->
    <form @submit.prevent="submitComment">
      <div>
        <label for="commentContent">Commentaire:</label>
        <input
          v-model="new_comment.content"
          type="text"
          name="commentContent"
          id="commentContent"
          required
        />
        <p id="commentContentErrorMsg"></p>
      </div>
    </form>
    <!-- AFFICHAGE DES COMMENTAIRES -->
    <div v-for="comment in comments" v-bind:key="comment.id" class="comments">
      <p>{{ comment.content }}</p>
      <p>Posté par : {{ post.user.pseudo }}</p>
    </div>
  </section>
</template>

<script>

import Storage from "@/services/storageService.js"; 

export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
        user: {
          pseudo: "",
        },
      },
      comments: [],
      new_comment: {
        content: "",
        userId: "",
      },
    };
  },

  methods: {
    async getCommentsData() {
      try {
        let response = await fetch(
          `http://localhost:3000/api/comments/${this.postId}`
        );
        this.comments = await response.json();
        console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment() {
      // console.log(Storage.get());
      // const storedData = Storage.get()
      // const userId = storedData.userId
      // const token = storedData.token
      this.new_comment.userId = Storage.get().userId;
      this.new_comment.postId = this.postId;
      console.log(this.new_comment)
      const res = await fetch("http://localhost:3000/api/comments", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.new_comment),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
    },
  },

  computed: {
    postId() {
      return parseInt(this.$route.params.id);
    },
  },

  async created() {
    const response = await fetch(
      `http://localhost:3000/api/posts/${this.$route.params.id}`
    );
    this.post = await response.json();
    this.getCommentsData();
    // console.log(this.post);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #2c3e50;
}

section {
  border: solid 4px #42b983;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
}
</style>
