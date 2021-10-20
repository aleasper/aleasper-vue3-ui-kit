<template>
  <div class="tab-btns">
    <div class="tab-btns__btns-wrapper">
      <button
          v-for="(btn, index) in btns"
          :key="index"
          :class="['tab-btns__btn', {'selected': selectedIndex === index}]"
          :disabled="disabled"
          @click="selectTab(btn, index)"
      >
        <slot
            :text="btn.text"
        >
          {{btn.text ? btn.text : index}}
        </slot>
      </button>
    </div>
    <span class="tab-btns__underline"></span>
  </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import {IbtnElement} from "@/interfaces/common-interfaces.ts";

export default defineComponent({
  name: "tabBtns",
  props: {
    btns: {
      type: Array as PropType<Array<IbtnElement>>,
      required: true,
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      selectedIndex: null  as number | null
    }
  },
  created() {
    this.selectedIndex = this.defaultIndex;
  },
  methods: {
    selectTab(btn: {[key: string]: any; }, index: number) {
      this.selectedIndex = index;
      this.$emit('select-btn', btn);
    }
  }
});
</script>

<style scoped lang="scss">
@use "src/consts/colors" as colors;

.tab-btns {
  width: fit-content;
  width: -moz-fit-content;

  &__btns-wrapper {
    display: flex;
    flex-direction: row;
    gap: 1.8125em;
  }
  &__btn {
    border: none;
    background: transparent;
    font-weight: 600;
    cursor: pointer;
    position: relative;

    &.selected {
      position: relative;
      color: colors.$black-text;
    }

    &::after {
      pointer-events: all;
      content: " ";
      width: 100%;
      left: 0;
      height: 3px;
      background: colors.$active-btn;
      position: absolute;
      bottom: -0.5em;
      transform: translateY(50%);
      transition: all 0.4s;
      opacity: 0;
      visibility: hidden;
    }
    &.selected::after {
      visibility: visible;
      opacity: 100;
    }

    &:before {
      content: "";
      position: absolute;
      padding: 1.2em 0.2em;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 100%;
    }
  }
  &__underline {
    display: block;
    height: 1px;
    width: 100%;
    background-color: colors.$table-header-gray;
    margin: 0.5em 0 0 0;
  }
}
</style>
