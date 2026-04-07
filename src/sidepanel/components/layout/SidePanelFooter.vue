<template>
  <footer class="sidepanel-footer">
    <p class="footer-text">
      💡 由
      <a
        href="https://github.com/dtsola/xiaoyaosearch"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      >
        小遥搜索
      </a>
      提供 | 听懂你的话、看懂你的图
    </p>
  </footer>
</template>

<script setup lang="ts">
// Footer 组件
</script>

<style scoped>
.sidepanel-footer {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 12px 16px;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.footer-link {
  color: #007aff;
  text-decoration: none;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
