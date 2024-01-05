import {def} from './4_utils'
import defineReactive from './1_defineReactive'
import {arrayMethods} from './5_array'
import observe from './3_observe'
import Dep from './6_Dep'

/*
  Observer类的目的：将一个正常的Object转换为每个层级的属性都是响应式的Object
*/

export default class Observer{
  constructor(value){
    // 给Observer实例增加一个dep属性
    this.dep = new Dep();
    // value就是data，给data绑__ob__属性，值为Observer实例，且__ob__不可枚举
    def(value,'__ob__',this,false);
    // 判断value是数组还是对象
    if(Array.isArray(value)){
      // 如果是数组，将value的原型指向arrayMethods,从而可以改写数组的七大方法
      Object.setPrototypeOf(value,arrayMethods);
      this.observeArray(value);
    }else{
      // 构造函数内调用walk，new时就会自动执行walk
      this.walk(value);
    }
  }
  // 遍历data，将data的每个属性都变成响应式，即给每个属性都绑定getter和setter
  walk(value){
    for(let k in value){
      defineReactive(value,k);
    }
  }
  // 数组响应式
  observeArray(arr){
    for(let i=0,l=arr.length;i<1;i++){
      observe(arr[i]);
    }
  }
};