<template>
  <div class="infiniterollingtable">
    <div class="infiniterollingtableContent">
      <div class="tableoutbox">
        <div class="tableTileoutbox">
          <div class="preTitle">管段</div>
          <div class="preTitle">管长(m)</div>
          <div class="preTitle">所属道路</div>
          <div class="preTitle">网格分区</div>
          <div class="preTitle">淤积程度</div>
          <div class="preTitle">清淤计划</div>
          <div class="preTitle">定位</div>
        </div>
        <div class="tableoutbox_scrolloutbox" id="detetion-box2">
          <div
            class="tableoutbox_inbox"
            v-if="!!SedimentPipeDatas.length"
            id="detetion-con1"
          >
            <div
              v-for="(item, index) in SedimentPipeDatas"
              :key="index"
              class="itembox"
              :class="{
                ActiveRowStyle: index === NowIndex,
              }"
              @click.stop="GetSedimentWarningDataRowClick(item, index)"
            >
              <div class="itemdata" :title="item.Pipe">
                {{ item.Pipe }}
              </div>
              <div class="itemdata" :title="item.Length">
                {{ item.Length }}
              </div>
              <div class="itemdata" :title="item.Road">
                {{ item.Road }}
              </div>
              <div class="itemdata" :title="item.Region">
                {{ item.Region }}
              </div>
              <div class="itemdata itemdata_TS" :title="item.Deposition">
                <div
                  class="itemdata_inbox"
                  :class="[
                    item.Deposition == '严重'
                      ? 'YZ_activeColor'
                      : item.Deposition == '中等'
                      ? 'ZD_activeColor'
                      : item.Deposition == '轻微'
                      ? 'QW_activeColor'
                      : item.Deposition == '良好'
                      ? 'LH_activeColor'
                      : '',
                  ]"
                >
                  {{ item.Deposition }}
                </div>
              </div>
              <div class="itemdata itemdata_Plan" :title="item.Plan">
                <div
                  class="itemdata_Plan_inbox"
                  :class="item.Plan === '建议清淤' ? 'activeColor' : ''"
                >
                  {{ item.Plan }}
                </div>
              </div>
              <div class="itemdata" @click.stop="DWFun(item, index)">
                <!-- :class="{ SvgIconColor: ActiveRowStyleStatus && index === SvgIconNowIndex}" -->
                <SvgIcon
                  :name="
                    ActiveRowStyleStatus && (index === SvgIconNowIndex) === true
                      ? 'location'
                      : 'location2'
                  "
                  :title="''"
                  class="SvgIconClass_DW"
                />
              </div>
            </div>
          </div>
          <div class="tableoutbox_inbox" id="detetion-con2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AxiosUrl from "@/middleware/services/AxiosUrl";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
export default {
  name: "infiniterollingtable",
  components: {
    SvgIcon,
  },
  data() {
    return {
      SedimentPipeDatas: [],
      NowIndex: 0,
      SvgIconNowIndex: 0,
      ActiveRowStyleStatus: false,
      OnlyInitScrollFunStatus: true,
    };
  },
  mounted() {
    this.getShowDatafun();
  },
  methods: {
    getShowDatafun() {
      this.OnlyInitScrollFunStatus = true;
      this.getData();
      this.timergetShowData = setInterval(() => {
        this.OnlyInitScrollFunStatus = false;
        this.getData();
      }, 10000);
      this.$once("hook:beforeDestroy", () => {
        console.log("清除定时器timergetShowData");
        window.clearInterval(this.timergetShowData);
        this.timergetShowData = null;
      });
    },
    GetSedimentWarningDataRowClick(item, index) {
      this.NowIndex = index;
      this.tabsroomNowIndex = 0;
      //Bus.$emit("GetSedimentWarningDataRowClickTo");
    },
    DWFun(item, index) {
      console.log("DWFun-item", item); //ActiveRowStyleStatus
      if (this.SvgIconNowIndex !== index) {
        this.SvgIconNowIndex = index;
        this.ActiveRowStyleStatus = true;
      } else {
        this.SvgIconNowIndex = index;
        this.ActiveRowStyleStatus = !this.ActiveRowStyleStatus;
      }

      if (this.ActiveRowStyleStatus) {
        //console.log("%c可以绘图", "color:green", item);
        //Bus.$emit("getResult1", item);
      } else {
        //console.log("%c不能可以绘图", "color:red");
        //Bus.$emit("getResult1", null);
      }
    },
    getData() {
      this.$axios
        .post(AxiosUrl.baseUrlPath + "GetSedimentWarningData")
        .then((res) => {
          console.log("SedimentPipeDatas", res);
          this.SedimentPipeDatas = res.data.Result.SedimentPipeDatas;
          console.log("this.SedimentPipeDatas", this.SedimentPipeDatas);
          if (this.OnlyInitScrollFunStatus) {
            this.$nextTick(() => {
              this.ScrollUp2();
            });
          }
        })
        .catch((err) => {});
    },
    ScrollUp2() {
      var box = document.getElementById("detetion-box2");
      var con1 = document.getElementById("detetion-con1");
      var con2 = document.getElementById("detetion-con2");
      this.speed = 50;
      if (con1.offsetHeight >= box.offsetHeight) {
        con2.innerHTML = con1.innerHTML;
        var timer1 = setInterval(scrol, this.speed);
        function scrol() {
          /*判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0，否则就每个30默秒向上滚动1px */
          if (box.scrollTop >= con1.scrollHeight) {
            box.scrollTop = 0;
          } else {
            box.scrollTop++;
          }
          /*判断滚动的距离刚好为一条公告的高度时停掉定时器，隔1s之后重新启动计时器即可实现公告滚动停留效果 */
          if (box.scrollTop % 50 == 0) {
            clearInterval(timer1);
            clearTimeout(Timeout);
            var Timeout = setTimeout(() => {
              clearInterval(timer1);
              timer1 = setInterval(scrol, 50);
            }, 2000);
          }
          box.onmouseover = function () {
            clearTimeout(Timeout);
            clearInterval(timer1);
          };
          box.onmouseout = function () {
            clearTimeout(Timeout);
            clearInterval(timer1);
            timer1 = setInterval(scrol, 50);
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.infiniterollingtable {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: rgb(1, 20, 44);
  .infiniterollingtableContent {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    width: 90%;
    margin-top: 160px;
    .tableoutbox {
      width: 100%;
      // margin-top: 22px;
      overflow-x: hidden;
      .tableTileoutbox {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        width: 100%;

        .preTitle {
          width: calc((100%) / 7);
          height: 32px;
          background: #202938;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 32px;
          //text-indent: 10px;
        }
        .preTitle_Dw {
          width: 106px;
          height: 32px;
          background: #202938;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 32px;
          // text-indent: 10px;
        }
      }
      .tableoutbox_scrolloutbox {
        width: calc(100 + 22px);
        overflow-x: hidden;
        overflow-y: auto;
        max-height: 490px;
        &::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          background-color: #f5f5f5;
          background-color: transparent;
        }
        /*定义滚动条轨道 内阴影+圆角*/
        &::-webkit-scrollbar-track {
          //  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
          background-color: transparent;
        }
        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
          background-color: #575758;
          // background-color: transparent;
        }
        .tableoutbox_inbox {
          width: 100%;
          .itembox {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            width: 100%;
            height: 32px;
            cursor: pointer;
            &:nth-child(odd) {
            }
            &:nth-child(even) {
              background: #202938;
            }

            .itemdata {
              width: calc((100%) / 7);
              height: 32px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #fff;
              line-height: 32px;
              // text-indent: 10px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .itemdata_DW {
              display: flex;
              flex-flow: row nowrap;
              justify-content: center;
              align-items: center;

              height: 32px;
              cursor: pointer;
              pointer-events: auto;
              .SvgIconClass_DW {
                width: 16px;
                height: 16px;
                margin-right: 25px;
              }
              .SvgIconColor {
                color: red;
              }
            }
            .itemdata_TS {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              height: 32px;

              .itemdata_inbox {
                // width: 96px;
                // height: 49px;
                line-height: 16px;
                border-radius: 4px;
                //text-align: center;
                // text-indent: 40px;
                padding: 3px 10px;
              }
              .LH_activeColor {
                background: #0aa0de;
              }
              .QW_activeColor {
                background: #2fa652;
              }
              .ZD_activeColor {
                background: #de910a;
              }
              .YZ_activeColor {
                background: #cb563d;
              }
            }
            .itemdata_Plan {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              height: 32px;
              .itemdata_Plan_inbox {
                /*  width: 96px; */
                padding: 3px 10px;
                height: 16px;
                line-height: 16px;
                border-radius: 4px;
                //text-align: center;
                // text-indent: 24px;
              }
              .activeColor {
                background-color: #da2f2f;
              }
            }
            // .activeColor {
            //   color: #da2f2f;
            // }
          }
          .ActiveRowStyle {
            background: #0b79a5 !important;
          }
        }
      }
    }
  }
}
#detetion-box2 {
 // overflow: hidden;
}
</style>
