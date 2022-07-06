<template>
  <div class="card">
    <div class="description">
      <div class="line line-1" />
      <br>

      <div class="line line-2" />

      <br>

      <div class="line line-1" />
      <div class="line line-1" />
      <br>

      <div class="line line-1" />
      <div class="line line-1" />
      <div class="line line-1" />
      <div class="line line-1" />
    </div>
  </div>
</template>

<style scoped>
.card{
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  margin-bottom: 20px;
}
.card .description{
  margin: 25px 0;
}
.description .line{
  background: #d9d9d9;
  border-radius: 10px;
  height: 13px;
  margin: 10px 0;
  overflow: hidden;
  position: relative;
}
.description .line-1{
  width: 100%;
}
.description .line-2{
  width: 100%;
  height: 380px;
}
.description .line::before
{
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0,0,0,0.05) 20%, #f1ecec 40%, #d9d9d9 100%);
  background-repeat: no-repeat;
  animation: shimmer 1s linear infinite;
}
@keyframes shimmer {
  0%{
    background-position: -450px 0;
  }
  100%{
    background-position: 450px 0;
  }
}
</style>
