<template>
  <header class="titlebar">
    <span id="title"> 剪刀 石头 布！ </span>
    <img src="@/assets/svg/setting.svg" id="settingImg" @click="set"/>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  },
  methods: {
    set() {
      this.$emit("set")
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titlebar {
  display: flex;
  align-items: center;
  background-color: #3c3c3c;
  color: #ccc;
  height: 30.5px;
  padding-right: 150px;
  /* border-bottom: 1px solid #d0d0d0; */
  user-select: none;
}
#title{
  display: flex;
  align-items: center;
  padding-left: 8px;
  flex: 1;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  user-select: none;
}
#settingImg {
  padding: 8px;
  height: 20px;
  cursor: pointer;
}
#settingImg:hover {
  background-color: #434343;
  text-decoration: none;
}
</style>
