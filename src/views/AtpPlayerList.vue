<template>
  <div>
    <!-- Pagination Controls -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sortTable('playerId')">
            ID <span class="sort-icons">
            <span :class="{ active: sortKey === 'playerId' && sortAsc }">▲</span>
            <span :class="{ active: sortKey === 'playerId' && !sortAsc }">▼</span>
          </span>
          </th>
          <th @click="sortTable('nameFirst')">
            First Name <span v-if="sortKey === 'nameFirst'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortTable('dob')">
            Date of Birth <span v-if="sortKey === 'dob'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortTable('ioc')">
            Country <span v-if="sortKey === 'ioc'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortTable('height')">
            Height <span v-if="sortKey === 'height'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortTable('hand')">
            Hand <span v-if="sortKey === 'hand'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in paginatedPlayers" :key="player.id">
          <td>{{ player.playerId }}</td>
          <td>{{ player.nameFirst }} {{ player.nameLast }}</td>
          <td>{{ player.dob }}</td>
          <td>{{ player.ioc }}</td>
          <td>{{ player.height }}</td>
          <td>{{ player.hand }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "AtpPlayerList",
  data() {
    return {
      baseURL: "http://localhost:8080/",
      players: [],
      currentPage: 1,
      playersPerPage: 20,
      sortKey: "playerId",
      sortAsc: true,
    };
  },
  computed: {
    paginatedPlayers() {
      const start = (this.currentPage - 1) * this.playersPerPage;
      const end = start + this.playersPerPage;
      return this.sortedPlayers.slice(start, end);
    },
    sortedPlayers() {
      if (!this.sortKey) return this.players;
      return [...this.players].sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];

        // Handle null or undefined values
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // String comparison
        if (typeof aValue === "string") {
          return this.sortAsc
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Numeric comparison
        return this.sortAsc ? aValue - bValue : bValue - aValue;
      });
    },
    totalPages() {
      return Math.ceil(this.players.length / this.playersPerPage);
    }
  },
  methods: {
    async fetchData() {
      await axios.get(`${this.baseURL}api/players`)
      .then((res) => {
        this.players = res.data;
      })
      .catch((err) => console.log(err));
    },
    changePage(page) {
      this.currentPage = page;
    },
    // Change the sorting key and toggle sorting order
  sortTable(key) {
    if (this.sortKey === key) {
      this.sortAsc = !this.sortAsc; // Toggle order
    } else {
      this.sortKey = key; // Set new sort key
      this.sortAsc = true; // Reset to ascending order
    }
  }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f4f4f4;
  color: #333;
}

.sort-icons span {
  margin-left: 5px;
  opacity: 0.4; /* Lighter for inactive */
}

.sort-icons span.active {
  opacity: 1; /* Highlight for active */
}


th:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 5px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}
</style>
