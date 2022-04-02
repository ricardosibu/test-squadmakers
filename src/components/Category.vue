<template>
    <div>
<div class="tabs is-centered is-large">
  <ul>
    <li :class="[ option === 'all' ? 'is-active': '']" @click="getOptionTab('all')"><a>All</a></li>
    <li :class="[ option === 'unknown' ? 'is-active': '']"
    @click="getOptionTab('unknown')"><a>Unknown</a></li>
    <li :class="[ option === 'male' ? 'is-active': '']"
    @click="getOptionTab('male')"><a>Male</a></li>
    <li :class="[ option === 'genderless' ? 'is-active': '']"
    @click="getOptionTab('genderless')"><a>Genderless</a></li>
  </ul>
</div>
    <div class="section" v-if="option === 'all'">
      <div class="container">
        <div class="is-flex is-flex-wrap-wrap">
          <Character v-for="character in characters" :key="character.id" :character=character />
        </div>
      </div>
    </div>
<div class="section" v-if="option === 'unknown'">
    <div class="container">
      <div class="is-flex is-flex-wrap-wrap">
        <Character v-for="character in characters"
        :key="character.id" :character=character />
      </div>
    </div>
</div>
<div class="section" v-if="option === 'male'">
    <div class="container">
      <div class="is-flex is-flex-wrap-wrap">
        <Character v-for="character in characters"
        :key="character.id" :character=character />
      </div>
    </div>
</div>
<div class="section" v-if="option === 'genderless'">
    <div class="container">
      <div class="is-flex is-flex-wrap-wrap">
        <Character v-for="character in characters"
        :key="character.id" :character=character />
      </div>
    </div>
</div>
  <nav class="pagination is-centered is-medium my-3" role="navigation" aria-label="pagination">
    <button class="button is-link"
      :disabled="actualPage <= 1"
      outlined
      @click="pagination('previous')">
      Previous</button>
    <button class="button is-link"
      :disabled="actualPage === pages"
      @click="pagination('next')">
      Next page</button>
</nav>
    </div>
</template>

<script>
import Character from '@/components/Character.vue';

export default {
  props: ['characters', 'pages'],
  components: {
    Character,
  },
  data() {
    return {
      option: 'all',
      actualPage: 1,
    };
  },
  created() {
    if (localStorage.getItem('filter_tab')) {
      this.option = localStorage.getItem('filter_tab');
      this.getOptionTab(this.option);
    } else {
      this.option = 'all';
    }
  },
  methods: {
    getOptionTab(option) {
      this.option = option;
      this.$emit('option-tab', { option: this.option });
      localStorage.setItem('filter_tab', this.option);
    },
    pagination(val) {
      console.log(this.actualPage);
      if (val === 'next') {
        if (this.actualPage > 0 || this.actualPage <= this.pages) {
          this.actualPage += 1;
        }
      } else if (this.actualPage > 0) {
        this.actualPage -= 1;
      }
      this.$emit('pagination', { page: this.actualPage });
      localStorage.setItem('page', this.actualPage);
    },
  },
};
</script>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
