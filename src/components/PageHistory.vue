<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <b-button @click="getDataRequest" style="width: 300px;">Fetch data</b-button>
    <div id="myRecords" class="my-2"></div>
    <div id="requestErrMsg" class="text-danger my-2"></div>
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
    async getDataRequest() {
      $("#myRecords").html("");
      $("#requestErrMsg").html("");
      fetch(`http://127.0.0.1:5000/my-records`, {
        method: "POST",
        credentials: 'include',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({})
      }).then(response => {
        $("#myRecords").html(response["records"]);
      }).catch(error => {
        console.error('Error:', error);
      });
    },
  },
};
</script>
