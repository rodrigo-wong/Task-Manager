<template>
  <div>
    <div class="container mt-5 w-50">
      <img class="text-center mb-3" src="../assets/TaskManager_logo.png" style="width: 25% ;"/>
      <ul class="nav nav-tabs justify-content-center mb-3">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'signup' }"
            href="#"
            @click.prevent="activeTab = 'signup'"
          >Sign up</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'login' }"
            href="#"
            @click.prevent="activeTab = 'login'"
          >Log in</a>
        </li>
      </ul>
      <div class="tab-content">
        <div v-if="activeTab === 'signup'">
          <UserSignup />
        </div>
        <div v-if="activeTab === 'login'">
          <UserLogin />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserSignup from '../components/UserSignup.vue';
import UserLogin from '../components/UserLogin.vue';

export default defineComponent({
  components: {
    UserSignup,
    UserLogin,
  },
  setup() {
    const router = useRouter();
    const activeTab = ref('signup');

    onMounted(() => {
      if (localStorage.getItem('userInfo')) {
        router.push('/tasks');
      }
    });

    return {
      activeTab,
    };
  },
});
</script>
