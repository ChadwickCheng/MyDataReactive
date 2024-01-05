import observe from './js/3_observe'

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
// console.log(obj.c.d.e.f);
// console.log('ob',ob);
// console.log('obj',obj);

obj.g.splice(2,1,666);
console.log('obj.g',obj.g);