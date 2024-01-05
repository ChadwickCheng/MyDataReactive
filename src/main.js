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
};

const ob = observe(obj);
obj.a.m = 10;
console.log(obj.c.d.e.f);
console.log('ob',ob);
console.log('obj',obj);