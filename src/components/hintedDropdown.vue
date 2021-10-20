<template>
  <span
      :class="['hinted-dropdown']"
      :id="id"
  >
    <select
        :value="modelValue"
        :class="['hinted-dropdown__select-native', {filled, 'white-bg': whiteBg}]"
        @input="handleInput"
        :aria-labelledby="id"
        ref="select"
    >
      <option
          v-for="(option, i) in options"
          :key="i"
          :value="option['value']"
      >{{option['text']}}</option>
    </select>
    <button
        :class="['hinted-dropdown__select-custom', {filled, 'white-bg': whiteBg}]"
        :value="modelValue"
        @focus="focus"
        @blur="blur"
        aria-hidden="true"
        ref="select-custom-wrapper"
    >{{selectedOptionText}}</button>
    <span
        :class="['hinted-dropdown__arrow', {'hinted-dropdown__arrow-down': !open, 'hinted-dropdown__arrow-up': open}]"
    ></span>
    <span
        :class="['hinted-dropdown__hint']"
    >
      {{ hint }}
    </span>
    <div
        v-if="open"
        class="hinted-dropdown__select-custom__options-wrapper"
    >
      <div
          v-for="(option, i) in options"
          :key="i"
          :value="option['value']"
          @mousedown="handleInput"
          class="hinted-dropdown__select-custom__option"
      >{{option['text']}}</div>
    </div>
  </span>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {IbtnElement} from "@/interfaces/common-interfaces";

export default defineComponent({
  name: "hintedDropdown",
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: String
    },
    hint: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array as PropType<Array<IbtnElement>>,
      required: true,
    },
    whiteBg: {
      type: Boolean,
      default: false
    },
  },
  data: () => {
    return {
      open: false,
    }
  },
  methods: {
    handleInput(e: Event) {
      const value =  (e.target as HTMLInputElement).value || (e.target as HTMLInputElement).getAttribute('value')
      this.$emit('update:modelValue', value);
      this.$emit('change', value);
    },
    focus() {
      this.open = true;
    },
    blur() {
      this.open = false;
    },
  },
  computed: {
    filled: function () {
      return !!this.modelValue && this.modelValue.length !== 0;
    },
    selectedOptionText: function () {
      const option = this.options.find(el => el.value.toString() === this.modelValue?.toString()) as IbtnElement;
      return option?.text;
    }
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
select {
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;
}
.hinted-dropdown {
  width: 100%;
  position: relative;
  display: block;
  height: 3.1875em;
  box-sizing: border-box;

  border: none;
  outline: none;
  &__select-native, &__select-custom {

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
    text-align: left;

    cursor: pointer;

    &.white-bg {
      background-color: colors.$white;
      &:hover, &:focus, &:focus:hover {
        background-color: colors.$white;
      }
    }

    &:focus {
      background-color: colors.$white;
      border: 1px solid colors.$input-border;
      border-radius: 6px;
      outline: none;
      padding-left: calc(0.9375em - 1px);
    }
    &:focus ~ .hinted-dropdown__hint {
      font-size: 0.8125em;
      left: 1em;
      top: 0.375em;
      &.large {
        top: 0.625em;
      }
    }
    &.filled ~ .hinted-dropdown__hint {
      font-size: 0.8125em;
      left: 1em;
      top: 0.375em;

    }
    &:hover {
      background-color: colors.$input-bg-hover;
    }
    &:hover:focus {
      background-color: colors.$white;
    }
  }
  &__select-custom {
    position: absolute;
    top: 0;
    left: 0;
    display: none;

    &__options-wrapper {
      box-sizing: border-box;
      display: none;
      position: absolute;
      top: calc(3.1875em + 0.1875em);
      width: 100%;
      background: colors.$white;
      border-radius: 4px;
      border: 1px solid colors.$table-header;
      padding: 0.5em 0;
      max-height: 16.25em;
      overflow: auto;
      z-index: 1;

      &::-webkit-scrollbar {
        width: 4px;
      }
    }

    &__option {
      padding: 0.75em 0.875em;
      text-align: left;
      font-weight: 400;
      color: colors.$black-text;

      &:hover {
        background-color: colors.$icon-bg;
      }
    }
  }
  &__hint {
    color: colors.$third-text;
    position: absolute;
    top: 0.9375em;
    left: 1em;
    transition: all ease 0.2s;
    pointer-events: none;
  }
  @media (hover: hover) {
    .hinted-dropdown__select-custom {
      display: block;

      &__options-wrapper {
        display: block;
      }
    }
  }
  @media (hover: hover) {
    .hinted-dropdown__select-native:focus + .hinted-dropdown__select-custom {
      display: none;
    }
  }

  &__arrow {
    pointer-events: none;
    background-image: url("../assets/arrow_down.svg");
    background-size: cover;
    background-repeat: no-repeat;
    width: 1.5em;
    height: 1.5em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.9375em;
    &-up {
      transform: rotate(180deg) translateY(50%);
    }
    &-down {

    }
  }

}
</style>
