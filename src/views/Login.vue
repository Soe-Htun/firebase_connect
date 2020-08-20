<template>
  <div class="cont">
    <div class="login">
      <el-input id="name" v-model="name" placeholder="EmailAddress"></el-input>
      <el-input type="password" id="password" v-model="password" placeholder="Password"></el-input>
      <br />
      <span @click="show_hide()">
        <i id="view" v-if="hide" class="far fa-eye-slash"></i>
        <i id="view" v-if="show" class="fas fa-eye"></i>
      </span>
      <el-button id="btn" type="primary" @click="login">Login(Ent)</el-button>
      <el-button type="primary" @click="Sign_up()" id="sign">Register(↑)</el-button>
    </div>

    <div class="footer">
      <el-button type="primary" style="width:120px" @click="facebookLogin()">
        <i class="fab fa-facebook-f" style="margin-right:10px"></i>
         Facebook
      </el-button>
      <el-button type="success" style="width:120px" @click="googleSign()">
        <i class="fab fa-google" style="margin-right:10px"></i>
        Google
      </el-button>
    </div>
    <facebook-login class="button"
      appId="326022817735322"
      @login="getUserData"
      @logout="onLogout"
      @get-initial-status="getUserData">
    </facebook-login>
  </div>
</template>

<script>
import firebase from "firebase";
import facebookLogin from 'facebook-login-vuejs';
export default {
  name: "Login",
  components:{
    facebookLogin
  },
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
    login(){
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
    },
    googleSign(){
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // firebase.auth().languageCode = 'pt';
      // provider.setCustomParameters({
      //   'login_hint': 'user@example.com'
      // });

      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        this.$router.push('/');
        console.log(token,user);
        
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage,errorCode,email,credential);
        
      });
    },
    facebookLogin(){
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');
      firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      this.$$router.push('/')
      console.log(token,user);
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage,errorCode,email,credential);
      });
    },

    getUserData(){
      this.FB.api('/me', 'GET', {fields: 'id,name,email'},
        userInformation =>{
          console.warn("get data from fb", userInformation)
          this.personalID = userInformation.id;
          this.email = userInformation.email;
          this.name = userInformation.name;
        }
      )
    },
    sdkLoaded(payload){
      this.isConnected = payload.isConnected
      this.FB =payload.FB
      if(this.isConnected) this.getUserData()
    },
    onLogin(){
      this.isConnected = true;
      this.getUserData()
    },
    onLogout(){
      this.isConnected = false;
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
  /*background: url("./../assets/realmadrid.jpg") no-repeat; */
  background-color: rgb(242, 242, 242);
  background-size: 100% 100%;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px 0px 0px -210px;
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
#view {
  position: absolute;
  top: 45%;
  left: 69%;
}
.footer{
  position: fixed;
  bottom: 20%;
  left: 50%;
  margin: -200px 0px 0px -120px;
}
</style>

