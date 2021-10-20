<template>
  <button
      class="round-close-btn"
  ></button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "roundCloseBtn"
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.round-close-btn {
  cursor: pointer;
  width: 1.875em;
  height: 1.875em;
  border-radius: 50%;
  background-color: colors.$input-bg;
  background-image: url("../assets/cross_default.svg");
  background-size: 0.75em;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}
.round-close-btn:hover {
  background-color: colors.$input-bg-hover;
  background-image: url("../assets/cross_hover.svg");
}

</style>