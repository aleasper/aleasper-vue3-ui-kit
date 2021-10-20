<template>
  <button class="link-btn">
    <slot>

    </slot>
  </button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "linkButton"
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.link-btn {
  border: none;
  outline: none;
  background: transparent;
  color: colors.$active-link;
  cursor: pointer;

  &:hover {

  }
}
</style>