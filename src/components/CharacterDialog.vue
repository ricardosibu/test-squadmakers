/* eslint-disable no-restricted-syntax */
<template>
  <div class="modal is-active">
    <div class="modal-background">
      <div class="moda-content">
        <div class="modal-card">
          <header class="modal-card-head main">
            <p class="modal-card-title"></p>
            <div class="container">
              <figure class="image is-128x128 avatar">
                <img
                  class="is-rounded"
                  style="display: block; margin: 0 auto"
                  :src="`${character.image}`"
                />
              </figure>
            </div>
            <button class="delete" aria-label="close" @click="close()"></button>
          </header>
          <section></section>
          <section class="modal-card-body">
            <h2 class="is-size-4 has-text-left">Información</h2>
            <div class="columns">
              <div class="column is-one-third">
                <div class="box">
                  <p class="is-size-7 has-text-left">Gender</p>
                  <p class="is-size-6 has-text-weight-semibold has-text-left px-2">
                    {{ character.gender }}
                  </p>
                </div>
              </div>
              <div class="column is-one-third">
                <div class="box">
                  <p class="is-size-7 has-text-left">Origin:</p>
                  <p class="is-size-6 has-text-weight-semibold has-text-left px-2">
                    {{ character.location }}
                  </p>
                </div>
              </div>
              <div class="column is-one-third">
                <div class="box">
                  <p class="is-size-7 has-text-left">Type:</p>
                  <p class="is-size-6 has-text-weight-semibold has-text-left px-2">
                    {{ character.type ? character.type : "Unknown" }}
                  </p>
                </div>
              </div>
            </div>
            <hr style="border: 1px solid gray" />
            <div class="container">
              <h2 class="is-size-4 has-text-left">Episodios</h2>
              <div class="container">
                <div class="is-flex is-flex-wrap-wrap">
                  <Episodes v-for="item in episode" :key="item.id" :item="item" />
                </div>
              </div>
            </div>
            <hr style="border: 1px solid gray" />
            <div class="container">
              <h2 class="is-size-4 has-text-left">Personajes interesantes</h2>
              <div class="container">
                <div class="is-flex is-flex-wrap-wrap" v-for="(i, index) in episode" :key="index">
                  <InterestingCharacter
                    v-for="(interesting, index) in i.interesting"
                    :key="index"
                    :interesting="interesting"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Episodes from '@/components/Episodes.vue';
import InterestingCharacter from '@/components/InterestingCharacter.vue';

export default {
  props: ['character', 'episode'],
  components: {
    Episodes,
    InterestingCharacter,
  },
  data() {
    return {
      episodeData: [],
    };
  },
  methods: {
    close() {
      this.$emit('close-dialog', { dialog: false });
    },
  },
};
</script>

<style lang="css" scoped>
.main {
  background: url("../assets/images/rick-morty-banner.png");
}
.info {
  border-color: gray;
}
.box {
  border: 2px solid gray;
}
.avatar {
  padding-top: 68px;
  text-align: center;
}
</style>
