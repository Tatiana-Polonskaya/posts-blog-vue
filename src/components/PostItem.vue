<template>
  <div class="post">
    <div>
      <div>
        <strong>Номер:</strong>
        {{ post.id }}
      </div>
      <div>
        <strong>Название:</strong>
        {{ post.title }}
      </div>
      <div>
        <strong>Описание:</strong>
        {{ post.body }}
      </div>
    </div>
    <div class="post__btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.post {
  padding: 15px;
  border: 3px solid green;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__btns {
  display: flex;
  gap: 10px;
}
</style>
