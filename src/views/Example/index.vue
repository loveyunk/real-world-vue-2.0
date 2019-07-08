<template>
  <div>
    <BaseSelect label="test" v-model="foo" :options="['a', 'b', 'c']"></BaseSelect>
    {{ foo }}
    <BaseInput v-model="bar" />
    {{ bar }}
    <button>Press Me</button>
  </div>
</template>

<script>
import BaseSelect from '@/components/BaseSelect/index.vue';
import BaseInput from '@/components/BaseInput/index.vue';
export default {
  components: {
    BaseSelect,
    BaseInput
  },
  data() {
    return {
      foo: '',
      bar: ''
    };
  },
  methods: {
    update(v) {
      console.log(v);
    }
  }
};
</script>
