<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand to="/profile">Alex's app</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/profile">Profile</b-nav-item>
          <b-nav-item to="/calculate">Calculator</b-nav-item>
          <b-nav-item to="/history">History</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <div v-if="user">
        <b-button @click="makeLogoutRequest" class="px-4 btn-info">Sign out</b-button>
      </div>
    </b-navbar>
    <router-view :user="user" @update-user="updateUser"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  methods: {
    async makeLogoutRequest() {
      this.errorMessage = null
      fetch(`http://ec2-15-229-250-69.sa-east-1.compute.amazonaws.com:5000/api/v1/logout`, {
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
    updateUser(updatedUser) {
      this.user = updatedUser;
    }
  },
};
</script>

<style>
</style>
