export const def = function(obj,key,value,enumerable){
  Object.defineProperty(obj,key,{
    value,
    enumerable,
    writeable:true,
    configurable:true
  })
}
/*
  我需要__ob__是不可枚举
  由于__ob__会被添加到实例自身，其值指向Observer实例，我们不希望遍历实例时会遍历到__ob__，所以需要将其设置为不可枚举
*/