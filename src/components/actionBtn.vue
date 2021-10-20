<template>
  <button
      :class="['action-btn', {disabled, secondary, loading, large, bordered}]"
      :disabled="disabled"
      @mouseover="hover = true" @mouseleave="hover = false"
  >
    <img
        v-if="image && !hover"
        class="action-btn__img"
        :src="require(`@/assets/${image}`)"
    >
    <img
        v-if="hoverImage && hover"
        class="action-btn__img"
        :src="require(`@/assets/${hoverImage}`)"
    >
    <slot>

    </slot>
  </button>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "actionBtn",
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
    bordered: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
    },
    hoverImage: {
      type: String
    }
  },
  data: () => ({
    hover: false,
  })
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;

.action-btn {
  white-space: nowrap;
  display: flex;
  gap: 0.5em;
  justify-content: center;
  align-items: center;
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
    &:hover {
      background-color: colors.$btn-hover;
      color: colors.$white;
    }
    background-color: colors.$input-bg;
    color: colors.$active-link;

    &.disabled:hover {
      background-color: colors.$btn-inactive;
      color: colors.$active-link;
    }
  }
  &.bordered {
    padding: 0.6875em 1.375em;
    background-color: transparent;
    color: colors.$btn-active;
    border: 1px solid colors.$btn-active;
    &:hover {
      background-color: colors.$btn-hover;
      color: colors.$white;
    }
    &.disabled:hover {
      background-color: colors.$btn-inactive;
      color: colors.$active-link;
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
