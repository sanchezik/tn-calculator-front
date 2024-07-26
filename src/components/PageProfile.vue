<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div v-if="response">
      <pre>{{ response }}</pre>
    </div>
    <div class="w-50 mb-3">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Enter username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Enter password" required>
      </div>
    </div>
    <b-button @click="makeLoginRequest" style="width: 300px;">Sign in</b-button>
    <div id="signInErrMsg" class="text-danger my-1"></div>
    <div id="signInInfoMsg" class="text-success my-1"></div>
    <h2 class="my-5">or</h2>
    <b-button @click="makeLogoutRequest" style="width: 300px;">Sign out</b-button>
    <div id="signOutErrMsg" class="text-danger my-1"></div>
    <div id="signOutInfoMsg" class="text-success my-1"></div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async makeLoginRequest() {
      $("#signInErrMsg").html("");
      $("#signInInfoMsg").html("");

      let data = {
        username: $.trim($("#username").val()),
        password: $.trim($("#password").val())
      }
      $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:5000/login",
        data: data,
        crossDomain: true,
        success: function (result) {
          $("#signInInfoMsg").html("Hello, " + result["user"]["username"]);
        },
        error: function (result) {
          $("#signInErrMsg").html(result);
          // $("#signInErrMsg").html(result.responseJSON["errors"]);
        }
      });
    },
    async makeLogoutRequest() {
      $("#signOutErrMsg").html("");
      $("#signOutInfoMsg").html("");
      fetch(`http://127.0.0.1:5000/logout`, {
        method: "POST",
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({})
      }).then(response => {
        $("#signOutInfoMsg").html(response["records"]);
      }).catch(error => {
        console.error('Error adding allergy:', error);
      });
    },
  },
};
</script>
