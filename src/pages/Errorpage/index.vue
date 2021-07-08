<template>
  <div class="Errorpage">
    <div class="SvgIconClassoutbox">
      <SvgIcon :name="'403'" :title="''" class="SvgIconClassIshow" />
    </div>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/SvgIcon";
export default {
  name: "Errorpage",
  components:{
    SvgIcon
  }
};
</script>
<style lang="scss" scoped>
.Errorpage {
  width: 100%;
  height: 100vh;
  background: #F5F5F5;
  .SvgIconClassoutbox {
    width: 100%;
    height: 100vh;
    .SvgIconClassIshow {
      width: 100%;
      height: 100vh;
    }
  }
}
</style>
 