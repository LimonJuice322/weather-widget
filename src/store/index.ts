import { createStore } from 'vuex';
import { LocationInterface, WeatherInterface } from '@/interfaces';

interface Store {
  locations: Array<any>,
  weather: Array<any>,
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
    SET_LOCATIONS(state, payload: string) {
      state.locations.push(payload);
    },
    SET_WEATHER(state, payload: WeatherInterface) {
      state.weather.push(payload);
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
        commit('SET_LOCATIONS', ...locations);
      }
    },
    saveData({ commit }, data) {
      localStorage.setItem('userLocations', JSON.stringify(data));
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

          let weather = await dispatch('getWeather', location);

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
            let weather = await dispatch('getWeather', location);

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
