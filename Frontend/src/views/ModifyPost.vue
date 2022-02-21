<template>
  <div class="edit_post">
    <h1>Modifiez votre post :</h1>
    <div class="post_to_edit">
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    </div>
    <form @submit.prevent="putData" class="edit_post_form">
      <div class="edit__informations">
        <label for="title">Titre du post:</label>
        <input
          v-model="post.title"
          type="text"
          name="put_title"
          id="put_title"
          required
        />
      </div>
      <div class="edit__informations">
        <label for="content"> Contenu du post: </label>
        <input
          v-model="post.content"
          type="text"
          name="put_content"
          id="put_content"
          required
        />

        <br />
        <button >Modifier</button>
      </div>
    </form>
  </div>
</template>

<script>
// import Storage from "@/services/storageService.js";

export default {
  data() {
    return {
      post: {
        title: "",
        content: "",
      },

      // visitorId: Storage.get().userId
    };
  },

  methods: {
    

    async putData() {
      if (this.postId) {
        const putData = {
          title: this.post.title,
          content: this.post.content,
        };
        try {
          const res = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify(putData),
          });
          window.alert("Votre post a bien modifié!");
          this.$router.push({ name: "Feed"})
          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          }
        
        } catch (err) {
          this.putResult = err.message;
        }
      }
    },
  },

  computed: {
    postId() {
      return parseInt(this.$route.params.id);
    },
  },

  async mounted() {
    const response = await fetch(
      `http://localhost:3000/api/posts/${this.$route.params.id}`
    );
    console.log(response.status);
    this.post = await response.json();
    
  },
};
</script>

<style scoped>

.edit_post_form{
  margin: 2rem 0;
}
.edit_post{
  max-width: 80%;
  padding: 50px;
  border: solid 2px #fd2d01;
  border-radius: 1rem;
}
.post_to_edit{
  font-size: 0.85rem;
  text-align: left;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #f2f2f2;
}
.edit__informations{
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
  margin-top: 1.5rem;
 }
</style>
