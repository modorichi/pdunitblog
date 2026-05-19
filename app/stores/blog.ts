import { defineStore } from 'pinia';
import type { Blog, Category, Author, Tag } from '~/types/blog';

type BlogResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

type CategoryResponse = {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
};

type AuthorResponse = {
  contents: Author[];
  totalCount: number;
  offset: number;
  limit: number;
};

type TagResponse = {
  contents: Tag[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [] as Blog[],
    categories: [] as Category[],
    authors: [] as Author[],
    tags: [] as Tag[],
    selectedBlog: null as Blog | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchBlogs() {
      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<BlogResponse>('/api/blogs');
        this.blogs = data.contents;
      } catch (error) {
        this.error = 'ブログの取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchBlogById(id: string) {
      this.loading = true;
      this.error = null;
      this.selectedBlog = null;

      try {
        const data = await $fetch<Blog>(`/api/blogs/${id}`);
        this.selectedBlog = data;
      } catch (error) {
        this.error = 'ブログ詳細の取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<CategoryResponse>('/api/categories');
        console.log('categories response:', data);

        this.categories = data.contents;
      } catch (error) {
        this.error = 'カテゴリーの取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchBlogsByCategory(categoryId: string) {
      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<BlogResponse>(`/api/blogs/category/${categoryId}`);

        this.blogs = data.contents;
      } catch (error) {
        this.error = 'カテゴリ別ブログの取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAuthors() {
      try {
        const data = await $fetch<AuthorResponse>('/api/authors');

        this.authors = data.contents;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchBlogsByAuthor(authorId: string) {
      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<BlogResponse>(`/api/blogs/author/${authorId}`);

        this.blogs = data.contents;
      } catch (error) {
        this.error = '著者別ブログの取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTags() {
      try {
        const data = await $fetch<TagResponse>('/api/tags');
        this.tags = data.contents;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchBlogsByTag(tagId: string) {
      this.loading = true;
      this.error = null;

      try {
        const data = await $fetch<BlogResponse>(`/api/blogs/tag/${tagId}`);

        this.blogs = data.contents;
      } catch (error) {
        this.error = 'タグ別ブログの取得に失敗しました';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
