var unicodeToStroke = require('./unicode_to_stroke.json');

function isNil(value) {
  return value == null
}

function localeCompare(s1, s2) {
  return s1.localeCompare(s2, ['en-US', 'zh-Hant-TW'], { sensitivity: 'variant' });
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
    var n1 = 0, n2 = 0;
    while(true) {
      var p1 = s1.codePointAt(n1);
      var p2 = s2.codePointAt(n2);

      var k1 = unicodeToStroke[p1.toString(32)];
      var k2 = unicodeToStroke[p2.toString(32)];

      var c;
      if (!isNil(k1) && !isNil(k2)) {
        c = k1 - k2;
        if (c === 0) {
          c = localeCompare(String.fromCodePoint(p1), String.fromCodePoint(p2));
        }
      } else {
        c = localeCompare(String.fromCodePoint(p1), String.fromCodePoint(p2));
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

module.exports = zhHantCompare;
exports.default = zhHantCompare;
