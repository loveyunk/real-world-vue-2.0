<template>
  <div>
    <h1>创建活动</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="类别"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          必填
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="标题"
        v-model="event.title"
        type="text"
        placeholder="标题"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          必填
        </p>
      </template>

      <BaseInput
        label="详情"
        v-model="event.description"
        type="text"
        placeholder="详情"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />

      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          必填
        </p>
      </template>

      <h3>活动地点？</h3>
      <BaseInput
        label="地点"
        v-model="event.location"
        type="text"
        placeholder="地点"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          必填
        </p>
      </template>

      <h3>活动时间?</h3>
      <div class="field">
        <label>日期</label>
        <datepicker
          v-model="event.date"
          placeholder="请选择日期"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          必选
        </p>
      </template>

      <BaseSelect
        label="请选择时间"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          必选
        </p>
      </template>

      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>

      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton/index.vue';
import BaseInput from '@/components/BaseInput/index.vue';
import BaseSelect from '@/components/BaseSelect/index.vue';
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'EventCreate',
  components: {
    Datepicker,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      };
    }
  }
};
</script>
