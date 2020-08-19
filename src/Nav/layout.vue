<template>
  <div>
    <el-row>
      <el-col class="full-line" :span="4" >
        <el-menu class="el-menu-vertical-demo" :default-active="activeindex">
          <router-link style="text-decoration:none" to="/first">
            <el-menu-item index="1">First</el-menu-item>
          </router-link>
          <router-link style="text-decoration:none" to="/second">
            <el-menu-item index="2">Second</el-menu-item>
          </router-link>
          <router-link style="text-decoration:none" to="/third">
            <el-menu-item index="3">Third</el-menu-item>
          </router-link>
          <router-link to="/four" style="text-decoration:none">
            <el-menu-item index="4">Four</el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
      <el-col :span="17">
        <router-view></router-view>
      </el-col>
      <el-col :span="3" style="float:right;margin-top:15px">
        <logout></logout>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import logout from "../views/logout";
export default {
  name: "nav",
  components: {
    logout
  },
  data() {
      return {
          activeindex:'1'
      }
  },
};
</script>

<style scoped>
.el-menu-item {
  min-width: 80px;
  text-align: center;
}
.full-line{
    position:fixed;
    height:100%;
    border:1px solid rgb(240,240,240)
}
</style>