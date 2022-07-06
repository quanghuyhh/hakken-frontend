<template>
  <div class="consultInfo disable waiting">
    <div class="profile waiting flex-row">
      <div class="ph">
        <img class="avatar animated-background">
      </div>

      <h3 class="flex-1">
        <span class="animated-background mb-5" style="width: 50%" />
        <a href="javascript:void(0);" class="animated-background" />
      </h3>
    </div>

    <div class="price">
      <span class="inputLabel">{{ $t('mypage.consult_list.price_total') }}</span>
      <p>総額<span class="total-amount">-</span>円（{{ $t('mypage.consult_list.include_tax') }})</p>
    </div>

    <div class="planBtn">
      <a href="javascript:void(0);" class="disabled">{{ $t('mypage.consult_list.detail_consult') }}</a>
    </div>

    <div class="consultControl">
      <ul>
        <li>
          <a href="javascript:void(0)">&nbsp;</a>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class="js-modal-open"
          >&nbsp;</a>
        </li>
        <li class="disable">
          <a href="javascript:void(0)">
            &nbsp;
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsultListWaitingItem'
}
</script>
<style scoped>
.consultInfo.disable, .consultInfo.noFix {
  opacity: 0.6;
  background: #eee;
  position: relative;
}

.consultInfo.disable:before {
  content: "誠に申し訳ありませんがご依頼を承れませんでした。";
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: #bc0000;
  top: 0;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: rgba(255,255,255,0.30);
}

.consultInfo.disable.waiting:before {
  content: '受付までしばらくお待ちください。';
  color: #0082BC;
}

.consultInfo.disable.rejected:before {
  content: '受付までしばらくお待ちください。';
  color: #0082BC;
}

.consultInfo .planBtn a.disabled {
  background: #bbb;
  pointer-events: none;
}

.animated-background, .profile.waiting .ph {
  animation: 1s forwards linear infinite flash;
  background: linear-gradient(to right, #d9d9d9 8%, #b7b7b7 18%, #dbdbdb 33%);
  background-size: 800px 104px;
  position: relative;
  display: block;
  border: none;
  min-height: 10px;
}

.flex-1 {
  flex: 1;
}

.flex-row {
  flex-direction: row;
}

.mb-5 {
  margin-bottom: 5px;
}

.avatar {
  opacity: 0;
}

@-webkit-keyframes flash {
  0% {
    background-position: -468px 0
  }
  100% {
    background-position: 468px 0
  }
}

@keyframes flash {
  0% {
    background-position: -468px 0
  }
  100% {
    background-position: 468px 0
  }
}

.total-amount {
  min-width: 80px;
  display: inline-block;
  text-align: center;
}
</style>
