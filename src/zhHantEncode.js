import unicodeToStrokeData from './unicode_to_stroke.data';

const unicodeToStroke = JSON.parse(unicodeToStrokeData);

const MAPPING = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function zhHantEncode(s) {
  if (s == null) return s;

  const str = (typeof s === 'string') ? s : String(s);
  var code = '';

  if (str.length === 0) return str;

  var n = 0;
  while(true) {
    var p = str.codePointAt(n);
    var k = unicodeToStroke[p.toString(32)];

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

export default zhHantEncode;
