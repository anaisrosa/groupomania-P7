<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <form @submit.prevent="putData">
      <div>
        <label for="title">Titre du post:</label>
        <input
          v-model="post.title"
          type="text"
          name="put_title"
          id="put_title"
          required
        />
      </div>
      <div>
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
