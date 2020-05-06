import {check} from '@/utils/auth';
function install(Vue,options={}){
    Vue.directive(options.name || 'auth',{
        inserted(el,binding){
            if(!check(binding.value)){
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    })
}
// 权限指令的弊端是不能动态改变权限，因为移除后不能恢复
export default {install};