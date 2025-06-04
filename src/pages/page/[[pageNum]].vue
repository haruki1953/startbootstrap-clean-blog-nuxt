<script setup lang="ts">
useHead({
  title: 'Blog',
  meta: [{ name: 'description', content: 'Nuxt' }]
})

const route = useRoute()
const router = useRouter()
const pageNum = ref(
  (() => {
    const pageNum = Number(route.params.pageNum)
    if (Number.isNaN(pageNum) || pageNum < 0) {
      return 0
    }
    return pageNum
  })()
)
const pageSize = 10 // 每页显示 5 条数据

const { data } = await useAsyncData(`content${pageNum.value}`, () => {
  return queryCollection('content')
    .order('date', 'DESC')
    .limit(pageSize)
    .skip(pageNum.value * pageSize)
    .all()
})

const { data: dataLength } = await useAsyncData('contentLength', () => {
  return queryCollection('content').count()
})
</script>

<template>
  <PageHeader image="/img-bg/bg-map-camera.jpg">
    <h1>Clean Blog</h1>
    <span class="subheading">A Blog Theme by Start Bootstrap</span>
  </PageHeader>
  <!-- Main Content-->
  <div class="container px-4 px-lg-5">
    <div class="row gx-4 gx-lg-5 justify-content-center">
      <div class="col-md-10 col-lg-8 col-xl-7">
        <template v-for="item in data" :key="item.id">
          <!-- Post preview-->
          <div class="post-preview">
            <NuxtLink :to="item.path">
              <h2 class="post-title">
                {{ item.title }}
              </h2>
              <h3 v-if="item.description != ''" class="post-subtitle">
                {{ item.description }}
              </h3>
            </NuxtLink>
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
          <NuxtLink
            v-if="pageNum > 0"
            class="btn btn-primary text-uppercase"
            :to="`/page/${pageNum - 1}`"
          >
            ← Newer Posts
          </NuxtLink>
          <div v-else></div>

          <NuxtLink
            v-if="(pageNum + 1) * pageSize < dataLength"
            class="btn btn-primary text-uppercase"
            :to="`/page/${pageNum + 1}`"
          >
            Older Posts →
          </NuxtLink>
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
