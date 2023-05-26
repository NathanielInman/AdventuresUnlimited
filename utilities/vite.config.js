import vue from '@vitejs/plugin-vue';

export default {
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist'
  },
  plugins: [vue()]
};
