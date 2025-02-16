import axios from "axios";
import { ref, onMounted } from "vue";

export function usePosts(limit) {
  const posts = ref([]);
  const totalPage = ref(0);
  const isPostLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
        {
          params: {
            _limit: limit,
            _page: 1,
          },
        }
      );

      totalPage.value = Math.ceil(response.headers["x-total-count"] / limit);

      posts.value = response.data;
    } catch (e) {
      alert("Ошибка", e);
    } finally {
      isPostLoading.value = false;
    }
  };

  onMounted(fetching);

  return {
    posts,
    isPostLoading,
    totalPage,
  };
}
