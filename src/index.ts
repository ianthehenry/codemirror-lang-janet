import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const JanetLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Form: delimitedIndent({closing: ")", align: false}),
        Tuple: delimitedIndent({closing: "]", align: false}),
        Array: delimitedIndent({closing: "]", align: false}),
        Struct: delimitedIndent({closing: "}", align: false}),
        Table: delimitedIndent({closing: "}", align: false}),
      }),
      foldNodeProp.add({
        Form: foldInside,
        Tuple: foldInside,
        Array: foldInside,
        Struct: foldInside,
        Table: foldInside,
      }),
      styleTags({
        Identifier: t.name,
        Boolean: t.bool,
        Number: t.number,
        String: t.string,
        LineComment: t.lineComment,
        Nil: t.null,
        Keyword: t.atom,
        "( )": t.paren,
        "@[ [ ]": t.squareBracket,
        "@{ { }": t.brace,
        "Pipe Comma Semicolon Quote Quasiquote": t.punctuation,
        Special: t.keyword,
      })
    ]
  }),
  languageData: {
    commentTokens: { line: "#" },
    closeBrackets: {
      brackets: ['(', '[', '{', '"', '`']
    },
  }
})

export function janet() {
  return new LanguageSupport(JanetLanguage)
}
