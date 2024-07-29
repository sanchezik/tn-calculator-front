<template>
  <div class="p-5 d-flex flex-column align-items-center">
    <div class="w-50 mb-3">
      <div class="form-group">
        <label for="param1">Parameter 1</label>
        <input type="number" class="form-control" id="param1" v-model="inputParam1" placeholder="Enter param 1">
      </div>
      <div class="form-group">
        <label for="number">Parameter 2</label>
        <input type="text" class="form-control" id="param2" v-model="inputParam2" placeholder="Enter param 2">
      </div>
      <div class="form-group">
        <label for="operationSelector">Choose operation</label>
        <select class="custom-select" id="operationSelector" v-model="inputOperation">
          <option value="addition">addition</option>
          <option value="subtraction">subtraction</option>
          <option value="multiplication">multiplication</option>
          <option value="division">division</option>
          <option value="square_root">square root</option>
          <option value="random_string">random string</option>
        </select>
      </div>
    </div>
    <div v-if="fetchingData" class="spinner-border text-secondary" role="status"></div>
    <div v-if="response" class="h2 mb-3">Answer: {{ response }}</div>
    <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
    <b-button @click="makeCalculateRequest" style="width: 300px;" class="mt-5">Calculate</b-button>
    <div class="alert alert-warning w-50 my-5" role="alert">
      <ul>
        <li>each user has 20 credits to perform operations</li>
        <li>credit renews each 60 seconds</li>
        <li>
          operation cost:
          <ul>
            <li>addition - 1 credit</li>
            <li>subtraction - 1 credit</li>
            <li>multiplication - 2 credits</li>
            <li>division - 3 credits</li>
            <li>square_root - 4 credits</li>
            <li>generate a random string - 10 credits</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputParam1: '',
      inputParam2: '',
      inputOperation: 'addition',
      errorMessage: null,
      fetchingData: false,
      response: null
    };
  },
  methods: {
    async makeCalculateRequest() {
      this.errorMessage = null
      this.fetchingData = true
      this.response = null
      fetch(`http://ec2-15-229-250-69.sa-east-1.compute.amazonaws.com:5000/api/v1/do-math`, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          operation: this.inputOperation,
          param1: this.inputParam1,
          param2: this.inputParam2,
        })
      })
          .then(response => response.json())
          .then(data => {
            if (data["errors"]) {
              this.errorMessage = data["errors"]
            } else {
              this.response = data["result"]
            }
            this.fetchingData = false
          })
          .catch(error => {
            this.errorMessage = error
            console.error('Error:', error);
            this.fetchingData = false
          });
    },
  },
};
</script>
