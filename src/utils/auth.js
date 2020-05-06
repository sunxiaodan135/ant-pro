export function getCurrentAuthority(){
    //返回当前用户的身份
    return ["admin"];
}
//判断当前权限是否包含在某权限
export function check(authority){
    const current=getCurrentAuthority();
    return current.some(item=>authority.includes(item));
}

//登陆验证，具体看项目要求
export function isLogin(){
    const current=getCurrentAuthority();
    return current && current[0]!=="guest";
}