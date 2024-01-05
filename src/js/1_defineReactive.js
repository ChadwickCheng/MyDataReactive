import observe from './3_observe'

export default function defineReactive(data,key,val){
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
      return val;
    },
    set(newValue){
      console.log(`设置${key}属性为${newValue}`);
      if(val===newValue) return;
      val=newValue;
      // 新的值也要observe
      childOb = observe(newValue);
    }
  })
};