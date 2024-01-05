import Observer from './2_Observer'
/*
  Observe作用：确保data的每层是响应式
  1 2 3是强关联的
  __ob__的值是Observer实例，这看起来添加__ob__没有意义，实则通过__ob__是否存在来判断是否已经是响应式了
*/
export default function(value){
  if(typeof value!='object') return;
  var ob;
  if(typeof value.__ob__!=='undefined'){
    ob=value.__ob__;
  }else{
    ob = new Observer(value);
  }
  return ob;
}