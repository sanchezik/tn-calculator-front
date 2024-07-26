<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div v-if="response">
      <pre>{{ response }}</pre>
    </div>
    <div class="w-50 mb-3">
      <div class="form-group">
        <label for="param1">Parameter 1</label>
        <input type="number" class="form-control" id="param1" placeholder="Enter param 1">
      </div>
      <div class="form-group">
        <label for="number">Parameter 2</label>
        <input type="text" class="form-control" id="param2" placeholder="Enter param 2">
      </div>
    </div>
    <b-button @click="makeLoginRequest" style="width: 300px;">Sign in</b-button>
    <div id="signInErrMsg" class="text-danger my-1"></div>
    <div id="signInInfoMsg" class="text-success my-1"></div>
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
      $.post("http://176.57.184.98:5000/login", data)
          .done(function (result) {
            // this.response = res.data;
            $("#signInInfoMsg").html("Hello, " + result["user"]["username"]);
          })
          .fail(function (result) {
            $("#signInErrMsg").html(result.responseJSON["errors"]);
          });
    },
  },
};
</script>
