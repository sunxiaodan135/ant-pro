
<!-- 函数式组件不能使用this   权限校验组件注册成全局组件-->
<script>
import {check} from '@/utils/auth';
 export default {
  functional:true,
  props:{
      authority:{
          type:Array,
          required:true
      }
  },
  render(h,context){
      const {props,scopedSlots}=context
      return check(props.authority) ? scopedSlots.default():null
  }
}
</script>
 <style scoped>
</style>