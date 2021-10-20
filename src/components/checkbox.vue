<template>
  <label class="checkbox">
    <input
        type="checkbox"
        class="checkbox__native"
        @input="handleInput"
        :value="modelValue"
        ref="checkbox"
    >
    <label class="checkbox__custom"></label>
  </label>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "checkbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(e: Event) {
      const strValue = (e.target as HTMLInputElement).value || (e.target as HTMLInputElement).getAttribute('value');
      const value = strValue === 'true';
      this.$emit('update:modelValue', !value);
    }
  },
  mounted() {
    (this.$refs['checkbox'] as HTMLInputElement).checked = this.modelValue;
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.checkbox {
  position: relative;
  width: 1em;
  height: 1em;
  display: block;

  &__native {
    position: absolute;
    z-index: 1;
    opacity: 0;
    top: 0;
    left: 0;
    width: 1em;
    height: 1em;
  }

  &__custom {
    width: 1em;
    height: 1em;
    border-radius: 4px;
    display: block;
    border: 1px solid colors.$checkbox-border;
    box-sizing: border-box;
  }
  &__native:checked+&__custom {
    background-image: url("../assets/checkbox_check.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-color: colors.$btn-active;
    padding: 0.25em 0.1875em 0.1875em 0.1875em;
    background-origin: content-box;
    border-color: colors.$btn-active;
  }
  &__native:not(:checked):hover+&__custom {
    border-color: colors.$btn-active;
  }
}
</style>