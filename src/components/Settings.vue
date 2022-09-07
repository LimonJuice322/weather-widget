<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import GearIcon from '@/assets/icons/gear.svg';

const modalIsOpened = ref<boolean>(false);
function toggleModal() {
  modalIsOpened.value = !modalIsOpened.value;
}
</script>

<template>
  <div class="settings">
    <button
      class="settings__button"
      @click="toggleModal"
    >
      <GearIcon class="settings__button-icon" />
    </button>

    <modal
      :is-opened="modalIsOpened"
      @close-modal="toggleModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  display: flex;

  margin-bottom: 10px;

  &__button {
    $size: 24px;

    width: $size;
    height: $size;
    margin-left: auto;
    padding: 0;

    cursor: pointer;

    border: 0;
    background-color: transparent;

    &-icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
