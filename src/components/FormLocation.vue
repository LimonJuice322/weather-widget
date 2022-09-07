<script setup lang="ts">
import { ref, reactive } from 'vue';
import { LocationInterface } from '@/interfaces';
import EnterIcon from '@/assets/icons/enter.svg';
import { useStore } from 'vuex';

const store = useStore();

const form: LocationInterface = reactive({
  city: '',
  country: '',
});

const formIsInvalid = ref(false);
const formIsDirty = ref(false);
const message = ref('');

const formValid = reactive({
  city: true,
  country: true,
})

function submitForm() {
  formIsDirty.value = true;

  const location: LocationInterface = {
    city: form.city,
    country: form.country,
  };

  const locationInArray = store.state.locations.filter((loc: LocationInterface) => loc.city === location.city && loc.country === location.country).length;

  switch(true) {
    case location.country === '' && location.city === '':
      formIsInvalid.value = true;
      formValid.country = false;
      formValid.city = false;
      message.value = 'Enter country code and city';
      break;
    case location.city === '':
      formIsInvalid.value = true;
      formValid.city = false;
      message.value = 'Enter city';
      break;
    case location.country === '':
      formIsInvalid.value = true;
      formValid.country = false;
      message.value = 'Enter country code';
      break;
    case locationInArray !== 0:
      formIsInvalid.value = true;
      formValid.country = true;
      formValid.city = true;
      message.value = 'The city is already been tracking';
      break;
    default:
      addLocation(location);
  }
}

async function addLocation(location: LocationInterface) {
  try {
    const weather = await store.dispatch('getWeather', location);

    if (weather) {
      await store.commit('SET_LOCATIONS', location);
      await store.commit('SET_WEATHER', weather);
      await store.dispatch('saveData');

      formIsInvalid.value = false;
      formIsDirty.value = false;

      form.city = '';
      form.country = '';
    } else {
      if (!formIsDirty.value) {
        formIsDirty.value = true;
      }

      formIsInvalid.value = true;
      message.value = 'City not found';
    }
  } catch(e) {
    console.log(e);
  }
}
</script>

<template>
  <form
    class="form"
    @submit.prevent="submitForm"
  >
    <div class="form__box">
      <ul class="form__list">
        <li class="form__item">
            <label
              class="form__label"
              for="cityName"
            >
              City:
            </label>

            <input
              id="cityName"
              class="form__input"
              :class="{'form__input--invalid': !formValid.city && formIsDirty}"
              v-model="form.city"
            >
        </li>

        <li class="form__item">
          <label
            class="form__label"
            for="countryCode"
          >
            Country Code:
          </label>

          <input
            id="countryCode"
            class="form__input"
            :class="{'form__input--invalid': !formValid.country && formIsDirty}"
            v-model="form.country"
          >
        </li>
      </ul>

      <button
        type="submit"
        class="form__button"
      >
        <EnterIcon class="form__button-icon" />
      </button>
    </div>

    <p
      v-if="formIsDirty && (!formValid.country || !formValid.city || formIsInvalid)"
      class="form__message"
    >
      {{ message }}
    </p>
  </form>
</template>

<style lang="scss" scoped>
.form {
  &__box {
    display: flex;
    align-items: center;
  }

  &__list {
    margin: 0;
    padding: 0;

    list-style-type: none;
  }

  &__item {
    display: flex;
    align-items: center;

    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;

    flex-shrink: 0;

    margin-right: 10px;
  }

  &__input {
    width: 100%;
    padding: 8px;

    border: 1px solid lightgray;

    &:focus {
      outline: 1px solid lightblue;
    }

    &--invalid {
      border-color: lightcoral;

      &:focus {
        outline-color: lightcoral
      }
    }
  }

  &__button {
    $size: 24px;

    width: $size;
    height: $size;
    margin-left: 10px;
    padding: 0;

    cursor: pointer;

    border: 0;
    background-color: transparent;

    &-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__message {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;

    margin-top: 5px;
    margin-bottom: 0;

    color: lightcoral;
  }
}
</style>
