import Dep from './6_Dep'

// 观察者

let uid = 0;
export default class Watcher{
  // target是响应式对象，expression是表达式(a.m.n)，callback是回调函数
  constructor(target,expression,callback){
    console.log('Watcher desu');
    this.id = uid++;
    // target是响应式对象
    this.target = target;
    // parsePath返回一个函数
    this.getter = parsePath(expression);
    this.callback = callback;
    // 获得target[expression]的值,可能是a.m.n的值，也可能是undefined
    this.value = this.get();
  }

  get(){
    // 进入依赖收集阶段，让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    // obj是响应式对象
    const obj = this.target;
    let value;

    // 只要能找就一直找,因为可能obj没有a属性，也没有a.m属性，也没有a.m.n属性
    try{
      // value是a.m.n的值
      value = this.getter(obj);
    }finally{
      // 最终把Dep.target设置为null
      Dep.target = null;
    }
    // 返回值可能是a.m.n的值，也可能是undefined
    return value;
  }

  // 暴露给外部的接口 update->run->getAndInvoke
  update(){
    this.run();
  }
  run(){
    this.getAndInvoke(this.callback);
  }
  // 如果新值和旧值不一样，或者新值是个对象，那么就调用回调函数 类似于监听器
  getAndInvoke(cb){
    const value = this.get();
    if(value!==this.value||typeof value=='object'){
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target,value,oldValue);
    }
  }

};

// 解析a.m.n这样的表达式，返回一个函数，再传入源数据对象，得到a.m.n的值
function parsePath(str){
  let segments = str.split('.');
  return obj=>{
    for (let i=0;i<segments.length;i++){
      if(!obj) return;
      obj = obj[segments[i]]
    }
    return obj;
  };
}