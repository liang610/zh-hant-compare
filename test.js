const { strokeCompare, strokeEncode, pinyinCompare, pinyinEncode } = require('./dist/index.min.js');

const array = ['臺灣', '台南', '台中', '台北', '亞洲', '歐洲', '臺北', '美洲', 'a', null, undefined, '無敵'];

const array1 = array.slice();
array1.sort(strokeCompare);
console.log(array1);

const array2 = array.map(w => strokeEncode(w))
array2.sort();
console.log(array2);

const array3 = array.slice();
array3.sort(pinyinCompare);
console.log(array3);

const array4 = array.map(w => pinyinEncode(w))
array4.sort();
console.log(array4);