<template>
  <the-mask
    id="vue-the-mask-directive"
    class="form-control"
    :mask="mask"
    :masked="masked"
    :value="value"
    :name="name"
    @blur.native="onBlur"
    @change.native="onChange"
  />
</template>

<script>
export default {
  props: {
    value: {
      default: null,
      validator: (p) => {
        return ['string', 'number', 'boolean'].includes(typeof p) || p === null
      },
      type: [String, Number, Boolean]
    },
    name: {
      required: true,
      type: String
    },
    mask: {
      required: true,
      type: String
    },
    masked: {
      required: false,
      type: Boolean,
      default: false
    },
    replacer: {
      required: false,
      type: String,
      default: ''
    },
    replaceMode: {
      required: false,
      type: String,
      default: 'g'
    }
  },
  methods: {
    onBlur () {
      this.$emit('blur')
    },
    onChange (event) {
      this.$emit('input', event.target.value.replace(new RegExp(this.replacer, this.replaceMode), ''))
    }
  }
}
</script>
