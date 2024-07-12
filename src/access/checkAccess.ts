import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 检查权限（判断当前登录用户是否满足权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess : number) => {
  // 权限值越小，其权限越大
  const currentUserRole = loginUser.role;
  return currentUserRole <= needAccess;
};

export default checkAccess;
