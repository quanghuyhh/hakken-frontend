<template>
  <div class="nav-tabs">
    <div class="inner">
      <ul class="nav-items">
        <li
          v-for="(tabName, index) in items"
          :key="index"
          :class="['nav-item', { active: activeTab === index }]"
        >
          <a
            :class="[
              'nav-link',
              {
                active: activeTab === index,
                disabled: disabled.indexOf(index) >= 0
              }
            ]"
            aria-current="page"
            href="javascript:void(0);"
            @click.prevent="onTabClick(index)"
          >{{ tabName }}</a>
        </li>
      </ul>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tab',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    activeTab: {
      type: Number,
      required: false,
      default: 0
    },
    disabled: {
      type: [Array],
      required: false,
      default: () => []
    }
  },
  methods: {
    onTabClick (index) {
      this.$emit('change', index)
    }
  }
}

</script>
<style scoped>
.nav-tabs {
  padding: 0;
}

.nav-tabs .inner {
  padding: 0 0 20px;
}

.nav-tabs .nav-items {
  display: flex;
}

.nav-tabs li {

}

.nav-tabs li.active {
  color: #f8b62d;
  border-bottom: solid 2px #f8b62d;
}

.nav-tabs li a {
  color: currentColor;
  text-decoration: none;
  padding: 5px 15px;
  font-weight: 600;
}
</style>
