<template>
  <no-ssr>
    <div>
      <div id="wrapper">
        <guest-header />

        <main>
          <nuxt />
        </main>
      </div>

      <guest-footer />
    </div>
  </no-ssr>
</template>

<script>
export default {
  name: 'Guest',
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 1000)
    })
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: '/css/guest/content.css' },
        { rel: 'stylesheet', href: '/css/guest/default.css' },
        { rel: 'stylesheet', href: '/css/guest/layout.css' }
      ],
      title: process.env.APP_TITLE,
      meta: [
        {
          hid: process.env.APP_HID,
          name: process.env.APP_NAME,
          content: process.env.APP_DESCRIPTION
        }
      ]
    }
  }
}
</script>
