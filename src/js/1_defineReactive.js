import observe from './3_observe'
import Dep from './6_Dep'

export default function defineReactive(data,key,val){
  // 实例化dep
  const dep = new Dep();
  // 如果只传了data和key，那么val就是data[key]
  if(arguments.length==2){
    val=data[key];
  }
  // val可能是个对象，所以需要递归调用observe
  let childOb = observe(val);

  Object.defineProperty(data,key,{
    enumerable:true,
    configurable:true,// 可被delete
    get(){
      console.log(`读取${key}属性`);
      // console.log('全局有了Dep.target',Dep.target);
      if(Dep.target){
        dep.depend();
        if(childOb){
          childOb.dep.depend();
          // console.log('childOb',childOb);
          // console.log('childOb.dep',childOb.dep);
        }
      }
      return val;
    },
    set(newValue){
      console.log(`设置${key}属性为${newValue}`);
      if(val===newValue) return;
      val=newValue;
      // 新的值也要observe
      childOb = observe(newValue);
      // 发布订阅模式，通知dep
      dep.notify();
    }
  })
};