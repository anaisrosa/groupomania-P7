<template>
  <div class="edit_profile">
    <h1>Modifiez votre compte:</h1>

    <p>Mon pseudo actuel est : {{ user.pseudo }}</p>
    <p>Mon adresse email actuelle est : {{ user.email }}</p>
    <div>
      <div class="edit__informations">
        <label for="password"
          >Pour modifier vos informations, veuillez entrer votre mot de
          passe:</label
        >
        <input
          v-model="user.password"
          type="password"
          name="user.password"
          id="password"
          required
        /><button @click="comparePassword">Ok</button>
      </div>
    </div>

    <form class="edit_profile_form" @submit.prevent="updateUser">
      <div class="edit__informations">
        <label for="new_pseudo">Nouveau pseudo:</label>
        <input
          v-model="new_pseudo"
          type="text"
          name="new_pseudo"
          id="new_pseudo"
          required
        />
        <button >Ok</button>
      </div>
    </form>

    <form class="edit_profile_form" @submit.prevent="updateUser">
      <div class="edit__informations">
        <label for="new_email"> Nouveau email: </label>
        <input
          v-model="new_email"
          type="text"
          name="new_email"
          id="new_email"
          required
        />
        <button>Ok</button>
      </div>
    </form>

    <form class="edit_profile_form" @submit.prevent="updateUser">
      <div class="edit__informations">
        <label for="new_password"> Nouveau password: </label>
        <input
          v-model="new_password"
          type="password"
          name="new_password"
          id="new_password"
          required
        />
        <button>Ok</button>
      </div>
    </form>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";

export default {
  data() {
    return {
      user: {
        id: Storage.get().userId,
        email: "",
        pseudo: "",
        password: "",
      },
      new_email: "",
      new_pseudo: "",
      new_password: "",

      userId: Storage.get().userId
    };
  },

  // Recupération du compte
  async created() {
    try {
      let response = await fetch(
        `http://localhost:3000/api/auth/account/${this.user.id}`
      );
      this.user = await response.json();
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {

    // Vérification du mot de passe pour accéder à ma modification du Compte

    

    // modification des champs utilisateurs

    async updateUser() {
      console.log("je rentre dans la fonction");
      if (this.userId) {
        const updatedData = {
          pseudo: this.new_pseudo,
          email: this.new_email,
          password: this.new_password,
        };
        console.log(updatedData);
        try {
          const res = await fetch(
            `http://localhost:3000/api/auth/modify-account/${this.user.id}`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );
          window.alert("Votre compte a bien modifié!");
          // this.$router.push({ name: "Feed"})
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
};
</script>
