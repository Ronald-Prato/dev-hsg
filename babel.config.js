module.exports = {
  "presets": [
    [
      'next/babel',
      {
        'styled-jsx': {
          optimizeForSpeed: true,
          plugins: [ 'styled-jsx-plugin-sass' ]
        }
      },

    ],
    [
      '@babel/preset-env', { targets: { node: 'current' } }
    ],
    '@babel/preset-typescript',
  ]
}

