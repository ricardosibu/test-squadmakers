<template>
  <div class="home">
    <Header />
    <div class="section">
      <div class="container">
        <p class="subtitle">
          <input class="input is-medium" type="text" placeholder="Ingrese un nombre de personaje"
            v-model="name" @input="filterCharacterByName()">
        </p>
      </div>
    </div>
    <div class="container">
      <Category
      :characters="characters"
      @option-tab="getOption($event)"
      :pages=pages
      @pagination="getCharacterByPage($event)" />
      <pulse-loader :loading="loading"></pulse-loader>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Header from '@/components/Header.vue';
import Category from '@/components/Category.vue';
import API_URL from '../utils/constants';

export default {
  name: 'Home',
  components: {
    Header,
    Category,
    PulseLoader,
  },
  data() {
    return {
      characters: [],
      episodeName: '',
      option: '',
      name: '',
      pages: 0,
      actualPage: 1,
      loading: false,
    };
  },
  created() {
    this.option = localStorage.getItem('filter_tab');
    this.getCharacters();
  },
  watch: {
    option(val) {
      if (val) this.getCharacters();
    },
  },
  methods: {
    getOption($event) {
      this.option = $event.option;
      this.getCharacters();
    },
    async getCharacters() {
      this.loading = true;
      const randomCharacter = Array(100).fill().map(() => Math.round(Math.random() * 100));
      let url = '';
      // eslint-disable-next-line default-case
      switch (this.option) {
        case 'unknown':
          url = `${API_URL}/character/?gender=unknown`;
          break;
        case 'male':
          url = `${API_URL}/character/?gender=male`;
          break;
        case 'genderless':
          url = `${API_URL}/character/?gender=genderless`;
          break;
        default:
          url = `${API_URL}/character/${randomCharacter}`;
          break;
      }
      const response = await axios.get(url);
      if (response.data.results) {
        const { results, info } = response.data;
        this.pages = info.pages ? info.pages : 1;
        this.characters = results.map((item, index) => ({
          id: index,
          name: item.name,
          species: item.species,
          gender: item.gender,
          status: item.status,
          image: item.image,
          location: item.origin.name,
          type: item.type,
          episodes: item.episode,
          episode_name: this.getEpisode(item.episode[0]),
        }));
      } else {
        const { data } = response;
        this.pages = 1;
        this.characters = data.map((item, index) => ({
          id: index,
          name: item.name,
          species: item.species,
          gender: item.gender,
          status: item.status,
          image: item.image,
          location: item.origin.name,
          type: item.type,
          episodes: item.episode,
          episode_name: this.getEpisode(item.episode[0]),
        }));
      }
      this.loading = false;
    },
    getEpisode(episodeUrl) {
      const url = `${episodeUrl}`;
      axios.get(url)
        .then(({ data }) => {
          const { episode } = data;
          return episode;
        })
        .catch((err) => err);
    },
    async filterCharacterByName() {
      if (this.name.length > 5) {
        this.loading = true;
        this.characters = [];
        const url = `${API_URL}/character?name=${this.name}`;
        const response = await axios.get(url);
        const { results } = response.data;
        this.characters = results.map((item, index) => ({
          id: index,
          name: item.name,
          species: item.species,
          gender: item.gender,
          status: item.status,
          image: item.image,
          location: item.origin.name,
          type: item.type,
          episodes: item.episode,
          episode_name: this.getEpisode(item.episode[0]),
        }));
        this.loading = false;
      } else {
        this.getCharacters();
      }
    },
    async getCharacterByPage($event) {
      this.loading = true;
      this.actualPage = $event.page;
      const url = `${API_URL}/character?page=${this.actualPage}`;
      const response = await axios.get(url);
      const { results } = response.data;
      this.characters = results.map((item, index) => ({
        id: index,
        name: item.name,
        species: item.species,
        gender: item.gender,
        status: item.status,
        image: item.image,
        location: item.origin.name,
        type: item.type,
        episodes: item.episode,
        episode_name: this.getEpisode(item.episode[0]),
      }));
      this.loading = false;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
