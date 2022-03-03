<template>
  <div class="detailPost">
    <Header />
    <article class="postCard">
      <div class="info_post">
        <p>
          Posté par : {{ post.user.pseudo }}, le :
          {{ dateParser(post.createdAt) }}
        </p>
      </div>
      <div class="one_post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.content }}</p>
      </div>

      <!-- FORMULAIRE NOUVEAU COMMENTAIRE -->
      <form @submit.prevent="submitComment" id="comment_form">
        <div class="form__informations">
          <label class="label_form" for="commentContent">Commentaire: </label>
          <input
            class="input_form"
            v-model="new_comment.content"
            type="text"
            name="commentContent"
            id="commentContent"
            required
          />
          <button @click.prevent="submitComment" class="btn_rectangle">
            Commenter
          </button>
          <p id="commentContentErrorMsg"></p>
        </div>
      </form>
      <!-- AFFICHAGE DES COMMENTAIRES -->
      <div v-for="comment in comments" v-bind:key="comment.id" class="comments">
        <div class="comment_content">
          <p>"{{ comment.content }}</p>
          <p>Posté par : {{ comment.user.pseudo }}"</p>
        </div>
        <div class="actions_post">
          <button
            v-if="comment.userId === visitorId"
            @click="deleteCommentById(comment.id, i)"
            class="btn_round"
          >
            <fa icon="trash-can" />
          </button>

          <router-link
            :to="{ name: 'ReportComment', params: { id: comment.id } }"
            ><button v-if="comment.userId !== visitorId" class="btn_round">
              <fa icon="flag" /></button
          ></router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
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
        user: {
          pseudo: "",
        },
      },
      comments: [],
      new_comment: {
        content: "",
        userId: "",
      },
      visitorId: Storage.get().userId,
    };
  },

  methods: {
    async getCommentsData() {
      const token = Storage.get().token;
      try {
        let response = await fetch(
          `http://localhost:3000/api/comments/${this.postId}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        this.comments = await response.json();
        console.log(this.comments);
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment() {
      const token = Storage.get().token;
      // console.log(Storage.get());
      // const storedData = Storage.get()
      // const userId = storedData.userId
      // const token = storedData.token
      this.new_comment.userId = Storage.get().userId;
      this.new_comment.postId = this.postId;
      console.log(this.new_comment);
      const res = await fetch("http://localhost:3000/api/comments", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.new_comment),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `bearer ${token}`,
        },
      });
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
      // this.$router.push({ name: 'DetailsPost'})
    },

    dateParser(date) {
      let newDate = new Date(date).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return newDate;
    },
    async deleteCommentById(id, index) {
      const token = Storage.get().token;
      try {
        await fetch(`http://localhost:3000/api/comments/${id}`, {
          method: "delete",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        this.comments.splice(index, 1);
      } catch (err) {
        this.deleteResult = err.message;
      }
    },
  },

  computed: {
    postId() {
      return parseInt(this.$route.params.id);
    },
  },

  async created() {
    const token = Storage.get().token;
    const response = await fetch(
      `http://localhost:3000/api/posts/${this.$route.params.id}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    this.post = await response.json();
    this.getCommentsData();
    // console.log(this.post);
  },
};
</script>

<style scoped>
.postCard {
  background-color: #f7e3e3;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

.info_post {
  font-style: italic;
  font-size: 0.85rem;
  text-align: right;
  margin-block-start: 0;
  margin-block-end: 0.2rem;
  padding-right: 0.3rem;
}

.one_post {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  width: 85%;
  margin: 2rem auto;
}

#comment_form {
  padding: 1rem 0 0 0;
  width: 85%;
  margin: 0 auto;
}

.form__informations {
  display: flex;
  flex-direction: column;
}

.label_form {
  font-weight: 500;
  padding-bottom: 1rem;
}

.input_form {
  border: solid 1px #f2f2f2;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  height: 1.5rem;
  font-weight: bold;
}

.btn_rectangle {
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f2f2f2;
  margin: 2rem auto 0 auto;
  box-shadow: -0.3rem 0.3rem 0.6rem #f2f2f2;
}

.actions_post {
  display: flex;
  justify-content: end;
}

.btn_round {
  border: solid 1px #f2f2f2;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: 0.75rem 0.3rem 0rem 0.3rem;
  background: #f2f2f2;
  color: #2c3e50;
}

.btn_round:hover {
  color: #fd2d01;
}

.comments {
  width: 85%;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem auto;
}

.comment_content {
  border-bottom: solid 1px #f2f2f2;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}
</style>
