<script setup lang="ts">
// 优化SEO搜索
useHead({
  title: 'Blog',
  meta: [{ name: 'description', content: 'Nuxt' }]
})

// 获取与返回的路由
const route = useRoute()
const router = useRouter()
// 利用响应式变量的 pageNum 分页处理
const pageNum = ref(
  (() => {
    const pageNum = Number(route.params.pageNum)
    // 保证分页数始终为合法非负数
    if (Number.isNaN(pageNum) || pageNum < 0) {
      return 0
    }
    return pageNum
  })()
)
const pageSize = 10 // 每页显示 5 条数据

// 异步获取每一页的数据
// content根据页码区分缓存
const { data } = await useAsyncData(`content${pageNum.value}`, () => {
  return queryCollection('content')
    // 排列方式
    .order('date', 'DESC')
    // const pageSize = 10 >>> 每页显示 5 条数据
    .limit(pageSize)
    // 实现分页的首要工程，根据当前页码跳过先前的数据
    .skip(pageNum.value * pageSize)
    .all()
})

// 通过 useAsyncData 获取 content 集合中的总条数
// 返回结果为 dataLength
const { data: dataLength } = await useAsyncData('contentLength', () => {
  return queryCollection('content').count()
})
</script>

<!-- 头部封面 -->
<template>
  <PageHeader image="/img-bg/bg-map-camera.jpg">
    <h1>Clean Blog</h1>
    <span class="subheading">A Blog Theme by Start Bootstrap</span>
  </PageHeader>
  <!-- Main Content-->
  <div class="container px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <!-- 文章列表 -->
        <template v-for="item in data" :key="item.id">
          <!-- Post preview-->
          <div class="post-preview">
            <!-- 跳转文章 -->
            <NuxtLink :to="item.path">
              <h2 class="post-title">
                {{ item.title }}
              </h2>
              <h3 v-if="item.description != ''" class="post-subtitle">
                {{ item.description }}
              </h3>
            </NuxtLink>
            <!-- 关于下面三个文章附加预览信息 -->
            <p class="post-meta">
              <template v-if="item.date != null">
                {{ formatTimeAgoChs(item.date) }}
              </template>
              <template v-if="item.date != null && item.tags.length > 0">
                |
              </template>
              <template v-for="(itemTag, index) in item.tags" :key="itemTag">
                <a href="#!">{{ itemTag }}</a>
                <template v-if="index < itemTag.length - 1"> - </template>
              </template>
            </p>
          </div>
          <!-- Divider-->
          <hr class="my-4" />
        </template>
        <!-- Pager-->
        <div
          v-if="dataLength !== null"
          class="d-flex justify-content-between mb-4"
        >
          <!-- 页码 -1 -->
          <NuxtLink
            v-if="pageNum > 0"
            class="btn btn-primary text-uppercase"
            :to="`/page/${pageNum - 1}`"
          >
            ← Newer Posts
          </NuxtLink>
          <div v-else></div>
          <!-- 页码 +1 -->
          <NuxtLink
            v-if="(pageNum + 1) * pageSize < dataLength"
            class="btn btn-primary text-uppercase"
            :to="`/page/${pageNum + 1}`"
          >
            Older Posts →
          </NuxtLink>
          <!-- （？） -->
          <div v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-meta.post-meta.post-meta.post-meta {
  font-style: unset;
}
</style>
