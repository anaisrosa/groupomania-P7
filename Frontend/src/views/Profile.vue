<template>
  <div class="Main_edit_profile">
    <Header />
    <div class="edit_profile">
      <h1>Modifiez votre compte:</h1>
      <div id="account">
        <p>Pseudo actuel : {{ user.pseudo }}</p>
        <p>Adresse email actuelle : {{ user.email }}</p>
      </div>

      <!-- EDIT USER ACCOUNT FORM -->
      <form class="edit_profile_form" @submit.prevent="comparePassword">
        <div class="form__informations">
          <label class="instruction_label" for="password"
            >Pour modifier vos informations, veuillez entrer votre mot de
            passe:</label
          >
          <input
            class="input_form"
            v-model="user.current_password"
            type="password"
            name="user.password"
            id="password"
            required
          /><button class="btn_orange">Ok</button>
        </div>
      </form>

      <div id="edit_forms_account" v-if="current_password_ok">
        <form class="edit_profile_form" @submit.prevent="updateUser">
          <div class="form__informations">
            <label for="new_pseudo">Nouveau pseudo:</label>
            <input
              class="input_form"
              v-model="new_pseudo"
              type="text"
              name="new_pseudo"
              id="new_pseudo"
              required
            />
            <button class="btn_orange">Ok</button>
          </div>
        </form>

        <form class="edit_profile_form" @submit.prevent="updateUser">
          <div class="form__informations">
            <label for="new_email"> Nouveau email: </label>
            <input
              class="input_form"
              v-model="new_email"
              type="text"
              name="new_email"
              id="new_email"
              required
            />
            <button class="btn_orange">Ok</button>
          </div>
        </form>

        <form class="edit_profile_form" @submit.prevent="updateUser">
          <div class="form__informations">
            <label for="new_password"> Nouveau password: </label>
            <input
              class="input_form"
              v-model="new_password"
              type="password"
              name="new_password"
              id="new_password"
              required
            />
            <button class="btn_orange">Ok</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Storage from "@/services/storageService.js";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },

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
      current_password_ok: false,

      userId: Storage.get().userId,
    };
  },

  // Recupération du compte
  async created() {
    const token = Storage.get().token;
    try {
      let response = await fetch(
        `http://localhost:3000/api/auth/account/${this.user.id}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${token}`,
          },
        }
      );
      this.user = await response.json();
      console.log(this.user);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    async comparePassword() {
      const data = {
        pseudo: this.user.pseudo,
        password: this.user.current_password,
      };
      const token = Storage.get().token;
      console.log("je rentre dans la fonction comparePassword");
      const res = await fetch(
        "http://localhost:3000/api/auth/verify-password",
        {
          // Adding method type
          method: "POST",

          // Adding body or contents to send
          body: JSON.stringify(data),

          // Adding headers to the request
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `bearer ${token}`,
          },
        }
      );
      // Converting to JSON
      const dataResult = await res.json();
      console.log(dataResult);
      if (dataResult.message == "success") {
        this.current_password_ok = true;
      }
      // Storage.set(dataResult);
    },

    // modification des champs utilisateurs

    async updateUser() {
      console.log("je rentre dans la fonction updateUser");
      const token = Storage.get().token;
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
                Authorization: `bearer ${token}`,
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

<style scoped>
.edit_profile {
  max-width: 80%;
  margin: 2rem 0;
  padding: 50px;
  border: solid 3px #fd2d01;
  border-radius: 1rem;
  box-shadow: -0.3rem 0.3rem 0.6rem #c2c2c2;
}

#account {
  background-color: #f2f2f2;
  padding: 0.5rem;
  border-radius: 1rem;
  margin: 0 0 1rem 0;
}

.form__informations {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  padding-top: 1rem;
  margin: 0 0 1rem 0;
}

.instruction_label {
  color: #fd2d01;
}

.input_form {
  border: solid 2px #f2f2f2;
  border-radius: 0.35rem;
  padding-left: 0.5rem;
  margin: 0 0 1rem 0;
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
}

.btn_orange:hover {
  background-color: #f26549;
  color: #f7e3e3;
}
</style>
