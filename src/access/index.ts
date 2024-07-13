import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import message from "@arco-design/web-vue/es/message";

router.beforeEach(async (to, from, next) => {
  // 当前用户
  const currentUser = store.getters["user/getUser"];
  // console.log('currentUser=', currentUser);
  // 需要有的权限
  const needAccess = (to.meta?.role as number) ?? ACCESS_ENUM.NOT_LOGIN_ROLE;
  // 判断当前用户是否满足条件
  if(!checkAccess(currentUser, needAccess)){
    message.error("非法访问！");
    next(false);
  }
  // 放行
  next();
});
