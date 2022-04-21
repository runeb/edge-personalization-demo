import S from "@sanity/desk-tool/structure-builder";

// prettier-ignore
export const home = S.listItem()
  .title('Home')
  .schemaType('home')
  .showIcon(false)
  .child(
    S.editor()
      .title('Home')
      .schemaType('home')
      .documentId('home')
  )
