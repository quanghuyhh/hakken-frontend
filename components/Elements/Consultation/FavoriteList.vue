<template>
  <ul class="tag">
    <li v-for="(item, index) in items" :key="index">
      {{ item.name }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'FavoriteList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
