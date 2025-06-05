import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      include: ['index.js', 'lib/**/*.js']
    },
  },
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, '.')}/`,
      '~lib': `${path.resolve(__dirname, 'lib')}/`,
      '~mocks': `${path.resolve(__dirname, 'tests/mocks')}/`,
    },
  },
})
