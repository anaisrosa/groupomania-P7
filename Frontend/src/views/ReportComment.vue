<template>
<div class="Main_report_comments">
  <Header/>
   <div class="report_comment">
    <h1>Signaler un abus!</h1>
    <div id="reported_comment">
    <h2 class="comment">"{{ comment.content }}"</h2>
    </div>

    <p>Si vous pensez qu’une publication ou un commentaire d’un autre membre du groupe ne respecte pas les règles de ce dernier, vous pouvez signaler le contenu aux admins de Groupomania.</p>
    <p>Le ou les admins du groupe recevront ensuite une notification les informant qu’ils ont une publication à examiner. Les personnes occupant le rôle d’admin ou de modérateur du groupe ne peuvent pas signaler un commentaire ou une publication aux admins du groupe.</p>
    <p>Etes vous sur de vouloir signaler ce commentaire?</p>
    
    <button class="btn_orange" @click="reportComment">Confirmer</button>
    <router-link :to="{ name: 'Feed' }"><button class="btn_orange">Annuler</button></router-link>
  </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
    components : {
    Header
  },

  data() {
    return {
       comment: {
        content: "",
        reported:"",
      },


      visitorId: Storage.get().userId
    };
  },

  methods: {
    
    async reportComment() {
      const token = Storage.get().token;
      if (this.commentId) {
        const putData = {
          reported: true,
        };
        console.log(putData);
        try {
          const res = await fetch(`http://localhost:3000/api/comments/report-comment/${this.commentId}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`,
              
            },
            body: JSON.stringify(putData),
          });
          window.alert("Ce commentaire a bien été signalé. Notre équipe de modérateurs examinera votre demande dans les plus brefs délais!");
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
    commentId() {
      return parseInt(this.$route.params.id);
    },
  },

  async mounted() {
    const token = Storage.get().token;
    const response = await fetch(
      `http://localhost:3000/api/comments/find-one/${this.$route.params.id}`,{
            headers: {
              Authorization: `bearer ${token}`,
            },
          });
    // console.log(response.status);
    this.comment = await response.json();
  
  },
};
</script>

<style scoped>

.report_comment {
  max-width: 80%;
  margin: 2rem 0;
  padding: 50px;
  border: solid 3px #fd2d01;
  border-radius: 1rem;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

.comment {
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

@media all and (max-width: 670px){
.report_comment {
padding: 2rem;
}
}

</style>