<template>
  <form @submit.prevent>
    <h3>Создать новый пост</h3>
    <my-input v-model="post.title" placeholder="Название" />
    <my-input v-model="post.body" placeholder="Описание" />
    <my-button @click="createPost" style="align-self: flex-end"
      >Создать</my-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit("create", this.post);
      this.post = {
        title: "",
        post: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  gap: 15px;
}
</style>
