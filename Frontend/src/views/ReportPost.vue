<template>
<div class="Main_report_post">
  <Header/>
  <div class="report_post">
    <h1>Signaler un abus</h1>
    <div class="post">
    <h2>"{{ post.title }}"</h2>
    <p>{{ post.content }}</p>
    </div>
    <p>Si vous pensez qu’une publication ou un commentaire d’un autre membre du groupe ne respecte pas les règles de ce dernier, vous pouvez signaler le contenu aux admins de Groupomania.</p>
    <p>Le ou les admins du groupe recevront ensuite une notification les informant qu’ils ont une publication à examiner. Les personnes occupant le rôle d’admin ou de modérateur du groupe ne peuvent pas signaler un commentaire ou une publication aux admins du groupe.</p>
    <p>Etes vous sur de vouloir signaler ce post?</p>
    <button class="btn_orange" @click="reportPutData">Confirmer</button>
    <router-link :to="{ name: 'Feed' }">
    <button class="btn_orange">Annuler</button></router-link>
  </div>
</div>
</template>

<script>
// import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
    components : {
    Header
  },

  data() {
    return {
      post: {
        title: "",
        content: "",
        reported:"",
      },

      // visitorId: Storage.get().userId
    };
  },

  methods: {
    

    async reportPutData() {
      if (this.postId) {
        const putData = {
          reported: true,
        };
        console.log(putData);
        try {
          const res = await fetch(`http://localhost:3000/api/posts/report-post/${this.postId}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json"
              
            },
            body: JSON.stringify(putData),
          });
          window.alert("Ce post a bien été signalé. Notre équipe de modérateurs examinera votre demande dans les plus brefs délais!");
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
    // console.log(response.status);
    this.post = await response.json();
    
  },
};
</script>

<style scoped>

.post {
  color:#fd2d01;
  margin: 1rem 0 3rem 0;
}

.btn_orange {
  padding: 0.4rem;
  margin: 1rem 2rem 0 0;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
  border: none;
  border-radius: 0.35rem;
  box-shadow: -0.3rem 0.3rem 0.6rem #f2f2f2; 
}

.btn_orange:hover {
background-color: #f26549;
color: #f7e3e3;
} 
</style>