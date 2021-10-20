<template>
  <label
      :class="['hinted-input', {large}]"
  >
    <input
        :type="passwordInput ? 'password': 'text'"
        :value="modelValue"
        :class="['hinted-input__input', {
          filled, large, helped: help, 'error': (error || !validated) && filled, 'white-bg': whiteBg, 'with-icon': icon
          }, disabled]"
        :disabled="disabled"
        @input="handleInput"

        :autocomplete="passwordInput ? 'current-password' : 'on'"
        ref="input"
    >
    <img
        v-if="icon"
        class="hinted-input__icon"
        :src="require(`@/assets/${icon}`)"
    >
    <span
        :class="['hinted-input__hint', {large}]"
    >
      {{ hint }}
    </span>
    <span
        v-if="help"
        class="hinted-input__help-sign"
        :help-str="helpText"
    ></span>
  </label>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "hintedInput",
  props: {
    modelValue: {
      type: String
    },
    hint: {
      type: String,
      default: ''
    },
    passwordInput: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    error: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false,
    },
    help: {
      type: Boolean,
      default: false,
    },
    helpText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    whiteBg: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
    }
  },
  data: () => {
    return {

    }
  },
  methods: {
    handleInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      this.$emit('change', (e.target as HTMLInputElement).value);
    }
  },
  computed: {
    filled: function () {
      return !!this.modelValue && this.modelValue.length !== 0;
    },
    validated: function () {
      if (this.rules.length === 0 || !this.modelValue) return true;
      for (let rule of this.rules) {
        const re = new RegExp(rule as string);
        if (this.modelValue && this.modelValue.match(re)) {
          return true;
        }
      }
      return false;
    }
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;

.hinted-input {
  width: 100%;
  position: relative;
  display: block;
  height: 3.1875em;
  box-sizing: border-box;

  border: none;
  outline: none;
  //overflow: hidden;

  &.large {
    height: 3.6875em;
  }

  &__input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 1em;
    color: colors.$black-text;
    padding: 1.5625em 0.9375em 0.375em 0.9375em;
    border: none;
    border-radius: 6px;
    outline: none;
    background-color: colors.$input-bg;
    &.with-icon {
      padding-right: calc(0.375em + 0.9375em + 1.5em);
    }
    &.helped {
      padding-right: calc(0.9375em + 0.9375em + 0.75em);
    }
    &.large {
      padding: 1.8125em 0.9375em 0.625em 0.9375em;
    }
    &.white-bg {
      background-color: colors.$white;
      &:hover, &:focus, &:focus:hover {
        background-color: colors.$white;
      }
    }

    &:focus {
      background-color: transparent;
      border: 1px solid colors.$input-border;
      border-radius: 6px;
      outline: none;
      padding-left: calc(0.9375em - 1px);
    }
    &:focus ~ .hinted-input__hint {
      font-size: 0.8125em;
      left: 1em;
      top: 0.375em;
      &.large {
        top: 0.625em;
      }
    }
    &.filled ~ .hinted-input__hint {
      font-size: 0.8125em;
      left: 1em;
      top: 0.375em;

      &.large {
        top: 0.625em;
      }
    }
    &:hover {
      background-color: colors.$input-bg-hover;
    }
    &:hover:focus {
      background-color: transparent;
    }

    &.error {
      background-color: colors.$input-bg-error;

      &:hover, &:focus {
        background-color: colors.$input-bg-error;
      }
    }

    &.disabled {
      background-color: colors.$input-bg-disabled;
    }
  }

  &__hint {
    color: colors.$third-text;
    position: absolute;
    top: 0.9375em;
    left: 1em;
    transition: all ease 0.2s;
  }
  &__hint.large {
    top: 1.1875em;
  }

  &__help-sign {
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    top: 50%;
    right: 0.9375em;
    transform: translateY(-50%);
    background-image: url("../assets/help.svg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  &__help-sign:hover:after {
    content: attr(help-str) "";
    text-align: left;
    width: 15em;
    position: absolute;
    color: colors.$white-lite-text;
    background-color: colors.$black;
    bottom: 2em;
    right: -0.5em;
    border-radius: 6px;
    opacity: 0.9;

    padding: 0.75em 1em;
  }
  &__help-sign:hover:before {
    content: "";
    width: 0.75em;
    height: 0.75em;
    position: absolute;
    color: colors.$white-lite-text;
    background-color: colors.$black;
    opacity: 0.9;
    right: 0.5em;
    bottom: calc(2em - 0.75em / 2);
    transform: rotate(45deg);
  }

  &__icon {
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    top: 0.8125em;
    right: 0.9375em;
  }
}
</style>
