import { UNICODE_TO_PINYIN } from './data.js';

function zhHantEncode(s) {
  if (s == null) return s;

  const str = (typeof s === 'string') ? s : String(s);
  var code = '';

  if (str.length === 0) return str;

  var n = 0;
  while(true) {
    var p = str.codePointAt(n);
    var k = UNICODE_TO_PINYIN[p.toString(32)];

    var c = String.fromCodePoint(p);

    if (k != null) {
      if (k.length === 1) {
        code = code + '0' + k + c;
      } else {
        code = code + k + c;
      }
    } else {
      code = code + '00' + c;
    }

    if (p > 0xffff) {
      n += 2;
    } else {
      n += 1;
    }
    if (n >= str.length) break;
  }
  return code;
}

export default zhHantEncode;
