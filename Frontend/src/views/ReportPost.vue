<template>
  <div class="report_post">
    <h1>Signaler un abus</h1>
    <div class="reported_post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    </div>
    <p>Si vous pensez qu’une publication ou un commentaire d’un autre membre du groupe ne respecte pas les règles de ce dernier, vous pouvez signaler le contenu aux admins de Groupomania.</p>
    <p>Le ou les admins du groupe recevront ensuite une notification les informant qu’ils ont une publication à examiner. Les personnes occupant le rôle d’admin ou de modérateur du groupe ne peuvent pas signaler un commentaire ou une publication aux admins du groupe.</p>
    <p>Etes vous sur de vouloir signaler ce post?</p>
    <button @click="reportPutData">Confirmer</button>
    <router-link :to="{ name: 'Feed' }"><button>Annuler</button></router-link>
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

 button{
  border: none;
  border-radius: 0.25rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
  margin: 1rem 1rem 0 0;
 }

 .reported_post{
  background-color: #f7e3e3;
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  margin: 1rem 0 3rem 0;
  text-align: left;

 }
</style>