# vue-eslint-parser-template-tokenizer-pug

This is an internal library. If you just want to lint your pug templates, use [eslint-plugin-vue-pug](https://github.com/rashfael/eslint-plugin-vue-pug).

## Development

```sh
npm install
npm run setup
```

## Open Issues

### Parse errors
Adding errors to the `templateBody.errors` array doesn't actually seem to affect linting at all, but I found this https://github.com/vuejs/eslint-plugin-vue/blame/master/lib/rules/no-parsing-error.js/
