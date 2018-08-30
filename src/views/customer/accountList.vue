<template>
  <div class="app-container">
  		<!--查询条件-->
  		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
  			<el-form :inline="true" :model="filters">
  				<el-form-item label="账号名称">
  					<el-input v-model="filters.userName" placeholder="输入账号名称"></el-input>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" round @click="getAccountList">查询</el-button>
  				</el-form-item>
  				<el-form-item>
  					<el-button type="primary" round @click="handleAdd">新建账号</el-button>
  				</el-form-item>
  			</el-form>
  		</el-col>

      <!--列表表头-->
      <el-table :data="accountList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" element-loading-text="拼命加载中...">
        <el-table-column prop="id" label="账号ID" min-width="120" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="loginName" label="登录名称" min-width="150" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userName" label="账号名称" min-width="150" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userIphone" label="联系电话" min-width="150" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="账号状态"  align="center" min-width="120">
          <template slot-scope="scope">
  					<span @click="handleEdit(scope.$index, scope.row)" title="编辑"><icon-svg icon-class="bianji-copy"/></span>
          </template>
        </el-table-column>
      </el-table>

  		<!--分页列表-->
  	    <el-col :span="24" class="toolbar">
  	      <el-pagination
  	        @size-change="handleSizeChange"
  	        @current-change="handleCurrentChange"
  	        :page-size="10"
  	        layout="total, sizes, prev, pager, next, jumper"
  	        :total="total"
  	        style="float:right;">
  	      </el-pagination>
  	    </el-col>
    </div>
</template>

<script>

const crypto = require('crypto');
import NProgress from 'nprogress';

	export default {
		data() {
			return {
				filters: {
					loginName:''
        },

        accountList: [],
        total: 0,
				pageNum: 1,
        pageSize:10,
        listLoading: false,
        sels: [],//列表选中列
			}
		},
		methods: {
			handleSizeChange:function(val){
				this.pageSize = val;
				this.getAccountList();
			},
			handleCurrentChange:function(val) {
				this.pageNum = val;
				this.getAccountList();
			},
			selsChange: function (sels) {
	      this.sels = sels;
	    },
      handleAdd:function(){

      },
      handleEdit:function(){

      },
			getAccountList:function() {
				let para = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					userName:this.filters.userName
				};
			}
		},
		mounted() {
			this.getAccountList();
		}
	}

</script>
