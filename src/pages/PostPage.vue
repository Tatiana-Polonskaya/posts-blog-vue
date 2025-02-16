<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <PostForm @create="createPost"
    /></my-dialog>
    <my-input v-model="searchQuery" v-focus placeholder="Поиск..." />
    <PostList
      :posts="sortedAndSearchPosts"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePost" class="observer"></div>
    <!-- <div class="page__wrapper">
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
    </div> -->
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
      limit: 10,
      searchQuery: "",
      page: 1,
      totalPages: 0,
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        );

        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );

        this.posts = response.data;
        this.isLoading = false;
      } catch (e) {
        alert("Ошибка", e);
      }
    },
    async loadMorePost() {
      try {
        this.page++;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          }
        );

        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );

        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка", e);
      }
    },
  },
  mounted() {
    this.fetchPosts();

    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entr) => {
    //   if (entr[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePost();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPost() {
      return [
        ...this.posts.sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        ),
      ];
    },
    sortedAndSearchPosts() {
      return this.sortedPost.filter((post) =>
        post.title
          .toLocaleLowerCase()
          .includes(this.searchQuery.toLocaleLowerCase())
      );
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
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
