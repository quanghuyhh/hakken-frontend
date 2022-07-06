<template>
  <ol class="pagination pageNation">
    <li
      v-if="firstLastPage"
      class="pagination-item"
    >
      <span
        :disabled="isInFirstPage"
        aria-label="Go to first page"
        @click="onClickFirstPage"
      >
        First
      </span>
    </li>

    <li
      class="pagination-item"
    >
      <button
        type="button"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        @click="onClickPreviousPage"
      >
        «
      </button>
    </li>

    <li v-for="(page, index) in pages" :key="index">
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        :disabled="isInLastPage"
        aria-label="Go to next page"
        @click="onClickNextPage"
      >
        »
      </button>
    </li>

    <li v-if="firstLastPage" class="pagination-item">
      <span
        :disabled="isInLastPage"
        aria-label="Go to last page"
        @click="onClickLastPage"
      >
        Last
      </span>
    </li>
  </ol>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 7
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    firstLastPage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    startPage () {
      let result = 1
      if (this.currentPage < this.maxVisibleButtons - 3) {
        result = 1
      } else if (this.currentPage === this.totalPages) {
        result = this.totalPages - this.maxVisibleButtons + 1
      } else if (this.currentPage === this.totalPages - 2) {
        result = this.currentPage - 4
      } else if (this.currentPage === this.totalPages - 1) {
        result = this.currentPage - 5
      } else {
        result = this.currentPage - 3
      }

      return result < 1 ? 1 : result
    },
    endPage () {
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
    },
    pages () {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }

      return range
    },
    isInFirstPage () {
      return this.currentPage === 1
    },
    isInLastPage () {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage () {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage () {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage (page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage () {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage () {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive (page) {
      return this.currentPage === page
    }
  }
}

</script>
<style scoped>
.pageNation {
  padding: 20px 20px 40px 20px;
  display: flex;
  justify-content: center;
}

.pageNation li {
  margin: 0 4px;
}

.pageNation li button {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  background: #dcdcdc;
  border-radius: 50%;
  font-weight: bold;
  border: none;
  color: #000;
  transition: all .3s ease;
  cursor: pointer;
}

.pageNation li button:disabled {
  cursor: not-allowed;
}

.pageNation li button.active, .pageNation li button:hover {
  background: #f8b62d;
}

</style>
