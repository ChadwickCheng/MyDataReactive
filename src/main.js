import observe from './js/3_observe'
import Watcher from './js/7_Watcher'

var obj = {
  a: {
      m: {
          n: 5
      }
  },
  b: 10,
  c: {
      d: {
          e: {
              f: 6666
          }
      }
  },
  g:[22,33,44,55]
};

const ob = observe(obj);
// obj.a.m = 10;
// console.log(obj);
// console.log('ob',ob);
// console.log('obj',obj);

// obj.g.splice(2,1,666);
// console.log('obj.g',obj.g);
// const xxx = obj.g.pop();
// console.log('xxx',xxx);

new Watcher(obj,'a.m.n',val=>{
  console.log('watcher1',val);
})
// obj.a.m.n = 88;
// console.log('obj',obj);