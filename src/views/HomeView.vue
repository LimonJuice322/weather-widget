<template>
  <div class="home">
    <ul class="locations">
      <li
        v-for="weather in store.state.weather"
        class="locations__item"
      >
        <widget-item
          :data="weather"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import WidgetItem from '@/components/WidgetItem.vue';

let store = useStore();

onMounted(() => {
  store.dispatch('getUserLocation');
})
</script>

<style lang="scss">
.home {
  margin: 0 auto;
  padding-top: 20px;
}

.locations {
  max-width: 335px;
  margin: 0 auto;
  padding: 0;

  list-style-type: none;

  @media ('min-width: 1280px') {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    max-width: 685px;
  }

  &__item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
