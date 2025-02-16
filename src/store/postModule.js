import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPost(state) {
      return [
        ...state.posts.sort((post1, post2) =>
          post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
        ),
      ];
    },
    sortedAndSearchPosts(state, getters) {
      return getters.sortedPost.filter((post) =>
        post.title
          .toLocaleLowerCase()
          .includes(state.searchQuery.toLocaleLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        );

        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        console.log("Ошибка", e);
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePost({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _limit: state.limit,
              _page: state.page,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        console.log("Ошибка", e);
      }
    },
  },
  namespaced: true,
};
