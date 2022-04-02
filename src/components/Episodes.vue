<template>
    <div>
    <div class="section">
        <div class="box-episodes">
            <p class="is-size-7 has-text-left">{{item.name}}</p>
            <p class="is-size-5 has-text-weight-semibold has-text-left px-2">{{item.episode}}</p>
            <p class="is-size-7 has-text-left px-2">{{item.airDate}}</p>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

<style lang="css" scoped>
.box-episodes {
  border: 2px solid gray;
  border-radius: 15px;
  padding: 1rem !important;
}
</style>
