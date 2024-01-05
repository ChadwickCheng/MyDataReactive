import {def} from './4_utils'

/*
  数组响应式通过改写七个方法实现
  写vue2时不能直接改数组的元素也是因为这个原因
*/

// 获取Array.prototype
const arrayPrototype = Array.prototype;
// 以Array.prototype为原型创建arrayMethods对象 arrayMethods.__proto__ = Array.prototype Array.prototype不变
export const arrayMethods = Object.create(arrayPrototype);
// 改写的七大方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
// 开始改写
methodsNeedChange.forEach(methodName=>{
  // 备份原来的方法.虽然是改写，但实际改变数组还是需要调用原来的方法
  const original = arrayPrototype[methodName];
  // 将arrayMethods的这些方法改写
  def(arrayMethods,methodName,function(){
    // 使用原来的方法.this指向调用这个方法的数组,arguments是传给这个方法的参数
    const result = original.apply(this,arguments);
    // 将类数组arguments转为数组。因为在使用splice时，arguments是类数组
    const args = [...arguments];
    // 获得Observer实例从而可以调用Observer的方法
    const ob = this.__ob__;
    // 有三种方法push unshift splice会插入新值，要对新值进行observe
    let inserted = [];
    switch(methodName){
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // splice的第三个参数是插入的新值 splice(下标，个数，新值)
        inserted = args.slice(2);
        break;
    }
    // 对新值进行observe
    if(inserted) ob.observeArray(inserted);
    console.log(`调用了${methodName}方法`);
    
    return result;
  },false)
})