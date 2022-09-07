<template>
  <div class="home">
    <settings />

    <transition-group
      name="list"
      class="locations"
      tag="ul"
    >
      <li
        v-for="(weather, index) in store.state.weather"
        :key="index"
        class="locations__item"
      >
        <widget-item
          :data="weather"
        />
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import WidgetItem from '@/components/WidgetItem.vue';
import Settings from '@/components/Settings.vue';

let store = useStore();

onMounted(() => {
  store.dispatch('getUserLocation');
})
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.home {
  max-width: 335px;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;

  @media ('min-width: 1280px') {
    max-width: 685px;
  }

  &__preloader {
    position: fixed;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
}

.locations {
  margin: 0 auto;
  padding: 0;

  list-style-type: none;

  @media ('min-width: 1280px') {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  &__item {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }

    @media ('min-width: 1280px') {
      margin-bottom: 0;
    }
  }
}
</style>
