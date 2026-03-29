module.exports = {
  presets: ['module:@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
