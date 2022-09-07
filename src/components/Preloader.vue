<template>
  <div class="preloader"></div>
</template>

<script>
export default {
  name: "Preloader"
}
</script>

<style lang="scss" scoped>
.preloader {
  $size: 80px;

  display: inline-block;

  width: $size;
  height: $size;

  &::after {
    $size: 64px;

    display: block;

    width: $size;
    height: $size;
    margin: 8px;

    content: ' ';

    animation: lds-dual-ring 1.2s linear infinite;

    border-radius: 50%;
    border-width: 6px;
    border-style: solid;
    border-color: lightgray transparent lightgray transparent;
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
