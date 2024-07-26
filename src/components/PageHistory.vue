<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div v-if="fetchingData" class="spinner-border text-secondary" role="status"></div>
    <div v-if="errors" class="text-danger mb-4">{{ errors }}</div>
    <div v-if="records" class="w-100 d-flex justify-content-center">
      <table class="text-center w-75">
        <colgroup>
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 20%;">
        </colgroup>
        <thead>
        <tr>
          <th>date</th>
          <th>operation cost</th>
          <th>your balance</th>
          <th>operation type</th>
          <th>response</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>{{ record.date }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.user_balance }}</td>
          <td>{{ record.operation.type }}</td>
          <td>{{ record.operation_response }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <b-button @click="getDataRequest" style="width: 300px; margin-top: 20px;">Fetch / update data</b-button>
    <div id="requestErrMsg" class="text-danger my-2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: null,
      fetchingData: false,
      errors: null
    };
  },
  methods: {
    async getDataRequest() {
      this.fetchingData = true
      this.errors = null
      this.records = null
      fetch(`http://127.0.0.1:5000/my-records`, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({})
      })
          .then(response => response.json())
          .then(data => {
            this.fetchingData = false
            if (data["error"]) {
              this.errors = data["error"]
            } else {
              this.records = data["records"]
            }
          })
          .catch(error => {
            this.fetchingData = false
            this.errors = error
            console.error('Error:', error);
          });
    },
  },
};
</script>
