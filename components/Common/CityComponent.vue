<template>
  <div>
    <span class="inputLabel">{{ $t('fields.city') }}<span>{{ $t('require') }}</span></span>

    <div class="selectBox">
      <validation-provider
        v-slot="{ errors }"
        name="city"
        rules="required"
      >
        <select v-model="modal">
          <option key="-1" value="-1">
            {{ $t('fields.city') }}
          </option>

          <option v-for="(cityOption, index) in cityOptions" :key="index" :value="cityOption">
            {{ cityOption }}
          </option>
        </select>
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityComponent',
  props: {
    value: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      cityOptions: [
        '北海道',
        '青森県',
        '岩手県',
        '宮城県',
        '秋田県',
        '山形県',
        '福島県',
        '茨城県',
        '栃木県',
        '群馬県',
        '埼玉県',
        '千葉県',
        '東京都',
        '神奈川県',
        '新潟県',
        '富山県',
        '石川県',
        '福井県',
        '山梨県',
        '長野県',
        '岐阜県',
        '静岡県',
        '愛知県',
        '三重県',
        '滋賀県',
        '京都府',
        '大阪府',
        '兵庫県',
        '奈良県',
        '和歌山県',
        '鳥取県',
        '島根県',
        '岡山県',
        '広島県',
        '山口県',
        '徳島県',
        '香川県',
        '愛媛県',
        '高知県',
        '福岡県',
        '佐賀県',
        '長崎県',
        '熊本県',
        '大分県',
        '宮崎県',
        '鹿児島県',
        '沖縄県'
      ]
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value (newVal) {
      this.city = newVal
    }
  }
}
</script>
