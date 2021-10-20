<template>
  <div class="radiobtn-group" :style="cssProps">
    <label
        v-for="(el, index) in elements"
        :key="index"
        :class="['radiobtn-group__element', {selected: modelValue === el.value}]"
    >
      <radiobutton :value="el.value" :group="groupName" v-model="value"></radiobutton>
      {{el.text}}
    </label>
  </div>
</template>

<script lang="ts">
import radiobutton from "@/components/radiobutton.vue";
import {defineComponent, PropType} from "vue";
import {IRadiobtn} from "@/interfaces/radiobtn-interfaces";

export default defineComponent({
  name: "radiobtnGroup",
  components: {
    radiobutton
  },
  props: {
    modelValue: {
      type: String,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    elements: {
      type: Array as PropType<Array<IRadiobtn>>,
      required: true
    },
    groupName: {
      type: String,
      required: true
    }
  },
  data: () => ({
    value: '',
  }),
  created() {
    this.value = this.modelValue || '';
  },
  computed: {
    cssProps() {
      return {
        '--flex-direction': this.vertical ? 'column' : 'row'
      }
    }
  },
  watch: {
    value: function () {
      this.$emit('update:modelValue', this.value);
    },
    modelValue: function () {
      this.value = this.modelValue || '';
    }
  },
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;
.radiobtn-group {
  display: flex;
  flex-direction: var(--flex-direction);
  gap: 1.875em;
  align-items: center;

  &__element {
    display: flex;
    gap: 0.5em;
    align-items: center;
    cursor: pointer;
    font-size: 1.125em;
    font-weight: 400;

    &.selected {
      color: colors.$btn-active;
      font-weight: 500;
    }
  }

}
</style>