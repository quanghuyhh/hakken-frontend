import Vue from 'vue'

Vue.mixin({
  methods: {
    typeNumbersOnly (event) {
      if (!/\d/.test(event.key) && event.key !== '.') { return event.preventDefault() }
      const str = event.target.value
      return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
      })
    },
    hankakuToZenkaku (string) {
      return String(string).replace(/[０-９]/g, (s) => {
        return Number(String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      })
    },
    zenkakuToHankaku (number) {
      return String(number).replace(/[A-Za-z0-9]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0)
      })
    }
  }
})
