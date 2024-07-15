<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <my-footer/>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<!--scoped：使样式局限于本类-->
<style scoped>
#basicLayout {
}

#basicLayout .header {
  /* margin-bottom: 16px; */
  box-shadow: #eee 1px 1px 5px;
  /* height: 50px; */
}

#basicLayout .content {
  margin-bottom: 16px;
  padding: 15px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 2px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
<script>
import GlobalHeader from "@/components/GlobalHeader";
import MyFooter from "@/components/Footer.vue"
export default {
  components: { GlobalHeader ,MyFooter},
};
</script>
