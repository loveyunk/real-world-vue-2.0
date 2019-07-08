<template>
  <div>
    <h1>哦!</h1>
    <h3>
      看起来您遇到了一些网络问题，请单击“上一步”按钮，然后重试。
    </h3>
    <router-link :to="{ name: 'event-list' }">返回主页</router-link>
  </div>
</template>
