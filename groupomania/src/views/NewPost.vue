<template>
  <div>
    <form @submit.prevent="submitPost">
      <div>
        <label for="title">Titre du post:</label>
        <input
          v-model="post.title"
          type="text"
          name="title"
          id="title"
          required
        />
        <p id="titleErrorMsg"></p>
      </div>
      <div>
        <label for="content"> Contenu du post: </label>
        <input
          v-model="post.content"
          type="text"
          name="content"
          id="content"
          required
        />
        <p id="contentErrorMsg"></p>
        <br />
        <button>Commenter</button>
      </div>
    </form>
  </div>
</template>

<script>

import Storage from '@/services/storageService.js'

export default {
  name: "NewPost",
  data() {
    return {
      post: {
        title: "",
        content: "",
        userId: ""

      },
    };
  },
  methods: {
    async submitPost() {
      console.log(Storage.get())
      // const storedData = Storage.get()
      // const userId = storedData.userId
      // const token = storedData.token
      this.post.userId = Storage.get().userId

      const res = await fetch("http://localhost:3000/api/posts", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.post),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
    }, // ferme submitpost
  }, // ferme methods
};
</script>


