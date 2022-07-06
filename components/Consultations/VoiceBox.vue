<template>
  <div class="voiceBox">
    <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>
    <p>2022.01.24 〇〇〇様</p>
  </div>
</template>

<style scoped>

#voice {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
}
#voice .valuationList li {
    font-weight: bold;
    padding: 0 10px;
}
#voice .valuationList li span {
    font-size: 22px;
    margin: 0 5px;
    color: #dd5900;
}
#voice .voiceBox {
    background: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
}
#voice .voiceBox:not(:first-of-type) {
    margin-top: 20px;
}
#voice .valuationList {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}
@media screen and (min-width: 1159px){
  #voice {
      padding: 30px;
      margin-bottom: 40px;
  }
  #voice .valuationList {
      justify-content: flex-start;
  }
  #voice .voiceBox {
      padding: 20px;
  }
    #voice .voiceBox {
      padding: 20px;
  }
}

</style>
