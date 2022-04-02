<template>
  <div class="container my-2 mx-1" style="cursor:pointer">
    <div class="card py-2" @click="findEpisodes()">
      <div class="columns">
        <div class="column">
          <img class="character-image" :src="`${character.image}`" alt="" width="140" />
        </div>
        <div class="column is-vcentered">
          <div class="content has-text-left my-0">
            <span class="is-size-7 my-0">{{ character.status }}</span> -
            <span class="is-size-7 my-0 ">{{ character.species }}</span>
            <p class="is-size-7 my-0 has-text-weight-bold">{{ character.name }}</p>
          </div>
          <div class="content has-text-left my-0">
            <p class="is-size-7 my-0">Last known location</p>
            <p class="is-size-7 my-0 has-text-weight-bold">{{ character.location }}</p>
          </div>
          <div class="content has-text-left my-0">
            <p class="is-size-7 my-0">Firts seen in</p>
            <p class="is-size-6 my-0">Never Ricking Morty</p>
          </div>
        </div>
      </div>
    </div>
    <CharacterDialog
      v-show="dialog"
      :character="character"
      :episode="episodeData"
      @close-dialog="closeDialog($event)"
    />
  </div>
</template>

<script>
import axios from 'axios';
import CharacterDialog from '@/components/CharacterDialog.vue';

export default {
  props: ['character'],
  components: {
    CharacterDialog,
  },
  data() {
    return {
      dialog: false,
      singleCharacter: [],
      episodeData: [],
      interestingCharacter: [],
    };
  },
  methods: {
    closeDialog($event) {
      this.dialog = $event.dialog;
    },
    findEpisodes() {
      this.dialog = true;
      this.interestingCharacter = [];
      this.episodeData = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const episodeUrl of this.character.episodes) {
        axios
          .get(episodeUrl)
          .then(({ data }) => {
            const specialCharacters = data.characters.slice(0, 3);
            // eslint-disable-next-line no-restricted-syntax
            for (const characterUrl of specialCharacters) {
              axios
                .get(characterUrl)
                .then(({
                  data: {
                    id, name, species, gender, status, image, origin, type,
                  },
                }) => {
                  this.interestingCharacter.push({
                    id,
                    name,
                    species,
                    gender,
                    status,
                    image,
                    location: origin.name,
                    type,
                  });
                })
                .catch((err) => err);
            }
            this.episodeData.push({
              airDate: data.air_date,
              episode: data.episode,
              name: data.name,
              interesting: this.interestingCharacter,
            });
          })
          .catch((err) => err);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  display: flex;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 170px;
  max-width: 300px;
  border-radius: 5px;
  flex-direction: column;
  flex: 0 1 300px;
  padding: 0;
  border: 0;
}
.character-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
}
.content p {
  margin-bottom: 0;
}
.character {
  width: 460px;
}
</style>
