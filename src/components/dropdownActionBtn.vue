<template>
  <button
      :class="['dropdown-action-btn', {disabled, secondary, loading, large}]"
      :disabled="disabled"
      @focus="showOptions"
      @click="toggleOptions"
      @blur="hideOptions"
      ref="btn"
  >
    <slot>

    </slot>
  </button>
  <div
      v-if="show"
      class="dropdown-action-btn__options"
  >
      <span
          class="dropdown-action-btn__option"

          v-for="option in options"
          :key="option.text"
          @mousedown="option.function"
      >
        <img
            v-if="option.imgPath"
            :src="require(`@/assets/${option.imgPath}`)"
            class="dropdown-action-btn__option-img"
        >
        <p>{{option.text}}</p>
      </span>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import {ITextFunction} from "@/interfaces/text-function-interfaces.ts";

export default defineComponent({
  name: "dropdownActionBtn",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    secondary : {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
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

p {
  margin: 0;
}

.dropdown-action-btn {
  position: relative;
  display: block;
  cursor: pointer;
  font-size: 1em;
  padding: 0.9375em 1.375em 1em 1.375em;
  background-color: colors.$active-btn;
  border-radius: 6px;
  outline: none;
  border: none;
  box-sizing: border-box;

  color: colors.$white;
  &.large {
    padding: 1.1875em 1.375em 1.2em 1.375em;
  }

  &.secondary {
    font-size: 0.875em;
    padding: 0.6875em 1.5625em 0.6875em 1.375em;
    &:hover {
      background-color: transparent;
      color: colors.$btn-hover;
      border: 1px solid colors.$btn-hover;
    }
    background-color: transparent;
    color: colors.$active-btn;
    border: 1px solid colors.$active-btn;

    &.disabled:hover {
      background-color: transparent;
      color: colors.$active-link;
      border: 1px solid colors.$active-link;
    }
  }
  &.loading {
    background-color: colors.$btn-inactive;
    color: colors.$btn-inactive;

    position: relative;

    &:hover {
      background-color: colors.$btn-inactive;
    }

    &:after {
      content: "";
      position: absolute;
      top: calc(50% - 0.75em);
      left: calc(50% - 0.75em);
      width: 1.5em;
      height: 1.5em;
      box-sizing: border-box;
      border: 4px solid transparent;
      border-top-color: colors.$white;
      border-radius: 50%;
      animation: button-loading-spinner 1s ease infinite;
    }
  }

  &:hover {
    background-color: colors.$btn-hover;
  }
  &.disabled {
    background-color: colors.$btn-inactive;
  }
  
  &__options {
    cursor: pointer;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    gap: 1px;
    background-color: colors.$bg-color;
    box-shadow: 0 2px 8px colors.$shadow-color;
    box-sizing: border-box;
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

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
