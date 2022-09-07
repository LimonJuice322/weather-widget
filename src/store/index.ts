import { createStore } from 'vuex';
import { LocationInterface, WeatherInterface, SwapLocations } from '@/interfaces';

interface Store {
  locations: Array<LocationInterface>,
  weather: Array<WeatherInterface>,
  error: boolean,
  loading: boolean,
}

export default createStore<Store>({
  state: {
    locations: [],
    weather: [],
    error: false,
    loading: false,
  },
  getters: {
  },
  mutations: {
    SET_LOCATIONS(state, payload: LocationInterface) {
      state.locations.push(payload);
    },
    DELETE_LOCATION(state, payload: number) {
      state.locations.splice(payload, 1);
    },
    SET_WEATHER(state, payload: WeatherInterface) {
      state.weather.push(payload);
    },
    SWAP_WEATHER(state, payload: SwapLocations) {
      let { oldIndex, newIndex } = payload;

      let weather = state.weather[oldIndex];
      state.weather[oldIndex] = state.weather[newIndex];
      state.weather[newIndex] = weather;
    },
    DELETE_WEATHER(state, payload: number) {
      state.weather.splice(payload, 1);
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERROR(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    getData({ commit }) {
      if (localStorage.getItem('userLocations')) {
        let locations = JSON.parse(localStorage.getItem('userLocations')!);

        for (let location of locations) {
          commit('SET_LOCATIONS', location);
        }
      }
    },
    saveData({ state }) {
      localStorage.setItem('userLocations', JSON.stringify(state.locations));
    },
    async getUserLocation({ commit, dispatch, state }) {
      dispatch('getData');

      if (!state.locations.length) {
        try {
          commit('SET_LOADING', true);

          let response = await fetch('https://ipinfo.io/json?token=268b16fd892a46');
          let { city, country } = await response.json();
          let location: LocationInterface = {
            city,
            country,
          }

          commit('SET_LOCATIONS', location);
          dispatch('saveData', state.locations);

          const weather = await dispatch('getWeather', location);

          commit('SET_WEATHER', weather);
        } catch(e) {
          console.log(e);
          commit('SET_ERROR', true);
        } finally {
          commit('SET_LOADING', false);
        }
      } else {
        try {
          commit('SET_LOADING', true);

          for (let location of state.locations) {
            const weather = await dispatch('getWeather', location);

            commit('SET_WEATHER', weather);
          }
        } catch(e) {
          console.log(e);
          commit('SET_ERROR', true);
        } finally {
          commit('SET_LOADING', false);
        }
      }
    },
    async getWeather({ commit }, { city, country }) {
      try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&id=524901&appid=c6fa77b8ad28fa4cfaed09dcca269e7c`);

        let data = await response.json();

        if (data.sys.country !== country) {
          return;
        }

        let weather: WeatherInterface = {
          main: {
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
          },
          info: {
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            visibility: data.visibility,
          },
          location: {
            city: data.name,
            country: data.sys.country
          }
        }

        return weather;
      } catch(e) {
        console.log(e);
        commit('SET_ERROR', true);
      }
    }
  },
})
