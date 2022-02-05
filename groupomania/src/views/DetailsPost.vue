<template>
  <section class="post">
    <h1>Le titre du post est {{ post.title }}</h1>
    <p>Le contenu du post est {{ post.content }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      post : null
    };
  },
  computed: {
    postId() {
      return parseInt(this.$route.params.id);
    },
  },

  async created() {
    const response = await fetch(
      `http://localhost:3000/api/posts/${this.$route.params.id}`
    );
    this.post = await response.json();
  },
};
</script>
