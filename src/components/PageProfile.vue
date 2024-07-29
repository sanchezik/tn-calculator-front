<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div v-if="errorMessage" class="text-danger mb-3">{{ errorMessage }}</div>
    <div v-if="user">
      <div class="h3">Hello, {{ user.username }}</div>
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
    <div class="alert alert-warning w-50 my-5" role="alert">
      Feel free to use one of 2 users in DB:
      <br>
      login: <b>user1</b> password: <b>user1</b>
      <br>
      login: <b>user2</b> password: <b>user2</b>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
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
      fetch(`http://ec2-15-229-250-69.sa-east-1.compute.amazonaws.com:5000/api/v1/login`, {
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
              this.$emit('update-user', data["user"]);
            }
          })
          .catch(error => {
            this.errorMessage = error
            console.error('Error:', error);
          });
    },
  },
};
</script>
