import S from "@sanity/desk-tool/structure-builder";

// prettier-ignore
export const components = S.listItem()
  .title('Components')
  .showIcon(false)
  .child(
    S.list()
    .title('Components')
    .items([
      S.listItem()
        .title('Banner')
        .schemaType('banner')
        .showIcon(false)
        .child(S.documentTypeList('banner')),
      S.listItem()
        .title('Cards')
        .schemaType('cards')
        .showIcon(false)
        .child(S.documentTypeList('cards')),
      S.listItem()
        .title('Hero')
        .schemaType('hero')
        .showIcon(false)
        .child(S.documentTypeList('hero')),
      S.listItem()
        .title('Newsletter')
        .schemaType('newsletter')
        .showIcon(false)
        .child(S.documentTypeList('newsletter')),
      S.listItem()
        .title('Quote')
        .schemaType('quote')
        .showIcon(false)
        .child(S.documentTypeList('quote'))
    ])
  )
