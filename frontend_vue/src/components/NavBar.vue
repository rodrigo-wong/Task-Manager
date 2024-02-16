<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Task Manager</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <AddTask :setReload="setReload" />
          </li>
          <li class="nav-item dropdown">
            <div
              v-if="user"
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Signed in as: {{ user.user.name }}
            </div>

            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" @click="logout" href="#">Log out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import AddTask from "./modals/AddTask.vue";

export default defineComponent({
  props: {
    setReload: Function,
  },
  components: {
    AddTask,
  },
  setup(props) {
    const user = ref(JSON.parse(localStorage.getItem("userInfo"))).value;
    const router = useRouter();

    const logout = async () => {
      try {
        await axios.post(
          `${process.env.VUE_APP_API_URL}/api/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        localStorage.clear();
        router.push("/");
      } catch (err) {
        console.error(err.message);
      }
    };

    return {
      user,
      logout,
    };
  },
});
</script>
