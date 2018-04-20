const { strokeCompare, strokeEncode, pinyinCompare, pinyinEncode } = require('./dist/index.min.js');

const array = ['臺灣', '台南', '台中', '台北', '花蓮', '亞洲', '歐洲', '宜蘭', '宜居', '臺北', '美洲', 'a', null, undefined, '無敵'];

function compare(a, b) {
  if (a == null) return 1;
  return a === b ? 0 : a > b ? 1 : -1;
}

const array1 = array.slice();
array1.sort(strokeCompare);
console.log(array1);

const array2 = array.map(w => ({ w, code: strokeEncode(w) }));
array2.sort((a, b) => compare(a.code, b.code) );
console.log(array2);

const array3 = array.slice();
array3.sort(pinyinCompare);
console.log(array3);

const array4 = array.map(w => ({ w, code: pinyinEncode(w) }));
array4.sort((a, b) => compare(a.code, b.code) );
console.log(array4);