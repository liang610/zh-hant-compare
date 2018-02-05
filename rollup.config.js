import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/zhHantCompare.js',
  output: {
    file: 'dist/zhHantCompare.js',
    format: 'cjs'
  },
  plugins: [
    string({
      include: '**/*.data'
    }),
    uglify()
  ]
};
