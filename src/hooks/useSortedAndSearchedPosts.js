import { computed, ref } from "vue";

export default function useSortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref("");

  const searchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(searchQuery.value.toLocaleLowerCase())
    );
  });

  return {
    searchQuery,
    searchedPosts,
  };
}
