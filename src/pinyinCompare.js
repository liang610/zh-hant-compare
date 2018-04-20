import { UNICODE_TO_PINYIN } from './data.js';

function isNil(value) {
  return value == null || (typeof value === 'string' && value.length === 0);
}

function localeCompare(s1, s2) {
  return s1.localeCompare(s2, ['en-US', 'zh-Hans-CN'], { sensitivity: 'variant' });
}

function pinyinCompare(s1, s2) {
  if (isNil(s1) && isNil(s2)) {
    return 0;
  } else if (isNil(s1)) {
    return 1;
  } else if (isNil(s2)) {
    return -1;
  }

  if (typeof s1 === 'string' && typeof s2 === 'string') {
    var n1 = 0, n2 = 0;
    while(true) {
      var cp1 = s1.codePointAt(n1);
      var cp2 = s2.codePointAt(n2);
      var ch1 = String.fromCodePoint(cp1);
      var ch2 = String.fromCodePoint(cp2);

      var k1 = UNICODE_TO_PINYIN[ch1];
      var k2 = UNICODE_TO_PINYIN[ch2];

      var c;
      if (!isNil(k1) && !isNil(k2)) {
        c = k1 === k2 ? 0 : k1 > k2 ? 1 : -1;
      } else {
        c = localeCompare(ch1, ch2);
      }
      if (c !== 0) {
        return c;
      }
      if (cp1 > 0xffff) {
        n1 += 2;
      } else {
        n1 += 1;
      }
      if (cp2 > 0xffff) {
        n2 += 2;
      } else {
        n2 += 1;
      }
      if (n1 >= s1.length && n2 >= s2.length) {
        return 0;
      } else if (n1 >= s1.length) {
        return -1;
      } else if (n2 >= s2.length) {
        return 1;
      }
    }

    return localeCompare(s1, s2);
  }

  if (typeof s1 === 'number' && typeof s2 === 'string') {
    return -1;
  }

  if (typeof s1 === 'string' && typeof s2 === 'number') {
    return 1;
  }

  if (typeof s1 === 'number' && typeof s2 === 'number') {
    return s1 - s2;
  }

  return s1 - s2;
}

export default pinyinCompare;
