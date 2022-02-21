<template>
  <div class="new_post_form">
    <h1>Ecrire un post</h1>
    <form @submit.prevent="submitPost">
      <div class="form__informations">
        <label for="title">Titre du post: </label>
        <input
          v-model="post.title"
          type="text"
          name="title"
          id="title"
          required
        />
        <p id="titleErrorMsg"></p>
      </div>
      <div class="form__informations">
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
     
    }
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
       window.alert("Votre post a bien posté!");
          this.$router.push({ name: "Feed"})
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
    }, // ferme submitpost
  }, // ferme methods
};
</script>

<style scoped>

.new_post_form {
    max-width: 80%;
  padding: 50px;
  border: solid 2px #fd2d01;
  border-radius: 1rem;
}

h1 {
  margin-bottom: 3rem;
}

.form__informations{
    display: flex;
    flex-direction: column;
  }

label{
  font-weight: 500;
  padding-bottom: 0.5rem;
}

input {
  border: solid 2px #f2f2f2;
  border-radius:0.35rem;
  padding-left: 0.5rem;
  height: 1.5rem;
  font-weight: bold;
}

 button{
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
 }

</style>
