<template>
<div class="app-container">
  <div>
    <el-form :inline="true" :model="filters">
      <el-form-item label="客户名称" >
        <el-input v-model="filters.name" placeholder="输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" >
        <el-select v-model="filters.checkStatus" placeholder="全部" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="审核驳回" value='3'></el-option>
          <el-option label="审核通过" value="2"></el-option>
          <el-option label="待审核" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户状态" >
        <el-select v-model="filters.status" placeholder="全部" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option label="启用" value=0></el-option>
          <el-option label="停用" value=1></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round @click="getCustomerList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="handleExport">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round @click="addCustomer">新建客户</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        filters: {
          name:'',
  				checkStatus:'',
  				status:''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      getCustomerList:function(){

      },
      handleExport:function(){
				let para = {
          name: this.filters.name,
          checkStatus:this.filters.checkStatus,
          status:this.filters.status
        }
			},
      addCustomer:function(){
				this.$router.push('/customerAddForm');
			}
    },
    mounted:function() {
      this.getCustomerList();
    }
  }
</script>
