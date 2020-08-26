<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows">
        <template slot="table-row" slot-scope="props">
            <div v-if="props.column.field == 'btn'">
                <el-button  v-if="props.row.id == editId" type="success" size="mini" @click="updateRow(props.row)">Save</el-button>
                <el-button v-else type="primary" size="mini" @click="editRow(props.row.id)">Edit</el-button>
                <el-button type="danger" size="mini" @click="deleteRow(props.$inidex,rows)">Delete</el-button>
            </div>
            <div v-else>
                <div v-if="props.row.id == editId">
                    <el-input v-model="props.row[props.column.field]" size="smaill" placeholder=""></el-input>
                </div>
                <div v-else>
                    <span>{{props.row[props.column.field]}}</span>
                </div>
            </div>
        </template>
      </vue-good-table>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'my-component',
  data(){
    return {
        editId:'',
        edit: false,
        columns: [
        
        {
          label: 'Roll No',
          field: 'roll_no',
          width:'10%'
        },
        {
          label: 'Name',
          field: 'name',
          width:'10%'
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
          width:'10%'
        },
        {
          label: 'Phone No',
          field: 'ph_no',
          type: 'number',
          width:'10%'
        },
        {
          label: 'Address',
          field: 'address',
          width:'10%'
        },
        {
            label:'Actions',
            field: 'btn',
            width:'10%'
        },
      ],
      rows: [
        { id:1, name:"John", age: 20,  },
        { id:2, name:"Jane", age: 24,  },
        { id:3, name:"Susan", age: 16,  },
        { id:4, name:"Chris", age: 55,  },
        { id:5, name:"Dan", age: 40,  },
        { id:6, name:"John", age: 20, },
      ],
    };
  },
  methods: {
      updateRow(data){
        console.log('updatedata', data)
        this.editId = '';
      
      },
      editRow(id){
          this.editId =id;
          console.log('hello', id);
          this.edit = !this.edit
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getData(){
          firebase.database().ref("rows").on('value', snapshot =>{
              this.rows = snapshot.val()
              return this.rows;
          })

      }
  },
  created(){
      this.getData()
  }
};
</script>
