<template>
  <div class="cont">
    <div class="login">
      <el-input id="name" v-model="name" placeholder="EmailAddress"></el-input>
      <el-input type="password" id="password" v-model="password" placeholder="Password"></el-input>
      <br />
      <span @click="show_hide()">
        <i v-if="hide" class="far fa-eye-slash"></i>
        <i v-if="show" class="fas fa-eye"></i>
      </span>
      <el-button id="btn" type="primary" @click="login">Login(Ent)</el-button>
      <el-button type="primary" @click="Sign_up()" id="sign">Register(↑)</el-button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      hide:false,
      show:true
    };
  },
  methods: {
    show_hide() {
      var pass = document.getElementById("password");
      if (pass.type == "password") {
        pass.type = "text";
        this.hide =true;
        this.show=false;
      } else {
        pass.type = "password";
        this.show=true;
        this.hide=false;
      }
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.name, this.password)
        .then(() => {
          this.$message({
            message: "Login Successful",
            type: "success"
          });
          this.$router.replace({ name: "home" });
        })
        .catch(e => {
          this.$message({
            message: e.message,
            type:'warning'
          });
        });
    },
    Sign_up() {
      this.$router.replace({name:"signIn"})
    },
    keydownClick(e) {
      if (e.keyCode === 38) {
        this.Sign_up();
      }
      else if(e.keyCode === 13){
        this.login();
      }
    }
  },
  created(){
    window.addEventListener("keydown", this.keydownClick)
  }
};
</script>

<style>
.dialog {
  position: fixed;
  top: 53.4%;
  left: 51%;
  margin: -180px 0px 0px -150px;
  width: 280px;
  height: 260px;
  border-radius: 10px;
  background-size: 100% 100%;
}
#regname {
  margin-top: 50px;
  width: 220px;
  height: 39px;
}
#regpassword{
  margin-top: 25px;
  width: 220px;
  height: 39px;
}
#signbtn {
  margin-top: 30px;
  height: 38px;
  border-radius: 5px;
  width: 95px;
}
#signcancel {
  margin-top: 30px;
  color: white;
  width: 92px;
  height: 38px;
  border-radius: 5px;
  border: 1px solid #409eff;
  background-color: #409eff;
}
#nav {
  padding: 0px;
}
.cont {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("./../assets/realmadrid.jpg") no-repeat;
  background-size: 100% 100%;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px 0px 0px -220px;
}
#name {
  text-indent: 20px;
  width: 220px;
  height: 39px;
}
#password {
  margin: 25px 0px;
  text-indent: 20px;
  width: 220px;
  height: 39px;
}
#btn {
  margin-top:5px ;
  margin-left: 0px;
  width: 95px;
  height: 38px;
}
#sign {
  margin-left: 20px;
  width: 92px;
  min-width: 100px;
  height: 38px;
}
i {
  position: absolute;
  top: 45%;
  left: 69%;
}
</style>

