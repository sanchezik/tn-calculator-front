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
      $.post("http://176.57.184.98:5000/my-records", {})
          .done(function (result) {
            $("#myRecords").html(result["records"]);
          })
          .fail(function (result) {
            $("#requestErrMsg").html(result.responseJSON["error"]);
          });
    },
  },
};
</script>
