<script setup lang="ts">
// 路由对象和返回
const route = useRoute()
// 确保 route.path 的尾部不会带 /
const cleanPath = route.path.replace(/\/$/, '')
const { data: page } = await useAsyncData(cleanPath, () => {
  return queryCollection('content').path(cleanPath).first()
})

// 检测数据是否存在来固定返回结果
const title = computed(() => page.value?.title ?? '页面不存在')
const description = computed(() => page.value?.description)
const image = computed(() => page.value?.image ?? '/img-bg/bg-post.jpg')
const tags = computed(() => page.value?.tags ?? [])
const date = computed(() => page.value?.date)

// SEO 优化
useHead({
  title: title,
  meta: [{ name: 'description', content: description }]
})
</script>

<template>
  <!-- 文章头图 标题 副标题-->
  <PageHeader :image="image" type="post-heading">
    <h1>{{ title }}</h1>
    <h2 v-if="description != null" class="subheading">{{ description }}</h2>
    <span class="meta">
      <!-- 发布时间 等 -->
      <template v-if="date != null"> {{ formatTimeAgoChs(date) }} </template>
      <template v-if="date != null && tags.length > 0"> | </template>
      <template v-for="(item, index) in tags" :key="item">
        <a href="#!">{{ item }}</a>
        <!-- 分隔符 -->
        <template v-if="index < tags.length - 1"> - </template>
      </template>
    </span>
  </PageHeader>
  <!-- Post Content-->
  <article v-if="page !== null" class="mb-4">
    <div class="container px-4 px-lg-5">
      <div class="row gx-4 gx-lg-5 justify-content-center">
        <div class="col-md-10 col-lg-9 col-xl-8">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.meta.meta.meta.meta {
  font-style: unset;
}
</style>
