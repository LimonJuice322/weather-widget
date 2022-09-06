<script setup lang="ts">
import { WeatherInterface } from '@/interfaces';
import PressureIcon from '@/assets/icons/pressure.svg';
import HumidityIcon from '@/assets/icons/humidity.svg';
import WindIcon from '@/assets/icons/wind.svg';
import VisibilityIcon from '@/assets/icons/visibility.svg';

defineProps<{
  data: WeatherInterface,
}>();

function formatNumber(number: number) {
  return number.toLocaleString('ru-RU', { maximumFractionDigits: 0 })
}

function formatText(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
</script>

<template>
  <div class="location">
    <div class="location__geo">
      {{ data.location.city }}, {{ data.location.country }}
    </div>

    <div class="weather">
      <div class="weather__main">
        <div class="weather__icon">
          <img class="weather__image" :src="`http://openweathermap.org/img/wn/${data.main.icon}@2x.png`">
        </div>

        <div class="weather__temperature">
          {{ formatNumber(data.main.temp) }} °C
        </div>
      </div>

      <p class="weather__description">
        Feels like {{ formatNumber(data.main.feels_like) }} °C. {{ formatText(data.main.description) }}
      </p>

      <ul class="weather__list">
        <li class="weather__item">
          <div class="weather__feature">
            <WindIcon class="weather__feature-icon" />
            <span class="weather__feature-text">
              {{ data.info.wind }} m/s
            </span>
          </div>
        </li>

        <li class="weather__item">
          <div class="weather__feature">
            <HumidityIcon class="weather__feature-icon" />
            <span class="weather__feature-text">
              {{ data.info.humidity }} %
            </span>
          </div>
        </li>

        <li class="weather__item">
          <div class="weather__feature">
            <PressureIcon class="weather__feature-icon" />
            <span class="weather__feature-text">
              {{ data.info.pressure }} hPa
            </span>
          </div>
        </li>

        <li class="weather__item">
          <div class="weather__feature">
            <VisibilityIcon class="weather__feature-icon" />
            <span class="weather__feature-text">
              {{ formatNumber(data.info.visibility) }} m
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.location {
  padding: 12px;

  border: 2px solid lightgray;
  border-radius: 15px;

  &__geo {
    font-size: 21px;
    font-weight: 500;
    line-height: 1.5;

    margin-bottom: 5px;

    text-align: center;
  }
}

.weather {
  &__main {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 15px;
  }

  &__temperature {
    font-size: 36px;
    font-weight: 500;
    line-height: 1.5;
  }

  &__description {
    font-size: 21px;
    line-height: 1.5;

    margin-top: 0;
    margin-bottom: 15px;
  }

  &__list {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    margin: 0;
    padding: 0;

    list-style-type: none;
  }

  &__feature {
    font-size: 18px;
    line-height: 1.5;

    display: flex;
    align-items: center;

    &-icon {
      $size: 24px;

      width: $size;
      height: $size;
      margin-right: 8px;
    }

    &-text {
      font-weight: 500;
    }
  }
}
</style>
