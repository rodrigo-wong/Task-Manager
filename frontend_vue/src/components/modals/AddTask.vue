<template>
  <div>
    <button class="btn btn-success" @click="handleShow">Add Task +</button>

    <div
      v-if="show"
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button
              type="button"
              class="close"
              @click="handleClose"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        v-model="name"
                        type="text"
                        class="form-control"
                        id="name"
                        name="name"
                      />
                    </td>
                    <td>
                      <input
                        v-model="description"
                        type="text"
                        class="form-control"
                        id="description"
                        name="description"
                      />
                    </td>
                    <td>
                      <input
                        v-model="priority"
                        type="text"
                        class="form-control"
                        id="priority"
                        name="priority"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleClose"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="handleSubmit">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  props: {
    setReload: Function,
  },
  setup(props) {
    const show = ref(false);
    const name = ref("");
    const description = ref("");
    const priority = ref("");

    const handleClose = () => {
      show.value = false;
      clearFields();
    };

    const handleShow = () => {
      show.value = true;
    };

    const handleSubmit = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("userInfo") || "").token;
        await axios.post(
          `${process.env.VUE_APP_API_URL}/api/task`,
          {
            name: name.value,
            description: description.value,
            priority: priority.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (props.setReload) {
          props.setReload(true);
        }

        handleClose();
      } catch (err) {
        console.error((err as Error).message);

      }
    };

    const clearFields = () => {
      name.value = "";
      description.value = "";
      priority.value = "";
    };

    return {
      show,
      name,
      description,
      priority,
      handleClose,
      handleShow,
      handleSubmit,
    };
  },
});
</script>
