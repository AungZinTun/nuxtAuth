<template>
  <div>
    <v-card v-if="!$store.state.authUser">
      <v-card-text>
        <v-text-field v-model="formData.email" />
        <v-text-field v-model="formData.password" />
        <v-btn @click="registerUser">
          Register
        </v-btn>
        <v-btn @click="signInUser">
          Signin
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-text>
        <p>User: {{$store.state.authUser.email}}</p>
        <v-btn color="red" @click="signOut">Logout</v-btn>
      </v-card-text>
    </v-card>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState({
      authUser: state => state.authUser
    })
  },
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  data: () => ({
    formData: {
      email: 'aungzintun.pgk@gmail.com',
      password: 'Azt199119'
    }
  }),
  methods: {
    async registerUser () {
      try {
        await this.$store.dispatch('registerUser',
          {
            email: this.formData.email,
            password: this.formData.password
          }
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser () {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signOut () {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    }
  }
})
</script>
