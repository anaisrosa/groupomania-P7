<template>
  <div class="feed">
    <div>
      <h1>À la une...</h1>
      <!-- FEED DES POSTS -->
      <article v-for="(post, i) in posts" v-bind:key="post.id" class="postCard">
        <router-link :to="{ name: 'DetailsPost', params: { id: post.id } }">
          <div class="info_post">
            <p>
              Posté par : {{ post.user.pseudo }}, le :
              {{ dateParser(post.createdAt) }}
            </p>
          </div>
          <div class="post">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </div>
        </router-link>

        <div class="actions_post">
          <router-link :to="{ name: 'ModifyPost', params: { id: post.id } }"
            ><button v-if="post.userId === visitorId">
              <fa icon="pen-to-square" /></button
          ></router-link>

          <button
            v-if="post.userId === visitorId"
            @click="deletePostById(post.id, i)"
          >
            <fa icon="trash-can" />
          </button>

          <router-link :to="{ name: 'ReportPost', params: { id: post.id } }"
            ><button v-if="post.userId !== visitorId">
              <fa icon="circle-exclamation" /></button
          ></router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";

export default {
  name: "Feed",
  data() {
    let posts = [];

    return {
      posts,
      visitorId: Storage.get().userId,
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
    dateParser(date) {
      let newDate = new Date(date).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return newDate;
    },
  },
  created() {
    this.getPostsData();
  },
};
</script>

<style scoped>
.feed {
  max-width: 80%;
  padding: 50px;
  border: solid 2px #fd2d01; 
  border-radius: 1rem;
}

h1 {
  margin-bottom: 3rem;
}
a {
  text-decoration: none;
  color: #2c3e50;
}

.postCard {
  background-color: #f7e3e3;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  margin: 1rem 0;
  text-align: left;
}

.info_post {
  font-style: italic;
  font-size: 0.85rem;
  text-align: right;
  margin-block-start: 0;
  margin-block-end: 0.2rem;
  padding-right: 0.3rem;
}

.post {
  font-size: 0.85rem;
  text-align: left;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
}

.actions_post{
  display: flex;
  justify-content: end;
}

button{
  border: solid 1px #F2F2F2;
  border-radius: 50%;
  height:2rem;
  width: 2rem;
  margin: 0.75rem 0.3rem 0rem 0.3rem;
  background: #F2F2F2;
  color: #2c3e50;
 
 }
</style>
