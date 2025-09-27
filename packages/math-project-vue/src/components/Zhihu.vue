<template>
    <!-- 热榜容器 -->
    <div class="max-w-850px mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm min-h-100vh">
        <!-- 添加暗黑模式切换按钮 -->
        <div class="flex justify-end mb-4">
            <button @click="toggleDarkMode"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                <div v-if="isDark" class="i-carbon:sun"></div>
                <div v-else class="i-carbon:moon"></div>
            </button>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <div class="i-carbon:loading text-4xl text-blue-500 animate-spin mb-4"></div>
            <p class="text-lg text-gray-600 dark:text-gray-300">正在加载知乎热榜...</p>
            <p class="text-sm text-gray-400 dark:text-gray-500 mt-2">实时获取最新热点话题</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="flex flex-col items-center justify-center py-20 text-center">
            <div class="i-carbon:warning-filled text-5xl text-red-400 mb-4"></div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">加载失败</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6 max-w-md">{{ error }}</p>
            <button @click="fetchHotList"
                class="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <div class="i-carbon:renew"></div>
                <span>重新加载</span>
            </button>
        </div>

        <!-- 正常状态 -->
        <div v-else-if="hotList">
            <!-- 标题栏 -->
            <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <div class="i-carbon:fire text-3xl text-red-500"></div>
                        <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">知乎热榜</h1>
                        <p class="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                            <span>实时热点 · 每分钟更新</span>
                            <span class="text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full text-sm">{{
                                hotList.fresh_text }}</span>
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button
                        class="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div class="i-carbon:search text-lg"></div>
                    </button>
                    <button
                        class="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div class="i-carbon:settings-adjust text-lg"></div>
                    </button>
                </div>
            </div>

            <!-- 热榜列表 -->
            <div class="space-y-4">
                <div v-for="(item, index) in hotList.data" :key="item.id"
                    class="group relative flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                    @click="handleItemClick(item)">
                    <!-- 排名徽章 -->
                    <div class="relative flex-shrink-0">
                        <div class="flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm transition-transform group-hover:scale-110"
                            :class="getRankClass(index)">
                            {{ index + 1 }}
                        </div>
                        <!-- 热度趋势图标 -->
                        <div v-if="item.trend > 1000000" class="absolute -top-1 -right-1">
                            <div class="i-carbon:arrow-up text-xs text-red-500 bg-white dark:bg-gray-800 rounded-full">
                            </div>
                        </div>
                    </div>

                    <!-- 内容区域 -->
                    <div class="flex-1 min-w-0">
                        <!-- 标题行 -->
                        <div class="flex items-start justify-between mb-3">
                            <h3
                                class="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight pr-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                {{ item.target.title }}
                            </h3>
                            <!-- 广告标签 -->
                            <span v-if="item.card_label"
                                class="flex-shrink-0 text-xs px-2 py-1 rounded-full border bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700">
                                广告
                            </span>
                        </div>

                        <!-- 摘要 -->
                        <p v-if="item.target.excerpt"
                            class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                            {{ item.target.excerpt }}
                        </p>

                        <!-- 数据统计 -->
                        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span class="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-full">
                                <div class="i-carbon:hot text-orange-500"></div>
                                <span class="font-medium">{{ formatHeat(item.trend) }}</span>
                                <span>热度</span>
                            </span>

                            <span class="flex items-center gap-2">
                                <div class="i-carbon:chat text-blue-500"></div>
                                <span>{{ formatNumber(item.target.comment_count) }}</span>
                                <span>讨论</span>
                            </span>

                            <span class="flex items-center gap-2">
                                <div class="i-carbon:user-follow text-green-500"></div>
                                <span>{{ formatNumber(item.target.follower_count) }}</span>
                                <span>关注</span>
                            </span>

                            <span class="flex items-center gap-2">
                                <div class="i-carbon:answer text-purple-500"></div>
                                <span>{{ formatNumber(item.target.answer_count) }}</span>
                                <span>回答</span>
                            </span>
                        </div>

                        <!-- 作者和时间 -->
                        <div v-if="item.target.author"
                            class="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <img :src="item.target.author.avatar_url" :alt="item.target.author.name"
                                class="w-6 h-6 rounded-full" />
                            <span class="text-sm text-gray-700 dark:text-gray-300 font-medium">{{
                                item.target.author.name }}</span>
                            <span class="text-gray-300 dark:text-gray-600">•</span>
                            <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTime(item.target.created)
                            }}</span>
                            <span class="text-gray-300 dark:text-gray-600">•</span>
                            <span class="text-xs text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">{{
                                item.target.type }}</span>
                        </div>
                    </div>

                    <!-- 右侧箭头 -->
                    <div
                        class="flex-shrink-0 text-gray-300 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                        <div class="i-carbon:chevron-right text-xl"></div>
                    </div>

                    <!-- 悬停背景效果 -->
                    <div
                        class="absolute inset-0 rounded-xl bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10">
                    </div>
                </div>
            </div>

            <!-- 底部操作 -->
            <div class="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        共显示 {{ hotList.data.length }} 条热榜 · {{ hotList.fresh_text }}
                    </div>
                    <button @click="fetchHotList"
                        class="flex items-center gap-2 px-5 py-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200">
                        <div class="i-carbon:renew"></div>
                        <span class="font-medium">刷新热榜</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="flex flex-col items-center justify-center py-20 text-center">
            <div class="i-carbon:list-boxes text-5xl text-gray-300 dark:text-gray-600 mb-4"></div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">暂无热榜数据</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-6">暂时无法获取热榜信息，请稍后重试</p>
            <button @click="fetchHotList"
                class="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                <div class="i-carbon:renew"></div>
                <span>重新加载</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import type { ZhiHuHotList, ZhiHuHot } from '../types/zhihu'
import { useDark } from '../composables/useDark'

// API 配置
const API_URL = 'https://m1.apifoxmock.com/m1/7074910-0-default/zhihuHot/list'

// 响应式数据
const hotList = ref<ZhiHuHotList | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isDark = ref(false)

// 使用暗黑模式组合函数
const { enableDarkMode, disableDarkMode, applySavedTheme } = useDark()

// 切换暗黑模式
function toggleDarkMode() {
    if (isDark.value) {
        disableDarkMode()
    } else {
        enableDarkMode()
    }
    isDark.value = !isDark.value
}

// 获取热榜数据
const fetchHotList = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error(`网络请求失败: ${response.status}`)
        }

        const data = await response.json()

        if (!data.data || !Array.isArray(data.data)) {
            throw new Error('返回数据格式不正确')
        }

        hotList.value = data
    } catch (err) {
        error.value = err instanceof Error ? err.message : '未知错误'
    } finally {
        loading.value = false
    }
}

// 排名样式类
const getRankClass = (index: number): string => {
    const rankConfig = [
        'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-200',
        'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200',
        'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200'
    ]

    return (index >= 0 && index < 3) ? (rankConfig[index] || '') : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
}

// 格式化热度
const formatHeat = (heat: number): string => {
    if (heat >= 100000000) return (heat / 100000000).toFixed(1) + '亿'
    if (heat >= 10000) return (heat / 10000).toFixed(1) + '万'
    return heat.toLocaleString('zh-CN')
}

// 格式化数字
const formatNumber = (num: number): string => {
    if (num >= 10000) return (num / 10000).toFixed(1) + '万'
    return num.toLocaleString('zh-CN')
}

// 格式化时间
const formatTime = (timestamp: number): string => {
    const now = Math.floor(Date.now() / 1000)
    const diff = now - timestamp

    if (diff < 60) return '刚刚'
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
    return `${Math.floor(diff / 86400)}天前`
}

// 处理项目点击
const handleItemClick = (item: ZhiHuHot): void => {
    if (item.target.url) {
        window.open(item.target.url, '_blank', 'noopener,noreferrer')
    }
}

// 自动刷新定时器
let refreshTimer: number | null = null

// 组件挂载时获取数据并应用主题
onMounted(() => {
    fetchHotList()
    applySavedTheme()

    // 检查当前是否为暗黑模式
    isDark.value = document.documentElement.classList.contains('dark')

    // 每5分钟自动刷新
    refreshTimer = window.setInterval(() => {
        if (!loading.value) fetchHotList()
    }, 5 * 60 * 1000)
})

// 监听DOM类变化
const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
})

// 组件挂载后开始监听
onMounted(() => {
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    })
})

// 组件卸载时清理定时器和观察器
onUnmounted(() => {
    if (refreshTimer) clearInterval(refreshTimer)
    observer.disconnect()
})
</script>