import { UNICODE_TO_STROKE } from './data.js';

function strokeEncode(s) {
  if (s == null) return s;

  const str = (typeof s === 'string') ? s : String(s);
  var code = '';

  if (str.length === 0) return str;

  var n = 0;
  while(true) {
    var cp = str.codePointAt(n);
    var ch = String.fromCodePoint(cp);
    var k = UNICODE_TO_STROKE[ch];

    if (k != null) {
      code = code + k;
    } else {
      code = code + ch;
    }

    if (cp > 0xffff) {
      n += 2;
    } else {
      n += 1;
    }
    if (n >= str.length) break;
  }
  return code;
}

export default strokeEncode;
