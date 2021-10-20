<template>
  <button
      class="text-btn"
  >
    <slot>
    </slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "textBtn",
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;

.text-btn {
  cursor: pointer;

  border: none;
  font-size: 1em;
  color: colors.$active-link;
  background-color: transparent;
  outline: none;

  &:hover {
    color: colors.$btn-hover;
  }
  &:active, &:focus {
    color: colors.$btn-hover;
  }
}
</style>
