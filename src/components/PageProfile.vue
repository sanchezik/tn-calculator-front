<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
    <div v-if="user">
      <div class="mb-5 h3">Hello, {{ user.username }}</div>
      <b-button @click="makeLogoutRequest" style="width: 300px;">Sign out</b-button>
    </div>
    <div v-else>
      <div class="mb-3">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" v-model="inputUsername" placeholder="Enter username" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" v-model="inputPassword" placeholder="Enter password" required>
        </div>
      </div>
      <b-button @click="makeLoginRequest" style="width: 300px;">Sign in</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      inputUsername: '',
      inputPassword: '',
      errorMessage: null
    };
  },
  methods: {
    async makeLoginRequest() {
      if (this.inputUsername.length === 0 || this.inputPassword.length === 0) {
        this.errorMessage = "Please type username and password"
        return
      }
      this.errorMessage = null
      fetch(`http://127.0.0.1:5000/login`, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          username: this.inputUsername,
          password: this.inputPassword,
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data["errors"]) {
              this.errorMessage = data["errors"]
            } else {
              localStorage.setItem('user', JSON.stringify(data["user"]));
              this.user = data["user"]
            }
          })
          .catch(error => {
            this.errorMessage = error
            console.error('Error:', error);
          });
    },
    async makeLogoutRequest() {
      this.errorMessage = null
      fetch(`http://127.0.0.1:5000/logout`, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({})
      })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            localStorage.setItem('user', JSON.stringify(null));
            this.user = null
          })
          .catch(error => {
            console.error('Error:', error);
            this.errorMessage = error
          });
    },
  },
};
</script>
