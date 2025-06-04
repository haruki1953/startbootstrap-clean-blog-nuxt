let scrollPos = 0

const handleScroll = (el: HTMLElement) => {
  if (import.meta.client) {
    const headerHeight = el.clientHeight
    const currentTop = (() => {
      if (document.documentElement.scrollTop !== 0) {
        return document.documentElement.scrollTop
      }
      return document.body.scrollTop
    })()

    if (currentTop < scrollPos) {
      // 向上滚动
      if (currentTop > 0 && el.classList.contains('is-fixed')) {
        el.classList.add('is-visible')
      } else {
        el.classList.remove('is-visible', 'is-fixed')
      }
    } else {
      // 向下滚动
      el.classList.remove('is-visible')
      if (currentTop > headerHeight && !el.classList.contains('is-fixed')) {
        el.classList.add('is-fixed')
      }
    }

    scrollPos = currentTop
  }
}

interface ScrollableElement extends HTMLElement {
  _scrollHandler?: () => void
}
// Vue 指令
export const vMainNavScroll = {
  mounted(el: ScrollableElement) {
    const scrollHandler = () => handleScroll(el)
    if (import.meta.client) {
      window.addEventListener('scroll', scrollHandler)
    }
    el._scrollHandler = scrollHandler
  },
  unmounted(el: ScrollableElement) {
    if (import.meta.client) {
      if (el._scrollHandler != null) {
        window.removeEventListener('scroll', el._scrollHandler)
      }
    }
  }
}
