<template>
  <footer>
    <ul>
      <li><a href="https://cab-station.com/company.html" target="_blank">{{ $t('guest_footer.company') }}</a></li>
      <li><a href="https://cab-station.com/privacy.html" target="_blank">{{ $t('guest_footer.privacy') }}</a></li>
      <li><a href="https://www.cab-station.com/travel.html" target="_blank">{{ $t('guest_footer.travel') }}</a></li>
      <li><a href="https://idealgrow.jp/tarm/">{{ $t('guest_footer.terms_of_service') }}</a></li>
      <li><a href="https://www.cab-station.com/contact.html" target="_blank">{{ $t('guest_footer.contact') }}</a></li>
    </ul>

    <p id="copy">
      {{ $t('guest_footer.copy_right') }}
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
