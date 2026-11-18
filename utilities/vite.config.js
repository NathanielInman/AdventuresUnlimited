import vue from '@vitejs/plugin-vue';

// The built app lives under the docs site at /AdventuresUnlimited/tools/.
// Set TOOLS_BASE to build for another path. The dev server (development mode)
// uses /; vite preview serves the build at the same base it was built with.
export default ({ mode }) => ({
  root: 'src',
  base: mode === 'development' ? '/' : (process.env.TOOLS_BASE || '/AdventuresUnlimited/tools/'),
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  plugins: [vue()]
});
