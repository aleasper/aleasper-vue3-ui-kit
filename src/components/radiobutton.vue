<template>
  <label class="radiobutton">
    <input
        type="radio"
        class="radiobutton__native"
        :name="group"
        ref="radiobutton"

        @input="handleInput"
        :value="value"
        :checked="checked"
    >
    <label class="radiobutton__custom"></label>
  </label>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "radiobutton",
  props: {
    group: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    modelValue: {
      type: String as PropType<string>
    }
  },
  methods: {
    handleInput(e: Event) {
      const strValue = (e.target as HTMLInputElement).value;
      this.$emit('update:modelValue', strValue);
    }
  },
  computed: {
    checked: function () {
      return this.modelValue === this.value;
    }
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.radiobutton {
  position: relative;
  width: 1.25em;
  height: 1.25em;
  display: block;
  box-sizing: border-box;

  &__native {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    opacity: 0;
    top: 0;
    left: 0;
    width: 1.25em;
    height: 1.25em;
  }

  &__custom {
    cursor: pointer;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    display: block;
    border: none;
    background-color: colors.$bool-input-bg;
    box-sizing: border-box;

  }
  &__native:checked+&__custom {
    background-color: colors.$btn-active;
    border: 4px solid colors.$bool-input-bg;
  }
  &__native:hover:not(:checked)+&__custom {
    border: 1px solid colors.$btn-active;
  }
}
</style>