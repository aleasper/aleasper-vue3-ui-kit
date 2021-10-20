<template>
  <button
      class="more-options-btn"
      @focus="showOptions"
      @click="toggleOptions"
      @blur="hideOptions"
  ></button>
  <div
      v-if="show"
      class="more-options-btn__options"
  >
      <span
          class="more-options-btn__option"

          v-for="option in options"
          :key="option.text"
          @mousedown="option.function"
      >
        <img
            v-if="option.imgPath"
            :src="require(`@/assets/${option.imgPath}`)"
            class="more-options-btn__option-img"
        >
        <p>{{option.text}}</p>
      </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ITextFunction} from "@/interfaces/text-function-interfaces";

export default defineComponent({
  name: "moreOptionsBtn",
  props: {
    options: {
      type: Array as PropType<Array<ITextFunction>>,
      default: () => []
    }
  },
  data: () => ({
    show: false,
    focus: false
  }),
  methods: {
    showOptions() {
      this.focus = true;
    },
    hideOptions() {
      this.show = false;
      this.focus = false;
    },
    toggleOptions() {
      if (this.show) {
        (document.activeElement as HTMLElement).blur()
      } else {
        this.show = true;
      }
    }
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.more-options-btn {
  height: 1.5em;
  width: 1.5em;
  background-repeat: no-repeat;
  background-image: url("../assets/more_options.svg");
  background-color: transparent;
  border: none;
  outline: none;
  position: relative;
  display: block;
  cursor: pointer;

  color: colors.$white;

  &__options {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    gap: 1px;
    background-color: colors.$bg-color;
    top: calc(100% + 0.75em);
    right: 0;
    box-shadow: 0 2px 8px colors.$shadow-color;
    box-sizing: border-box;

    p {
      margin: 0;
    }

    &:before {
      content: "";
      width: 0.75em;
      height: 0.75em;
      position: absolute;
      background-color: colors.$white;
      top: calc(-0.75em / 2);
      right: 1.5em;
      bottom: calc(2em - 0.75em / 2);
      transform: rotate(45deg);
    }
  }

  &__option {
    width: 100%;
    background-color: colors.$white;
    text-align: left;
    padding: 0.875em 1.125em 0.875em 0.875em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75em;
  }

  &__option-img{
    width: 0.875em;
    height: 0.875em;
  }
}
</style>