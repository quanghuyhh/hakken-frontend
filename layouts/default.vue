<template>
  <div id="wrapper">
    <Header />

    <nuxt />

    <Footer />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '/css/default/content.css' },
        { rel: 'stylesheet', href: '/css/default/default.css' },
        { rel: 'stylesheet', href: '/css/default/layout.css' }
      ]
    }
  }
}
</script>
