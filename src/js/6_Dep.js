/*
  存放着watcher实例的数组
  给响应式对象的每个对象层级添加一个Dep实例
  更改数据时触发notify
*/

let uid = 0;
export default class Dep{
  constructor(){
    console.log('Dep desu');
    // 构造一次就给实例化的Dep增加一个id
    this.id = uid++;
    // 存储订阅者，存放着watcher实例
    this.subs = [];
  }

  // 添加订阅
  addSub(sub){
    this.subs.push(sub);
  }

  // 添加依赖
  depend(){
    // Dep.target就是watcher实例 自己指定的全局唯一的全局位置
    if(Dep.target){
      this.addSub(Dep.target);
    }
    console.log('subs',this.subs);
  }

  notify(){
    console.log('notify desu');
    // 浅拷贝一份
    const subs = this.subs.slice();
    console.log('subs length',subs.length);
    // 遍历
    for(let i=0,l=subs.length;i<l;i++){
      // 调用watcher的update方法
      subs[i].update();
    }
  }
};