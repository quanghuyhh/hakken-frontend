<template>
  <div class="resultCard">
    <div class="mainCard">
      <div class="bgImg">
        <img :src="meisterCover | aws_photo" onerror="this.src='~assets/images/consultations/sample_ph01.jpg'" :alt="meister.cover">
      </div>
      <div class="profCard">
        <div class="profImg">
          <img :src="meisterAvatar | aws_photo" :alt="meisterAvatar">
        </div>
        <br>
        <h3>
          <span>{{ agentName }}</span>
          {{ meister.name }}
          <span v-if="currentLocation">[{{ currentLocation.name }}]</span>
        </h3>

        <nuxt-link :to="localePath({name: $utils.routers.consultationsMeisterResult.name, params: {hashId: meister.hash_id}} )" class="baseBtn">
          {{ $t('consultations.matching_result.travel_meister_details') }}
        </nuxt-link>
      </div>
      <ul class="valuation">
        <li>
          {{ $t('consultations.matching_result.number_of_consultations') }}
          <span>113</span>{{ $t('consultations.matching_result.subject') }}
        </li>
        <li>
          {{ $t('consultations.matching_result.evaluation') }}
          <span>3.5</span>pt
        </li>
      </ul>
    </div>
    <p class="tagTitle">
      {{ $t('consultations.matching_result.category') }}
    </p>
    <elements-consultation-favorite-list :items="favorites" />
    <p class="prTxt">
      {{ meisterIntroduction }}
    </p>
  </div>
</template>
<script>
import { isEmpty, findLast } from 'lodash'
export default {
  name: 'ResultCard',
  props: {
    meister: {
      type: [Array, Object],
      default () {
        return {}
      }
    },
    destination: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    agentName () {
      return this.meister?.meister?.agent.name
    },
    meisterAvatar () {
      return this.meister?.meister?.avatar
    },
    meisterCover () {
      return this.meister?.meister?.cover
    },
    meisterIntroduction () {
      return this.meister?.meister?.introduction
    },
    favorites () {
      return this.meister?.meister?.favorites || []
    },
    purposes () {
      return this.meister?.meister?.purposes || []
    },
    meisterLocations () {
      return this.meister?.meister?.meister_location || []
    },
    currentLocation () {
      if (isEmpty(this.meisterLocations) || isEmpty(this.destination)) {
        return ''
      }
      return findLast(this.meisterLocations, location => location?.place_id === this.destination?.place_id)
    }
  }
}

</script>
