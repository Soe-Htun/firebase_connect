<template>
  <div>
      <span @click="logout()">Logout(*)</span>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "logout",
  data() {
    return {};
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(e => {
          alert("Oops" + e.message);
        });
    },
    keydownClick(e){
      if(e.keyCode === 106){
        this.logout()
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.keydownClick);
  }
};
</script>

<style scoped>
span{
  cursor: pointer;
}
</style>