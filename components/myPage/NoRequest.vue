<template>
  <div class="inner">
    <div class="noRequest">
      <slot>
        <p>
          {{ $t('mypage.no_request.no_consult_title') }}<br>
          {{ $t('mypage.no_request.find_meister') }}<br>
        </p>

        <nuxt-link to="/">
          {{ $t('mypage.no_request.top_button') }}
        </nuxt-link>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoRequest'
}
</script>
