<template>
  <div class="login_signup">
    <div v-if="!showLogin">
      <h1>Inscrivez-vous gratuitement</h1>
      <form @submit.prevent="signup" class="registration__form">
        <div>
          <label for="email">Email: </label>
          <input
            v-model="user.email"
            type="text"
            name="email"
            id="email"
            required
          />
          <p id="emailErrorMsg"><!-- ci est un message d'erreur --></p>
        </div>
        <div>
          <label for="pseudo"> Pseudo: </label>
          <input
            v-model="user.pseudo"
            type="text"
            name="pseudo"
            id="pseudo"
            required
          />
          <p id="pseudoErrorMsg"></p>
        </div>
        <div>
          <label for="password"> Mot de passe: </label>
          <input
            v-model="user.password"
            type="password"
            name="password"
            id="password"
            required
          />
          <p id="paswordErrorMsg"></p>
        </div>
        <button>S'inscrire</button>
     </form><br>

      <button @click="showLogin = true">Se connecter</button>
    </div>

    <div v-else>
      <h1>Connexion</h1>

      <form @submit.prevent="login" class="registration__form">
        <div>
          <label for="pseudo"> Pseudo: </label>
          <input
            v-model="user.pseudo"
            type="text"
            name="pseudo"
            id="pseudo__connexion"
            required
          />
          <p id="pseudoErrorMsg__connexion"></p>
        </div>
        <div>
          <label for="password"> Mot de passe: </label>
          <input
            v-model="user.password"
            type="password"
            name="password"
            id="password__connexion"
            required
          />
          <p id="paswordErrorMsg__connexion"></p>
        </div>
        <button>Se connecter</button>
      </form><br>
      <button @click="showLogin = false">S'inscrire</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Storage from '@/services/storageService.js'

export default {
  name: 'Signup',
  // components: {

  // }
  data () {
    return {
      showLogin : true,

      user: {
        email : "",
        password: "",
        pseudo: ""
      }
    }
  },

methods: {
  async signup () {
   const  res =  await fetch("http://localhost:3000/api/auth/signup", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(this.user),

    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    
});
// Converting to JSON
const dataResult = await res.json()
console.log(dataResult);
  },


async login () {
  console.log("je rentre dans la fonction");
   const  res =  await fetch("http://localhost:3000/api/auth/login", {

    // Adding method type
    method: "POST",

    // Adding body or contents to send
    body: JSON.stringify(this.user),

    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    
});
// Converting to JSON
const dataResult = await res.json()
console.log(dataResult );
Storage.set(dataResult)
  }
}

}
</script>

