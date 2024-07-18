<template>
  <div>
    <h2>Page 1</h2>
    <b-button @click="makePostRequest">Send POST Request</b-button>
    <div v-if="response">
      <pre>{{ response }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async makePostRequest() {
      try {
        const res = await axios.post('https://example.com/api', { key: 'value' });
        this.response = res.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
