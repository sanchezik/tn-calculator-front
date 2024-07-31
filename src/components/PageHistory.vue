<template>
  <div class="px-5 pb-5 pt-1 d-flex flex-column align-items-center">

    <div class="row w-75 py-4">
      <div class="col-3 d-flex flex-row align-items-center justify-content-start">
        <input type="text" class="form-control ml-4" v-model="filterText" placeholder="Type to filter..."/>
      </div>
      <div class="col text-muted d-flex flex-row align-items-center justify-content-end">
        Sorting column:
        <select class="custom-select ml-1 mr-3" id="sortColSelector" v-model="pageSettings.sort" style="width: 125px;">
          <option value="date">date</option>
          <option value="amount">operation cost</option>
          <option value="user_balance">balance left</option>
          <option value="operation_id">operation type</option>
          <option value="operation_response">response</option>
        </select>
        Records per page:
        <input type="number" class="form-control ml-1 mr-4" v-model="pageSettings.size" style="width: 75px;" min="1">
      </div>
    </div>

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
          <th>balance left</th>
          <th>operation type</th>
          <th>response</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in filteredRecords" :key="index" :class="{ deleting: record.isDeleting }">
          <td>{{ record.date }}</td>
          <td>{{ record.amount }}</td>
          <td>{{ record.user_balance }}</td>
          <td>{{ record.operation.type }}</td>
          <td>{{ record.operation_response }}</td>
          <td>
            <b-button class="btn-danger" @click="deleteRecord(record)" :disabled=record.isDeleting>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                   viewBox="0 0 16 16" style="margin-top: -3px;">
                <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </b-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="row pt-4 pb-2">
      <div class="col">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: pageSettings.number === 1 || !pageSettings.number }">
              <button class="page-link" @click="changePage(pageSettings.number - 1)">Previous</button>
            </li>
            <li
                class="page-item"
                v-for="page in totalPages"
                :key="page"
                :class="{ active: pageSettings.number === page }"
            >
              <button class="page-link" @click="changePage(page)">
                {{ page }}
              </button>
            </li>
            <li class="page-item" :class="{ disabled: pageSettings.number === totalPages || !pageSettings.number }">
              <button class="page-link" @click="changePage(pageSettings.number + 1)">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <b-button @click="getDataRequest" style="width: 300px;">Fetch / update data</b-button>
    <div id="requestErrMsg" class="text-danger my-2"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: null,
      filterText: "",
      pageSettings: {
        number: null,
        size: 20,
        totalRecords: null,
        sort: "date"
      },
      fetchingData: false,
      errors: null
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pageSettings.totalRecords / this.pageSettings.size);
    },
    filteredRecords() {
      if (!this.filterText) {
        return this.records;
      }
      return this.records.filter(record =>
          Object.values(record).some(value =>
              typeof value === 'object'
                  ? Object.values(value).some(subValue =>
                      subValue.toString().toLowerCase().includes(this.filterText.toLowerCase())
                  )
                  : value.toString().toLowerCase().includes(this.filterText.toLowerCase())
          )
      );
    },
  },
  methods: {
    async getDataRequest() {
      this.fetchingData = true
      this.errors = null
      this.records = null
      fetch(`http://ec2-15-229-250-69.sa-east-1.compute.amazonaws.com:5000/api/v1/my-records`, {
        method: "POST",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
          sort_col: this.pageSettings.sort,
          page_size: this.pageSettings.size,
          page_num: this.pageSettings.number
        })
      })
          .then(response => response.json())
          .then(data => {
            this.fetchingData = false
            if (data["errors"]) {
              this.errors = data["errors"]
            } else {
              data["records"].forEach(e => e.isDeleting = false);
              this.records = data["records"]
              this.pageSettings.number = data["pageNumber"]
              this.pageSettings.size = data["pageSize"]
              this.pageSettings.totalRecords = data["totalRecords"]
              this.pageSettings.sort = data["sortColumn"]
            }
          })
          .catch(error => {
            this.fetchingData = false
            this.errors = error
            console.error('Error:', error);
          });
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.pageSettings.number = parseInt(page)
        this.getDataRequest()
      }
    },
    deleteRecord(record) {
      record.isDeleting = true;
      fetch(`http://ec2-15-229-250-69.sa-east-1.compute.amazonaws.com:5000/api/v1/my-records/${record.id}`, {
        method: "DELETE",
        credentials: "include",
        headers: new Headers({'content-type': 'application/json'})
      })
          .then(response => response.json())
          .then(response => {
            console.log('Record deleted:', response);
            this.records = this.records.filter(r => r.id !== record.id);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    },
  },
};
</script>

<style>
.deleting {
  background-color: lightgray;
}
</style>