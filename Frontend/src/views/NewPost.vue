<template>
  <div class="Main_new_post">
    <Header />
    <div class="new_post_form">
      <h1>Ecrire un post:</h1>

      <!-- CREATE POST FORM -->
      <form @submit.prevent="submitPost">
        <div class="form__informations">
          <label class="label_form" for="title">Titre du post: </label>
          <input
            class="input_form"
            v-model="post.title"
            type="text"
            name="title"
            id="title"
            required
          />
          <p id="titleErrorMsg"></p>
        </div>
        <div class="form__informations">
          <label class="label_form" for="content"> Contenu du post: </label>
          <input
            class="input_form"
            v-model="post.content"
            type="text"
            name="content"
            id="content"
            required
          />
          <p id="contentErrorMsg"></p>
          <br />
          <button class="btn_orange">Publier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
  name: "NewPost",
  components: {
    Header,
  },

  data() {
    return {
      post: {
        title: "",
        content: "",
        userId: "",
      },
    };
  },
  methods: {
    
    async submitPost() {
      const token = Storage.get().token;
      console.log(Storage.get());
      // const storedData = Storage.get()
      // const userId = storedData.userId
      // const token = storedData.token
      this.post.userId = Storage.get().userId;

      const res = await fetch("http://localhost:3000/api/posts", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.post),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
      });
      window.alert("Votre post a bien posté!");
      this.$router.push({ name: "Feed" });
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
  margin: 2rem 0;
  padding: 50px;
  border: solid 3px #fd2d01;
  border-radius: 1rem;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

h1 {
  margin-bottom: 3rem;
}

.form__informations {
  display: flex;
  flex-direction: column;
}

.label_form {
  font-weight: 500;
  padding-bottom: 0.5rem;
}

.input_form {
  border: solid 2px #f2f2f2;
  border-radius: 0.35rem;
  padding-left: 0.5rem;
  height: 1.5rem;
  font-weight: bold;
}

.btn_orange {
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
}

@media all and (max-width: 670px){
.new_post_form  {
padding: 2rem;
}

}
</style>
