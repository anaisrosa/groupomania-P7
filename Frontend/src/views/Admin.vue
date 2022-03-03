<template>
  <div class="Main_Admin">
    <Header />
    <div class="admin">
      <div>
        <h1>Vous êtes le modérateur, à vous de jouer...</h1>
        <div class="admin_posts">
          <article
            v-for="(post, i) in posts"
            v-bind:key="post.id"
            class="postCard"
          >
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

            <div class="actions_post">
              <button @click="cancelReport(post, i)" class="round_btn">
                <fa icon="pen-to-square" />
              </button>

              <button @click="deleteReportedPost(post, i)"
                class="round_btn"
              >
                <fa icon="trash-can" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
  name: "Feed",
  components: {
    Header,
  },

  data() {
    let posts = [];
    let comments =[];

    return {
      posts,
      comments,
      visitorId: Storage.get().userId,
    };
  },
  methods: {
    async getReportedPostsData() {
      try {
        const token = Storage.get().token;
        const reqInit = {
          headers: {
              "Authorization": `bearer ${token}`
            },
        }
        let response = await fetch("http://localhost:3000/api/posts/read/reported/list", reqInit);
       
        const posts = await response.json();
        console.log(posts);
        this.posts = posts
      } catch (error) {
        console.log(error);
      }
    },

    formatresponse(dataResult) {
      return JSON.stringify(dataResult, null);
    },

    // async deletePostById(id, index) {
    //   try {
    //     await fetch(`http://localhost:3000/api/posts/${id}`, {
    //       method: "delete",
    //     });
    //     this.posts.splice(index, 1);
    //   } catch (err) {
    //     this.deleteResult = err.message;
    //   }
    // },
    dateParser(date) {
      let newDate = new Date(date).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return newDate;
    },
  },

  deleteReportedPost(post, i) {
    console.log(post,i)

  },

  deleteReportedComment(comment, i) {
console.log(comment,i)
  },

  cancelReportedPost(post, i) {
console.log(post,i)
  },

   cancelReportedComment(comment, i){
console.log(comment,i)
  },


  created() {
    this.getReportedPostsData();
  },
};
</script>
