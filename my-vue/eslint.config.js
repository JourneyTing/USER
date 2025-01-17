import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['node_modules/', '**/dist/**', '**/dist-ssr/**', '**/coverage/**', '*.min.js'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  skipFormatting,

  {
    rules: {
      eqeqeq: ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-consol': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  },
]
