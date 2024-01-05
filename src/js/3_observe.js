import Observer from './2_Observer'
/*
  Observe作用：确保data的每层是响应式
  1 2 3是强关联的
  __ob__的值是Observer实例，这看起来添加__ob__没有意义，实则通过__ob__是否存在来判断是否已经是响应式了
  且通过ob __ob__ 可以得到Observer的实例，从而可以调用Observer的方法
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