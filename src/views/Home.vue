<template>
    <div class="cont">
       
        <fieldset class="main">
            <legend class="title">Table</legend>
               
        <input type="button" value="Add Row" class="add" @click="addRow()"/>
            <el-table style="width: 90%" border :data="tableData">
                <el-table-column label="Roll No" prop="roll_no"></el-table-column>
                <el-table-column label="Name" prop="name"></el-table-column>
                <el-table-column label="Age" prop="age"></el-table-column>
                <el-table-column label="Phone no" prop="ph_no"></el-table-column>
                <el-table-column label="Address" prop="address"></el-table-column>
                <el-table-column label="Operations">
                    <template  slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.$index,tableData)">Edit</el-button>
                        <el-button type="danger" size="mini" @click="edit(scope.$index,scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </fieldset>
            <!--<span @click="add"><i class="fas fa-plus-circle" id="plus"></i></span>
            <h4>+</h4>-->
    

        <el-dialog
        width="30%"

        :visible.sync="dialog"
        append-to-body>
            <label for="add_name">Name: </label>
            <el-input id="add_name" v-model="addName" placeholder=""></el-input><br>
            <label for="add_age" class="age">Age </label>
            <el-input id="add_age" v-model="addAge" placeholder=""></el-input><br>
            <label for="add_roll" class="roll">Roll No </label>
            <el-input id="add_roll" v-model="addRoll" placeholder=""></el-input><br>
            <label for="add_phone" class="phone">Phone no </label>
            <el-input id="add_phone" v-model="addPhone" placeholder=""></el-input><br>
            <label for="add_address" class="address">Address </label>
            <el-input id="add_address" v-model="addAddress" placeholder=""></el-input><br><br><br>
            <el-button type="primary" class="submit" @click="save">Add</el-button>
            <el-button @click="cancel">Cancel</el-button>
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
            addName:'',
            addAge:'',
            addRoll:"",
            addPhone:'',
            addAddress:'',
            dialog: false,
            tableData:[
                {
                    name:'PaySaung',
                    age:'21',
                    roll_no:'5CS-23',
                    ph_no:'09265094170',
                    address:'Salin',
                    years:'Fifth years'
                }
            ]
        }
    },
    methods:{
        addRow(){
            this.dialog = true;
        },
        save(){
            firebase.ref("tableData").push({
                name:this.addName,
                age:this.addAge,
                roll_no:this.addRoll,
                ph_no:this.addPhone,
                address:this.addAddress
            }).then(data=>{
                console.log(data);
                this.dialog =false;
            }).catch(e=> {
                console.log(e);
            });
            this.tableData =""
        },
        cancel(){
            this.dialog = false;
        }
    },
    created(){
        firebase.database().ref("tableData").on("value", snapshot => {
            this.tableData = snapshot.val();
        })
    }
}
</script>

<style scoped>
.cont{
    position: relative;
}
.el-table{
    border: 1px solid green;
    margin: 3% 5%;
}
.main{
    border: 3px solid green;
    width: 98%;
    margin:1%
}
.title{
    margin-left:7%;
    width: 85%;
    color: white;
    height: 45px;
    background-color: green;
    vertical-align: middle;
    line-height: 45px;
}
.add{
   border: none;
   width: 90px;
   height: 28px;
   margin-top: 10px;
    background-color: green;
    color: white;
}
label{
    margin-left: 70px;
    text-align: left;
}
.el-input {
    width: 200px;
    margin-top: 20px;
    margin-left: 25px;
}
.age{
    margin-right: 15px;
}
.roll{
    margin-right: -6px;
}
.phone{
    margin-right: -15px;
}
.address{
    margin-right: -8px;
}
.submit{
    width: 100px;
    margin-left: 137px;
}
</style>