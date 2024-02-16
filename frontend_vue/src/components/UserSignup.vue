<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Enter Name"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          id="email"
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Enter email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
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
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const toast = useToast();

    const handleSubmit = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/api/register`, {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        const data = JSON.stringify(res.data);
        localStorage.setItem('userInfo', data);
        router.push('/tasks');
      } catch (err) {
        toast.add({ severity: 'error', summary: 'Registration Failed', detail: 'Invalid information provided', life: 3000 });
        console.error((err as Error).message);
      }
    };

    return {
      name,
      email,
      password,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
