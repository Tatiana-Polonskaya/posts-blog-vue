<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible"> <PostForm /></my-dialog>
    <my-input v-model="searchQuery" v-focus placeholder="Поиск..." />
    <PostList :posts="searchedPosts" v-if="!isPostLoading" />
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import { usePosts } from "@/hooks/usePosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import useSortedPosts from "@/hooks/useSortedPosts";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },
  setup() {
    const { posts, isPostLoading, totalPage } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, searchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      searchedPosts,
      searchQuery,
      isPostLoading,
      selectedSort,
      totalPage,
    };
  },
};
</script>

<style>
.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.page {
  border: 1px solid black;
  padding: 5px 10px;
  cursor: pointer;
}
.current-page {
  border: 3px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
