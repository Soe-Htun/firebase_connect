<template>
    <div class="cont">
        <fieldset class="main">
            <legend class="title">Table</legend>            
        <input type="button" value="+" class="add" @click="addRow()"/>
            <!-- <el-table style="width: 90%" border :data="tableData">
                <el-table-column label="Roll No" prop="roll_no">
                    <template slot-scope="scope">
                        <div>{{scope.row.roll_no}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Name" prop="name"></el-table-column>
                <el-table-column label="Age" prop="age"></el-table-column>
                <el-table-column label="Phone no" prop="ph_no"></el-table-column>
                <el-table-column label="Address" prop="address"></el-table-column>
                <el-table-column label="Operations">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleEdit(scope.$index,tableData)">Edit</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
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
                        <el-button style="height:25px" type="primary" size="mini" @click="handleEdit(index, tableData)">Edit</el-button>
                        <el-button style="height:25px" type="danger" size="mini" @click="handledelete(key)">Delete</el-button>                       
                    </td>
                    <!-- <td>
                        <template slot-scope="scope">
                            <el-button style="height:25px" type="primary" size="mini" @click="handleEdit(scope.$index, tableData)">Edit</el-button>
                            <el-button style="height:25px" type="danger" size="mini" @click="handledelete(item)">Delete</el-button>   
                        </template>
                    </td> -->
                </tr>
            </table>
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
                    <el-button type="primary" class="submit" @click="save(key)">Add</el-button>
                    <el-button  class="submit" @click="clear()">Reset</el-button>
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
        handleEdit(index,row){
            this.editDialog =true;
            this.Edited = row[index]
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
        handleDelete(key){
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
</style>