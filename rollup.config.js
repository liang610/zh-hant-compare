import string from 'rollup-plugin-string';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.min.js',
    format: 'cjs'
  },
  plugins: [
    string({
      include: '**/*.data'
    }),
    uglify()
  ]
};
