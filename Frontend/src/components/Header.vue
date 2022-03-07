<template>
  <div class="header">
    <div>
      <img
        src="icon-left-font.png"
        alt="logo_groupomania"
        id="logo_groupomania"
      />
    </div>

    <div id="nav">
      <router-link v-if="userSession.token" to="/new-post"
        >Mon post</router-link
      >
      <router-link v-if="userSession.token" to="/feed"> Feed </router-link>
      <router-link v-if="!userSession.token" to="/">Connexion</router-link>
      <router-link v-if="userSession.token" to="/profile">Profile</router-link>
      <router-link v-if="userSession.isAdmin" to="/admin">Admin</router-link>
      <button class="round_btn" v-if="userSession.token" @click="logOut">
        <fa icon="arrow-right-from-bracket" />
      </button>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";

export default {
  name: "Header",
  data() {
    return {
      userSession: {},
    };
  },

  mounted() {
    this.userSession = Storage.get();
  },

  methods: {
    logOut() {
      Storage.clear();
      this.$router.push({ name: "Signup" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

#nav{
  display: flex;
  justify-content: center;
}
.round_btn {
  border: solid 1px #f2f2f2;
  border-radius: 50%;
  height: 1.8rem;
  width: 1.8rem;
  color: #fd2d01;
  background: #f2f2f2;
  margin-top: -0.3rem;
  box-shadow: -0.1rem 0.1rem 0.2 #c2c2c2;
  /* box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2; */
}

#logo_groupomania {
  width: 200px;
  height: 50px;
  object-fit: cover;
  
}

#nav {
  padding: 1rem 0.5rem 1rem 0;
  display: flex;
  justify-content: end;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 0.5rem 0 0;
}

#nav a.router-link-exact-active {
  color: #fd2d01;
}

#nav a:hover{
color: #fd2d01;
}
</style>
