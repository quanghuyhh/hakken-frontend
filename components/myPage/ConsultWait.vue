<template>
  <div class="consultList">
    <div class="consultWait">
      <loading-icon />
      <p>
        {{ $t('mypage.wait_consult.finding_meister') }}<br>
        {{ $t('mypage.wait_consult.after_find_meister') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultWait'
}
</script>
