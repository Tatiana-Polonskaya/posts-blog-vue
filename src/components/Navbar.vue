<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="header">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')"> Посты </my-button>
      <my-button @click="$router.push('/about')">О сайте</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0px 15px;
}

.header {
  cursor: pointer;
}
.navbar__btns {
  margin-left: auto;
  display: flex;
  gap: 20px;
}
</style>
