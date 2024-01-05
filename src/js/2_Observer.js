import {def} from './4_utils'
import defineReactive from './1_defineReactive'

export default class Observer{
  constructor(value){
    // value就是data，给data绑__ob__属性，值为Observer实例，且__ob__不可枚举
    def(value,'__ob__',this,false);
    // 构造函数内调用walk，new时就会自动执行walk
    this.walk(value);
  }
  // 遍历data，将data的每个属性都变成响应式，即给每个属性都绑定getter和setter
  walk(value){
    for(let k in value){
      defineReactive(value,k);
    }
  }
};