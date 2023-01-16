# `codemirror-lang-janet`

Very minimal language support for [Janet](https://janet-lang.org).

```
$ yarn run prepare
$ yarn test
```

Note that quoted forms are not highlighted correctly, and there are some incorrect parses if you use illegal symbols like `1a` -- that will parse as a number and an identifier, instead of as a single (illegal) identifier.
