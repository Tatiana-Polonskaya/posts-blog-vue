<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
        :model-value="selectedSort"
        :options="sortOptions"
        @update:model-value="setSelectedSort"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost"
    /></my-dialog>
    <my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      v-focus
      placeholder="Поиск..."
    />
    <PostList
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePost" class="observer"></div>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
      setLoading: "post/setLoading",
    }),
    ...mapActions({
      loadMorePost: "post/loadMorePost",
      fetchPosts: "post/fetchPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((elem) => elem.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(number) {
      this.page = number;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoading: (state) => state.post.isLoading,
      selectedSort: (state) => state.post.selectedSort,
      sortOptions: (state) => state.post.sortOptions,
      limit: (state) => state.post.limit,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPost: "post/sortedPost",
      sortedAndSearchPosts: "post/sortedAndSearchPosts",
    }),
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
