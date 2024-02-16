<template>
  <div>
    <NavBar :setReload="setReload" />
    <TasksTable :tasks="tasks" :handleDelete="handleDelete" :setReload="setReload" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import NavBar from '../components/NavBar.vue';
import TasksTable from '../components/TasksTable.vue';

export default defineComponent({
  components: {
    NavBar,
    TasksTable,
  },
  setup() {
    const tasks = ref([]);
    const reload = ref(false);
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const handleDelete = async (task: any) => {
      try {
        await axios.delete(`${process.env.VUE_APP_API_URL}/api/task/${task.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setReload(true);
      } catch (err) {
        console.error((err as Error).message);

      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/api/task`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        tasks.value = response.data.tasks;
      } catch (err) {
        console.error((err as Error).message);
      }
    };
    const setReload = (value: boolean) => {
      reload.value = value;
    };

    onMounted(() => {
      if (!user) {
        router.push('/');
      } else {
        fetchData();
      }
    });

    watch(reload, (newValue) => {
      if (newValue) {
        fetchData();
        reload.value = false;
      }
    });

    return {
      tasks,
      handleDelete,
      setReload,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
