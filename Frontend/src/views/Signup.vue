<template>
  <div class="Main_Register">
    <Header />
    <div class="login_signup_forms">
      <!-- SIGNUP FORM -->
      <div v-if="!showLogin" id="signup">
        <h1>Inscrivez-vous!</h1>
        <form @submit.prevent="signup" class="registration__form">
          <div class="form__informations">
            <label class="label_form" for="email">Email: </label>
            <input class="input_form"
              v-model="user.email"
              type="text"
              name="email"
              id="email"
              required
            />
            <p id="emailErrorMsg"><!-- ci est un message d'erreur --></p>
          </div>
          <div class="form__informations">
            <label class="label_form" for="pseudo"> Pseudo: </label>
            <input class="input_form"
              v-model="user.pseudo"
              type="text"
              name="pseudo"
              id="pseudo"
              required
            />
            <p id="pseudoErrorMsg"></p>
          </div>
          <div class="form__informations">
            <label class="label_form" for="password"> Mot de passe: </label>
            <input class="input_form"
              v-model="user.password"
              type="password"
              name="password"
              id="password"
              required
            />
            <p id="paswordErrorMsg"></p>
          </div>
          <button class="btn_orange">S'inscrire</button>
        </form>
        <br />
        <p><em>Vous avez déjà compte, connectez-vous!</em></p>
        <button class="btn_orange" @click="showLogin = true">Se connecter</button>
      </div>

      <div v-else id="register">
        <!-- LOG FORM -->
        <h1>Connexion:</h1>

        <form @submit.prevent="login" class="registration__form">
          <div class="form__informations">
            <label class="label_form" for="pseudo"> Pseudo: </label>
            <input class="input_form"
              v-model="user.pseudo"
              type="text"
              name="pseudo"
              id="pseudo__connexion"
              required
            />
            <p id="pseudoErrorMsg__connexion"></p>
          </div>
          <div class="form__informations">
            <label class="label_form" for="password"> Mot de passe: </label>
            <input class="input_form"
              v-model="user.password"
              type="password"
              name="password"
              id="password__connexion"
              required
            />
            <p id="paswordErrorMsg__connexion"></p>
          </div>
          <button class="btn_orange">Se connecter</button>
        </form>
        <br />
        <p><em>Vous ne disposez pas de compte, inscrivez-vous!</em></p>
        <button class="btn_orange" @click="showLogin = false">S'inscrire</button>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
  name: "Signup",
  components: {
    Header,
  },

  // }
  data() {
    return {
      showLogin: true,

      user: {
        email: "",
        password: "",
        pseudo: "",
      },
    };
  },
  mounted() {
    if (Storage.get().token) {
      this.$router.push({ name: "Feed" });
    }
  },

  methods: {
    async signup() {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.user),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
         
        },
      });
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
      // this.$router.push({ name: "Feed"})
    },

    async login() {
      console.log("je rentre dans la fonction");
      const res = await fetch("http://localhost:3000/api/auth/login", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(this.user),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
      Storage.set(dataResult);
      if (dataResult.token) {
        console.log("ok")
        this.$router.push({ name: "Feed" });
      }
    },
  },
};
</script>

<style scoped>

.login_signup_forms {
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

.form__informations {
  display: flex;
  flex-direction: column;
}

.label_form {
  font-weight: 500;
  padding-bottom: 0.5rem;
}

.input_form {
  border: solid 2px #f2f2f2;
  border-radius: 0.35rem;
  padding-left: 0.5rem;
  height: 1.5rem;
  font-weight: bold;
  box-shadow: -0.3rem 0.3rem 0.6rem #f2f2f2;
}

.btn_orange {
  border: none;
  border-radius: 0.35rem;
  padding: 0.4rem;
  width: 8rem;
  font-weight: bold;
  background-color: #f7e3e3;
  box-shadow: -0.3rem 0.3rem 0.6rem #f2f2f2;
  transition: transform .1s;
  
}

.btn_orange:hover{
background-color: #f26549;
color: #f7e3e3;
transform: scale(1.05);

} 

/* RESPONSIVE LARGE > LAPTOP */
@media  only screen and (min-device-width: 1025px) {

}

/* RESPONSIVE MEDIUM > IPAD */
@media only screen 
and (min-device-width: 768px) 
and (max-device-width: 1024px)  {

}

/* RESPONSIVE SMALL > MOBILE */
@media only screen 
and (max-width: 767px)
and (min-device-width: 414px) {
  
 
}


</style>
