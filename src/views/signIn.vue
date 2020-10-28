<template>
    <div class="cont">
        <div class="dialog">
            <el-input id="regname" v-model="reg_name" placeholder="Email Address"></el-input>
            <el-input type="password" id="regpassword" v-model="reg_password" placeholder="Password"></el-input>
            <el-button id="signbtn" type="primary" @click="Signup_here">Register</el-button>
            <el-button id="signcancel" @click="cancel()">Cancel(-)</el-button>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            reg_name:'',
            reg_password:""
        }
    },
    methods:{
        Signup_here() {
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.reg_name, this.reg_password)
            .then(() => {
            this.$message({
                message: "Successful Sign up",
                type: "success"
                });
                this.$router.replace("/");
            })
            .catch(e => {
                this.$message({
                    message: e.message,
                    type:'warning' 
                });
            });
        },
        cancel() {
            this.$router.replace({name:'Login'})
        },
        keydownClick(e){
            if(e.keyCode === 13){
                this.Signup_here()
            }
            else if(e.keyCode === 109){
                this.cancel()
            }
        }
    },
    created(){
        window.addEventListener("keydown", this.keydownClick)
    }
}
</script>

<style scoped>
.cont{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgb(242, 242, 242);
}
#regname {
  text-indent: 20px;
  width: 220px;
  height: 39px;
}
#regpassword{
  margin: 25px 0px;
  text-indent: 20px;
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
  margin-left: 20px;
  margin-top: 30px;
  min-width: 100px;
  color: white;
  width: 92px;
  height: 38px;
  border-radius: 5px;
  border: 1px solid #409eff;
  background-color: #409eff;
}
</style>