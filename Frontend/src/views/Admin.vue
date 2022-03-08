<template>
  <div class="Main_Admin">
    <Header />
    <div class="admin">
      <div>
        <h1>C'est à vous...</h1>
        <p class="disclamer"> 
          En tant que modérateur, votre rôle est important !<br />
          Si vous éstimez que ces posts / commentaires ne sont pas appropriés,
          ou qu'ils peuvent heurter la senibilité de certains, vous pouvez les
          effacer de la plateforme.<br />Le cas échéant, vous pouvez les
          remettre dans le feed d'actualité.
        </p>
        <!-- DISPLAY REPORTED POSTS-->
        <div class="admin_posts">
          <h2>Liste des posts à modérer</h2>
          <article v-for="(post, i) in posts" v-bind:key="post.id" class="card">
            <div class="info_author">
              <p>
                Posté par : {{ post.user.pseudo }}, le :
                {{ dateParser(post.createdAt) }}
              </p>
            </div>
            <div class="post">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
            </div>

            <div class="action_btn">
              <button @click="authorizeReportedPost(post.id, i)" class="round_btn">
                <fa class="green_icon" icon="flag" />
              </button>

              <button @click="deleteReportedPost(post.id, i)" class="round_btn">
                <fa class="orange_icon" icon="trash-can" />
              </button>
            </div>
          </article>
        </div>
        <!-- DISPLAY REPORTED COMMENTS-->
        <div class="admin_comments">
          <h2>Liste des commentaires à modérer</h2>
          <article
            v-for="(comment, i) in comments"
            v-bind:key="comment.id"
            class="card"
          >
            <div class="info_author">
              <p>
                Posté par : {{ comment.user.pseudo }}, le :
                {{ dateParser(comment.createdAt) }}
              </p>
            </div>
            <div class="comment">
              <p>{{ comment.content }}</p>
            </div>

            <div class="action_btn">
              <button @click="authorizeReportedComment(comment.id, i)" class="round_btn">
                <fa class="green_icon" icon="flag" />
              </button>

              <button @click="deleteReportedComment(comment.id, i)" class="round_btn">
                <fa class="orange_icon" icon="trash-can" />
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
    let comments = [];

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
            Authorization: `bearer ${token}`,
          },
        };
        let response = await fetch(
          "http://localhost:3000/api/posts/read/reported/list",
          reqInit
        );

        const posts = await response.json();
        console.log(posts);
        this.posts = posts;
      } catch (error) {
        console.log(error);
      }
    },

    async getReportedCommensData() {
      try {
        const token = Storage.get().token;
        const reqInit = {
          headers: {
            Authorization: `bearer ${token}`,
          },
        };
        let response = await fetch(
          "http://localhost:3000/api/comments/read/reported/list",
          reqInit
        );

        const comments = await response.json();
        console.log(comments);
        this.comments = comments;
      } catch (error) {
        console.log(error);
      }
    },

    formatresponse(dataResult) {
      return JSON.stringify(dataResult, null);
    },

    dateParser(date) {
      let newDate = new Date(date).toLocaleString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return newDate;
    },

    async authorizeReportedPost(id, index) {
      
        const putData = {
          reported: false,
        };
        console.log(putData);
        const token = Storage.get().token;
        try {
          const res = await fetch(
            `http://localhost:3000/api/posts/authorize-post/${id}`,
            {
              method: "put",
              headers: {
                Authorization: `bearer ${token}`,
              },
              
            }
          );
          
          // this.$router.push({ name: "Feed" });

          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          } else {
            window.alert(
            "Ce post a bien été autorisé. Il est désormais visible sur le le feed des publications!"
          );
          this.posts.splice(index, 1);

          }
        } catch (err) {
          this.putResult = err.message;
        }
      
    },

        async authorizeReportedComment(id, index) {
      
        const putData = {
          reported: false,
        };
        console.log(putData);
        const token = Storage.get().token;
        try {
          const res = await fetch(
            `http://localhost:3000/api/comments/authorize-comment/${id}`,
            {
              method: "put",
              headers: {
                Authorization: `bearer ${token}`,
              },
              
            }
          );
          
          // this.$router.push({ name: "Feed" });

          if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`;
            throw new Error(message);
          } else {
            window.alert(
            "Ce commentaire a bien été autorisé. Il est désormais visible sur le le feed des publications!"
          );
          this.posts.splice(index, 1);

          }
        } catch (err) {
          this.putResult = err.message;
        }
      
    },

    async deleteReportedPost(id, index) {
      console.log("je rentre dans la fonction deleteReportedPost");
      const token = Storage.get().token;
      try {
        await fetch(`http://localhost:3000/api/posts/delete/reported-post/${id}`, {
          method: "delete",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        this.posts.splice(index, 1);
      } catch (err) {
        this.deleteResult = err.message;
      }
    },

    async deleteReportedComment(id, index) {
      console.log("je rentre dans la fonction deleteReportedComment");
      const token = Storage.get().token;
      try {
        await fetch(`http://localhost:3000/api/comments/delete/reported-comment/${id}`, {
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

  created() {
    this.getReportedPostsData();
    this.getReportedCommensData();
  },
};
</script>

<style scoped>
.admin {
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

h2 {
  text-align: right;
  margin: 2.5rem 0 1rem 0;
}

.disclamer{
  text-align: justify;
}

a {
  text-decoration: none;
  color: #2c3e50;
}

.card {
  background-color: #f7e3e3;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  margin: 1rem 0;
  text-align: left;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

.info_author {
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
  box-shadow: -0.1rem 0.1rem 0.2 #c2c2c2;
}

.comment {
  font-size: 0.85rem;
  text-align: left;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: -0.1rem 0.1rem 0.2 #c2c2c2;
}

.action_btn {
  display: flex;
  justify-content: flex-end;
}

.round_btn {
  border: solid 1px #f2f2f2;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  margin: 0.75rem 0.3rem 0rem 0.3rem;
  background: #f2f2f2;
  color: #2c3e50;
  box-shadow: -0.1rem 0.1rem 0.2 #c2c2c2;
}

.orange_icon:hover {
  color: #fd2d01;
}

.green_icon:hover {
  color: green;
}

@media all and (max-width: 670px){
.admin {
padding: 2rem;
}
.card {
  padding: 0.5rem;
  margin: 1.5rem 0;
}
}
</style>
