<template>
  <input ref="input" type="text" :placeholder="$t('traveller_request_page.step1.address_select')">
</template>
<script>
import { isEmpty } from 'lodash'
import { ref, onMounted } from '@vue/composition-api'
export default {
  name: 'PlaceAutoComplete',
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup (props, context) {
    const { $toast } = context.root
    const input = ref(null)
    const autocomplete = ref(null)
    const selectedPlace = ref({})

    onMounted(() => {
      input.value.focus()
      autocomplete.value = new google.maps.places.Autocomplete(input.value)
      autocomplete.value.addListener('place_changed', () => {
        const place = autocomplete.value.getPlace()
        if (!place.geometry || !place.geometry.location || isEmpty(place)) {
          $toast.error("No details available for input: '" + place.name + "'")
          return false
        }
        selectedPlace.value = place
        context.emit('add', selectedPlace.value)
      })
    })

    return {
      input
    }
  }
}
</script>

<style>
.pac-container:after {
  background-image: none !important;
  height: 0;
}
.pac-container {
  border-width: 1px;
  border-style: solid;
  border-color: #cbcfe2 #c8cee7 #c4c7d7;
  border-radius: 3px;
  background-color: #fdfdfd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  max-height: 215px;
}
.pac-icon {
  content: '';
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -9px;
  background: url("https://cssdeck.com/uploads/media/items/7/7BNkBjd.png") 0 0 no-repeat;
}
.pac-item {
  cursor: pointer;
  display: block;
  position: relative;
  margin: 0 -1px;
  padding: 6px 40px 6px 10px;
  color: #808394;
  font-weight: 500;
  text-shadow: 0 1px #fff;
  border: 1px solid transparent;
  border-radius: 3px;
}
.pac-item:hover {
  text-decoration: none;
  color: #fff;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
  border-color: #2380dd #2179d5 #1a60aa;
  background-color: #338cdf;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.2), 0 1px rgba(0, 0, 0, 0.08);
}
.pac-item-selected {}
.pac-item-selected {}
.pac-item-selected {}
</style>
