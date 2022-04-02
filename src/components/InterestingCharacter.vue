<template>
<div class="container my-2 mx-1">
    <div class="card py-2">
      <div class="columns">
        <div class="column">
          <p>{{interesting.name}}</p>
          <img :src="`${interesting.image}`" alt="" width="140">
        </div>
        <div class="column is-vcentered">
          <div class="content has-text-left my-0">
            <span class="is-size-7 my-0">{{ interesting.status }}</span> -
            <span class="is-size-7 my-0 ">{{ interesting.species }}</span>
            <p class="is-size-6 my-0 has-text-weight-bold">{{interesting.name }}</p>
          </div>
          <div class="content has-text-left my-0">
            <p class="is-size-7 my-0">Last known location</p>
            <p class="is-size-6 my-0 has-text-weight-bold">{{ interesting.location }}</p>
          </div>
          <div class="content has-text-left my-0">
            <p class="is-size-7 my-0">Firts seen in</p>
            <p class="is-size-6 my-0">Never Ricking Morty</p>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: ['interesting'],
  data() {
    return {
    };
  },
};
</script>

<style lang="css" scoped>
.content p {
    margin-bottom: 0;
}
.interesting {
    width: 460px;
}
</style>
