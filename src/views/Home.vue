<template>
    <div class="cont">
        <fieldset class="main">
            <legend class="title">Table</legend>            
        <input type="button" value="+" class="add" @click="addRow()"/>
            <table>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone No</th>
                    <th>Address</th>
                    <th>Operations</th>
                </tr>
                <tr v-for="(username, key) in tableData" :key="key">
                    <td>{{username.roll_no}}</td>
                    <td>{{username.name}}</td>
                    <td>{{username.age}}</td>
                    <td>{{username.ph_no}}</td>
                    <td>{{username.address}}</td>
                    <td>
                        <el-button style="height:25px;" type="primary" size="mini" @click="handleEdit( item)">Edit</el-button>
                        <el-button style="height:25px;" type="danger" size="mini" @click="handledelete(key)">Delete</el-button>                       
                    </td>
                </tr>
            </table>


            <div id="pagination" class="pagination">
                <div class="col first">
                    <p class="pagination-label">
                        Viewing <span>1-10</span> of <span> 36 </span> 
                    </p>
                </div>
                <div class="col middle">
                    <a href="#" class="first round">&#8249;&#8249;</a>
                    <a href="#" class="previous round">&#8249;</a>
                    <a href="#" class="round btn-page active">1</a>
                    <a href="#" class="round btn-page">2</a>
                    <a href="#" class="round btn-page">3</a>
                    <a href="#" class="round btn-page">4</a>
                    <a href="#" class="next round">&#8250;</a>
                    <a href="#" class="last round">&#8250;&#8250;</a>
                </div>
                <div class="col last">
                    Show
                    <select>
                        <option value="5">5</option>
                        <option value="10" selected> 10</option>
                        <option value="15">15</option>
                    </select>
                    Rows
                </div>
            </div>

        </fieldset>

        <!-- add Dialog -->
        <el-dialog
        width="460px" :center="true"
        :visible.sync="dialog"
        append-to-body>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="Roll-No:" prop="addRoll">
                    <el-input id="add_roll" v-model="ruleForm.addRoll" placeholder="Roll No"></el-input>
                </el-form-item>
                <el-form-item label="Name:" prop="addName">
                    <el-input class="addName" v-model="ruleForm.addName" placeholder="Name"></el-input>
                </el-form-item>
                <el-form-item label="Age:" prop="addAge">
                    <el-input class="addAge" v-model="ruleForm.addAge" placeholder="Age"></el-input>
                </el-form-item>
                <el-form-item label="Phone no:" prop="addPhone">
                    <el-input class="addPhone" v-model="ruleForm.addPhone" placeholder="Phone Number"></el-input>
                </el-form-item>
                <el-form-item label="Address" prop="addAddress">
                    <el-input class="addAddress" v-model="ruleForm.addAddress" placeholder="Address"></el-input>
                </el-form-item><br>
                <el-form-item >
                    <el-button type="primary" class="submit" @click="submit('ruleForm')">Add</el-button>
                    <el-button  class="submit" @click="reset('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- edit Dialog -->
        <el-dialog
        width="450px" :center="true"
        :visible.sync="editDialog"
       >
            <el-form :model="editRuleForm" ref="editRuleForm">
                <el-form-item label="Roll-No:" prop="editRoll">
                    <el-input  v-model="editRuleForm.addRoll" placeholder="Roll No"></el-input>
                </el-form-item>
                <el-form-item label="Name:" prop="editName">
                    <el-input class="addName" v-model="editRuleForm.addName" placeholder="Name"></el-input>
                </el-form-item>
                <el-form-item label="Age:" prop="editAge">
                    <el-input class="addAge" v-model="editRuleForm.addAge" placeholder="Age"></el-input>
                </el-form-item>
                <el-form-item label="Phone no:" prop="editPhone">
                    <el-input class="addPhone" v-model="editRuleForm.addPhone" placeholder="Phone Number"></el-input>
                </el-form-item>
                <el-form-item label="Address" prop="editAddress">
                    <el-input class="addAddress" v-model="editRuleForm.addAddress" placeholder="Address"></el-input>
                </el-form-item><br>
                <el-form-item >
                    <el-button type="primary" class="submit" @click="save(key)">Save</el-button>
                    <el-button  class="submit" @click="clear()">Clear</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name:'home',
    data() {
        return {
            name:'',
            age:'',
            roll_no:'',
            ph_no:'',
            address:'',

            ruleForm:{
                addName:'',
                addAge:'',
                addRoll:"",
                addPhone:'',
                addAddress:'',
            },
            editRuleForm:{
                editName:'',
                editAge:'',
                editRoll:"",
                editPhone:'',
                editAddress:'',
            },
            rules:{
                addRoll:[
                    { required: true, message: 'Roll No is required'}
                ],
                addName:[
                    { required: true, message: 'Name is required'}
                ],
                addAge:[
                    { required: true, message: 'Age is required'}
                ],
                addPhone:[
                    { required: true, message: 'Phone number is required'}
                ],
                addAddress:[
                    { required: true, message: 'Address is required'}
                ]
            },
            dialog: false,
            editDialog:false,
            tableData:[],
            Edited:''
        }
    },
    methods:{
        addRow(){
            this.dialog = true;
            this.ruleForm.addName ='';
            this.ruleForm.addAge ='';
            this.ruleForm.addRoll ='';
            this.ruleForm.addPhone ='';
            this.ruleForm.addAddress ='';
        },
        submit(formName){
            this.$refs[formName].validate((valid) =>{
                if(valid){
                    firebase.database().ref("tableData").push({
                        roll_no:this.ruleForm.addRoll,
                        name:this.ruleForm.addName,
                        age:this.ruleForm.addAge,
                        ph_no:this.ruleForm.addPhone,
                        address:this.ruleForm.addAddress
                    }).then(data=>{
                        this.$message({
                            type:'success',
                            message:'Add data Success'
                        })
                        console.log(data);
                        this.dialog =false;
                    }).catch(e=> {
                        this.$message({
                            type:'danger',
                            message:'Error for adding data'
                        })
                        console.log(e);
                    });
                 }else{
                     console.log('error submit!');
                     return false;
                 }
            })
        },
        reset(formName){
            this.$refs[formName].resetFields()
        },
        handleEdit(item){
            this.editDialog =true;
            this.Edited = this.tableData.indexOf(item);
            this.editRuleForm = Object.assign({}, item)
            this.editRuleForm.editRoll = this.Edited.roll_no;
            this.editRuleForm.editName = this.Edited.name;
            this.editRuleForm.editAge = this.Edited.age;
            this.editRuleForm.editPhone =this.Edited.ph_no;
            this.editRuleForm.editAddress =this.Edited.address
        },
         save(key){
            firebase.database().ref("tableData/" + key).set({
                roll_no: this.editRuleForm.editRoll,
                name:this.editRuleForm.editName,
                age: this.editRuleForm.editAge,
                ph_no: this.editRuleForm.editPhone,
                address: this.editRuleForm.editAddress
            });
            this.editDialog=false;
        },
        clear(){
            this.editRuleForm.editRoll = "";
            this.editRuleForm.editName = "";
            this.editRuleForm.editAge = "";
            this.editRuleForm.editPhone = "";
            this.editRuleForm.editAddress = ""
        },
        handledelete(key){
            this.$confirm("Are you sure to delete this item?", "Warning",{
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type:"warning"
            }).then(() =>{
                firebase.database().ref("tableData/" + key).remove();
            })
        },
       
        cancel(){
            this.dialog = false;
        },
        logout(){
            this.$confirm('Are you sure logout?', 'Warning', {
                confirmButtonText : 'OK',
                cancelButtonText: 'Cancel',
                type:'warning'
            }).then(() => {
                this.$message({
                    type:'success',
                    message:'Logout Success'
                });
                this.$router.replace({name:'Login'})
            }).catch(()=> {
                this.$message({
                    type:'info',
                    message:'Logout Cancel'
                });
            })
        },  
        keydownClick(e){
            if(e.keyCode === 106){
             this.logout()   
            }
        },
        getData(){
            //let self=this;
            firebase.database().ref("tableData").on('value',snapshot => {
                this.tableData = snapshot.val();
                return  this.tableData 
            });
            
            console.log("table=>>>", this.tableData);
            // console.log("data=>>",data);
        }
    },
    created(){
       this.getData();
        window.addEventListener("keydown", this.keydownClick);   
    }
}
</script>

<style scoped>
.cont{
    position: relative;
}
table, th{
    border-collapse: collapse;
    border: 2px solid green;
    margin: 1% 9%;
    width: 80%;
}
th{
    width: 10%;
    height: 35px;
}
td {
 border: 1px solid gray; 
 height: 30px;  
}
.main{
    border: 3px solid green;
    width: 98%;
    margin:1%
}
.title{
    margin-left:7%;
    width: 85%;
    font-weight: 600;
    color: white;
    height: 45px;
    background-color: green;
    vertical-align: middle;
    line-height: 45px;
}
.add{
    border: none;
    width: 39px;
    height: 38px;
    border-radius: 22px;
    text-indent: 1px;
    padding-bottom: 10px;
    line-height: 31px;
    font-size: 32px;
    margin-top: 14px;
    background-color: green;
    color: white;
}
.el-form-item{
    margin-left: 60px;
    text-align: left;
}
.el-input {
    width: 200px;
    margin-left: 10px;
    text-align: left;
}
.addName{
    margin-left: 23px;
}
.addAge{
    margin-left: 32px;
}
.addPhone{
    margin-left: 4px;
}
.addAddress{
    margin-left: 15px;
}
.submit{
    width: 95px;
    margin-left: 82px;
}

.pagination .col.middle{
    display: flex;
    justify-content: center;
}
.pagination .col.last{
    text-align: right;
    margin: 10px 0px;
}
.pagination p{
    margin: 15px 0px;
}
.pagination a{
    border : 1px solid #bababa;
    padding: 8px 16px;
    text-decoration: none;
    color: black;
}
.pagination a:hover, .pagination a.active{
    background-color: rgb(127, 227, 245);
}
.pagination span{
    font-weight: bold;
}
.pagination select{
    margin: 20px 0px;
}

</style>