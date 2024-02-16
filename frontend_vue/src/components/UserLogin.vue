<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Enter email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <div class="text-center">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
    <Toast position="bottom-center" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/login`, {
          email: email.value,
          password: password.value,
        });
        const data = JSON.stringify(res.data);
        localStorage.setItem('userInfo', data);
        router.push('/tasks');
      } catch (err) {
        toast.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Credentials do not match',
          life: 3000,
        });
        console.error((err as Error).message);
      }
    };

    return {
      email,
      password,
      handleSubmit,
    };
  },
});
</script>
