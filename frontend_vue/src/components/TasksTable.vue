<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.priority }}</td>
          <td class='d-flex justify-content-center'>
            <EditTask :task="task" :setReload="setReload" />
            <button @click="handleDelete(task)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EditTask from './modals/EditTask.vue';

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    setReload: {
      type: Function,
      required: true,
    },
    handleDelete: {
      type: Function,
      required: true,
    },
  },
  components: {
    EditTask,
  },
};
</script>
