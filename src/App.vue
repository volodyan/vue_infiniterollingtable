<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
