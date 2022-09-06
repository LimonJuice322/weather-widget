<template>
  <main class="page">
    <router-view/>
  </main>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import 'normalize.css';

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', 'Arial', sans-serif;
}

a {
  text-underline: none;
}

img {
  display: block;

  max-width: 100%;
}

.page {
  padding-right: 20px;
  padding-left: 20px;
}
</style>
