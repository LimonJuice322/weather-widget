<script setup lang="ts">
import { useStore } from 'vuex';
import TrashIcon from '@/assets/icons/trash.svg';
import DotsIcon from '@/assets/icons/dots.svg';

const store = useStore();

function deleteLocation(index: number) {
  store.commit('DELETE_LOCATION', index);
  store.commit('DELETE_WEATHER', index);
  store.dispatch('saveData');
}
</script>

<template>
  <div class="sort-list">
    <transition-group
      v-if="store.state.locations"
      name="list"
      class="sort-list__list"
      tag="ul"
    >
      <li
        v-for="(location, index) in store.state.locations"
        :key="index"
        class="sort-list__item"
      >
        <button
          class="sort-list__button sort-list__button--dots"
        >
          <DotsIcon class="sort-list__button-icon" />
        </button>

        <span class="sort-list__location">
          {{ location.city }}
        </span>

        <button
          class="sort-list__button sort-list__button--delete"
          @click="deleteLocation(index)"
        >
          <TrashIcon class="sort-list__button-icon" />
        </button>
      </li>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease-out;
}

.list-leave-active {
  position: absolute;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.sort-list {
  &__list {
    margin: 0;
    padding: 5px;

    list-style-type: none;

    background-color: lightblue;
  }

  &__item {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;

    display: flex;
    align-items: center;

    margin-bottom: 5px;
    padding: 5px;

    color: white;
    border-radius: 5px;
    background-color: cornflowerblue;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__location {
    display: block;
  }

  &__button {
    $size: 24px;

    width: $size;
    height: $size;
    padding: 0;

    cursor: pointer;

    color: inherit;
    border: 0;
    background-color: transparent;

    &--delete {
      margin-left: auto;
    }

    &--dots {
      margin-right: 10px;
    }

    &--dots & {
      &-icon {
        transform: rotate(90deg);
      }
    }

    &-icon {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
