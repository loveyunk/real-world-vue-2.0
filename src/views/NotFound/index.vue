<template>
  <div>
    <h1>哎呀!</h1>
    <h3>您要找的页面不存在</h3>
    <router-link :to="{ name: 'event-list' }">返回主页</router-link>
  </div>
</template>
