<template>
  <div class="HomePage">
    <transition name="isd">
      <div
        class="HomePage_Left"
        id="box"
        :style="`width:${HomePage_Left_Width}px`"
        v-show="HomePage_Left_IsShowStauts"
      >
        <div class="NowTime"></div>
        <div class="Treeoutbox">
          <el-tree
            :data="data"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            :icon-class="'MySetIconClass'"
            :indent="22"
            @node-click="Eltree_NodeClickfun"
            @node-expand="nodeExpand"
            @node-collapse="nodeCollapse"
            node-key="Sequence"
            :highlight-current="isShowGaoliang"
            ref="deptTree"
            :filter-node-method="filterNode"
            show-checkbox
            :default-checked-keys="[0]"
          >
            <span
              class="custom-tree-node"
              slot-scope="{ node, data }"
              @click="nodeClickfun($event, node, data)"
              @contextmenu.prevent="nodeContextmenu($event, node, data)"
            >
              <span
                class="iconfont icon-wenjian1 iconfontboxAdd"
                v-if="node.label === 'Add'"
              ></span>
              <span class="iconfont icon-wenjian1 iconfontbox" v-else></span>
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </transition>
    <div
      class="HomePage_Center"
      :style="`width:calc(100% - ${HomePage_Left_Width}px - ${HomePage_Right_Width}px)`"
    >
      <div
        class="ZdSqIcon iconfont icon-zhedie1"
        :style="` transform: rotate(${ZdSqIconRotate}deg)`"
        @click="ZDSQFun"
      ></div>
      <infiniterollingtable/>
    </div>
    <div
      class="HomePage_Right"
      :style="`width:${HomePage_Right_Width}px`"
    ></div>
  </div>
</template>
<script>
import Bus from "@/utils/bus.js";
import { mapGetters } from "vuex";
import AxiosUrl from "@/middleware/services/AxiosUrl";
import infiniterollingtable from './infiniterollingtable'
export default {
  name: "HomePage",
  components:{
    infiniterollingtable
  },
  data() {
    return {
      HomePage_Left_IsShowStauts: true,
      HomePage_Left_Width: 210,
      HomePage_Right_Width: 425,
      ZdSqIconRotate: 0,
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      isShowGaoliang: false,
    };
  },

  watch: {
    // filterText(val) {
    //   this.$refs.deptTree.filter(val);
    // },
  },
  methods: {
    ZDSQFun() {
      this.HomePage_Left_IsShowStauts = !this.HomePage_Left_IsShowStauts;
      if (this.HomePage_Left_IsShowStauts) {
        this.HomePage_Left_Width = 210;
        this.ZdSqIconRotate = 0;
      } else {
        this.HomePage_Left_Width = 0;
        this.ZdSqIconRotate = 180;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.TreeNodeName.toLowerCase().includes(value.toLowerCase());
    },
    nodeClickfun(event, node, data) {
      console.log("event,node, data", event, node, data);
      this.IsShowaddDialogComponents = false;
      this.$nextTick(() => {
        // 使树筛选时选中的节点高亮显示
        this.isShowGaoliang = true;
        this.$refs.deptTree.setCurrentKey(data.Sequence);
      });
      if (data.TreeNodeName === "Add") {
        this.$refs.addDialog.openDialog(data, "添加节点");
      } else if (
        data.TreeNodeName === "KPI属性" ||
        data.TreeNodeName === "数据属性" ||
        data.TreeNodeName === "基本属性"
      ) {
        Bus.$emit("ToRightContentTo", data, data.TreeNodeName);
      }
    },
    nodeContextmenu(event, node, data) {
      console.log("nodeContextmenu---event,node, data", event, node, data);
      if (
        data.TreeNodeName !== "Add" &&
        data.TreeNodeName !== "KPI属性" &&
        data.TreeNodeName !== "数据属性" &&
        data.TreeNodeName !== "基本属性"
      ) {
        this.Editdata = data;
        this.addDialogComponentsStyle = {
          top: `${event.y + 10}px`,
          left: `${event.x}px`,
        };
        this.IsShowaddDialogComponents = true;
        this.$nextTick(() => {
          // 使树筛选时选中的节点高亮显示
          this.isShowGaoliang = true;
          this.$refs.deptTree.setCurrentKey(data.Sequence);
        });
      }
    },

    Eltree_NodeClickfun() {
      this.IsShowaddDialogComponents = false;
    },
    nodeExpand() {
      this.IsShowaddDialogComponents = false;
    },
    nodeCollapse() {
      this.IsShowaddDialogComponents = false;
    },
    GettreeData() {
      this.$axios
        .post(AxiosUrl.baseUrlPath + "TreeNode/GeTreeData")
        .then((res) => {
          console.log("treeData", res);
          this.data = res.data.Response;
        })
        .catch((error) => {});
    },
    AddTreeNode(obj) {
      console.log("AddTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/AddTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("AddTreeNode", res);
          this.GettreeData();
          this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
    UpdateTreeNode(obj) {
      console.log("UpdateTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/UpdateTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("UpdateTreeNode", res);
          this.GettreeData();
          this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
    DelTreeNode(obj) {
      console.log(" DelTreeNode---入参", obj);
      this.$axios
        .post(
          AxiosUrl.baseUrlPath + "TreeNode/DelTreeNode",
          JSON.stringify(obj),
          {
            headers: { "Content-Type": "application/json;" },
          }
        )
        .then((res) => {
          console.log("DelTreeNode", res);
          this.GettreeData();
          this.$message({
            type: "success",
            message: res.data.Message,
            center: true,
            duration: 5000,
            customClass: "MyMesageStyle",
            showClose: true,
          });
        })
        .catch((error) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.HomePage {
  display: flex;
  width: 100%;
  height: vh(969);
  background: #e8ecf0;
  .HomePage_Left {
    height: vh(969);
    background: #fff;
    .NowTime {
      width: 210px;
      height: 30px;
      background: #f6f7fa;
    }
    .Treeoutbox {
      //  width: 100%;
      height: vh(916);
      overflow: auto;
      margin-left: 10px;
      margin-top: 23px;
      /deep/
        .el-tree--highlight-current
        .el-tree-node.is-current
        > .el-tree-node__content {
        background-color: #327c86;
        color: #fff;
      }
      /deep/ .el-tree-node__content:hover {
        background-color: #327c86;
        color: #fff;
      }
      /deep/ .MySetIconClass {
        font-size: 14px;
        &:before {
          display: inline-block;
          content: "+";
          color: #000000;
          text-align: center;
          font-size: 12px;
          //background: url("../../assets/img/add.png") no-repeat;
          background-size: 19px 24px;
          width: 14px;
          height: 14px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #e4e4e4 43%,
            #d8d8d8 100%
          );
          border: 1px solid #9cb1c2;
          box-sizing: border-box;
          line-height: 10px;
        }
      }
      /deep/ .MySetIconClass.expanded {
        //font-size: 26px;
        &:before {
          display: inline-block;
          content: "-";
          color: #000000;
          text-align: center;
          font-size: 16px;
          //background: url("../../assets/img/del.png") no-repeat;
          background-size: 19px 24px;
          width: 14px;
          height: 14px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #e4e4e4 43%,
            #d8d8d8 100%
          );
          border: 1px solid #9cb1c2;
          box-sizing: border-box;
          line-height: 10px;
         
        }
      }
      /deep/ .el-tree-node__expand-icon.expanded {
        transform: rotate(0deg) !important;
      }
      /deep/ .MySetIconClass.is-leaf {
        display: none;
        content: "";
      }
      .custom-tree-node {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 30px;
        font-size: 14px;
        padding-right: 15px;
        .iconfontbox {
          margin-right: 5px;
          font-size: 14px;
        }
        .iconfontboxAdd {
          margin-right: 5px;
          font-size: 20px;
        }
      }
    }
  }
  .HomePage_Center {
    height: vh(969);
    background: #fff;
    margin: 0 10px;
    position: relative;
    .ZdSqIcon {
      position: absolute;
      top: 50%;
      left: -22px;
      font-size: 36px;
      cursor: pointer;
      color: gray;
    }
  }
  .HomePage_Right {
    height: vh(969);
    background: #fff;
  }
}
.box-enter-active,
.box-leave-active {
  animation: scale 10s;
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>