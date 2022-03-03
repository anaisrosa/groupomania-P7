<template>
  <div class="Main_edit_post">
    <Header />
    <div class="edit_post">
      <h1>Modifiez votre post :</h1>
      <div class="post_to_edit">
        <h2>"{{ post.title }}"</h2>
        <p>{{ post.content }}</p>
      </div>
      <form @submit.prevent="putData" class="edit_post_form">
        <div class="edit__informations">
          <label for="title">Modifiez le titre du post:</label>
          <input class="input_form"
            v-model="put_title"
            type="text"
            name="put_title"
            id="put_title"
            required
          />
        </div>
        <div class="edit__informations">
          <label for="content">Modifiez le contenu du post: </label>
          <input class="input_form"
            v-model="put_content"
            type="text"
            name="put_content"
            id="put_content"
            required
          />

          <br />
          <button class="btn_orange">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },

  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      put_title: "",
      put_content: "",

      // visitorId: Storage.get().userId
    };
  },

  methods: {
    async putData() {
      if (this.postId) {
        const putData = {
          title: this.put_title,
          content: this.put_content,
        };
        try {
          const res = await fetch(
            `http://localhost:3000/api/posts/${this.postId}`,
            {
              method: "put",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(putData),
            }
          );
          window.alert("Votre post a bien modifié!");
          this.$router.push({ name: "Feed" });
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
.edit_post {
  max-width: 80%;
  margin: 2rem 0;
  padding: 50px;
  border: solid 3px #fd2d01;
  border-radius: 1rem;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

.post_to_edit {
  background-color: #f2f2f2;
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  border-radius: 1rem;
}

.edit_post_form {
  margin: 2rem 0 1rem 0;
}
.edit__informations {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  padding: 1rem 0;
  color: #fd2d01;
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
  border-radius: 0.35rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
  box-shadow: -0.3rem 0.3rem 0.6rem #f2f2f2;
  margin: 1rem auto 0 auto;
}

.btn_orange:hover{
background-color: #f26549;
color: #f7e3e3;
}
</style>
