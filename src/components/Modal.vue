<script setup lang="ts">
import SortList from '@/components/SortList.vue';
import FormLocation from '@/components/FormLocation.vue';
import CloseIcon from '@/assets/icons/close.svg';

defineProps<{
  isOpened: boolean,
}>();

const emit = defineEmits<{
  (e: 'close-modal'): void,
}>();

function closeModal() {
  emit('close-modal');
}
</script>

<template>
  <transition name="modal">
    <div
      v-if="isOpened"
      class="modal"
      @click.self="closeModal"
    >
      <div class="modal__content">
        <button
          class="modal__close"
          @click="closeModal"
        >
          <CloseIcon class="modal__close-icon" />
        </button>

        <sort-list class="modal__list" />
        <form-location class="modal__form" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal__content,
.modal-leave-active .modal__content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal__content,
.modal-leave-to .modal__content {
  transform: scale(0);
}

.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.55);

  &__close {
    $size: 24px;

    position: absolute;
    top: 10px;
    right: 10px;

    width: $size;
    height: $size;
    padding: 0;

    cursor: pointer;

    border: 0;
    background-color: transparent;

    &-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    position: relative;

    width: 335px;
    padding: 40px 15px 15px 15px;

    border-radius: 15px;
    background-color: #ffffff;
  }

  &__list {
    margin-bottom: 15px;
  }
}
</style>
