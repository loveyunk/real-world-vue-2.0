<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" v-bind="$attrs" v-on="listeners">
      <option disabled selected value> -- select an option -- </option>
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>
<script>
import { formFieldMixin } from '@/mixins/formFieldMixin';
export default {
  mixins: [formFieldMixin],
  model: {
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        change: this.updateValue
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('change', event.target.value);
    }
  }
};
</script>
