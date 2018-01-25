const unicodeToStroke = require('./unicode_to_stroke.json');

function isNil(value) {
  return value == null
}

function zhHantCompare(s1, s2) {
  if (isNil(s1) || isNil(s2)) {
    if (isNil(s1) && isNil(s2)) {
      return 0;
    } else if (isNil(s1)) {
      return -1;
    }

    return 1;
  }

  if (typeof s1 === 'string' && typeof s2 === 'string') {
    let n1 = 0, n2 = 0;
    while(true) {
      const p1 = s1.codePointAt(n1);
      const p2 = s2.codePointAt(n2);

      const k1 = unicodeToStroke[p1.toString(16)];
      const k2 = unicodeToStroke[p2.toString(16)];

      let c;
      if (isNil(k1) || isNil(k2)) {
        c = String.fromCodePoint(p1).localeCompare(String.fromCodePoint(p2), ['en-US', 'zh-Hant-TW'], { sensitivity: 'base' });
      } else {
        c = k1 - k2;
      }
      if (c !== 0) {
        return c;
      }
      if (p1 > 0xffff) {
        n1 += 2;
      } else {
        n1 += 1;
      }
      if (p2 > 0xffff) {
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

    return s1.localeCompare(s2, ['en-US', 'zh-Hant-TW'], { sensitivity: 'base' });
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

module.exports = zhHantCompare;
exports.default = zhHantCompare;
