import { UNICODE_TO_STROKE } from './data.js';

const MAPPING = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function strokeEncode(s) {
  if (s == null) return s;

  const str = (typeof s === 'string') ? s : String(s);
  var code = '';

  if (str.length === 0) return str;

  var n = 0;
  while(true) {
    var p = str.codePointAt(n);
    var k = UNICODE_TO_STROKE[p.toString(32)];

    var c = String.fromCodePoint(p);

    if (k != null) {
      code = code + MAPPING.charAt(k) + c;
    } else {
      code = code + '0' + c;
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

export default strokeEncode;
