import S from "@sanity/desk-tool/structure-builder";

// prettier-ignore
export const pages = S.listItem()
  .title('Pages')
  .schemaType('page')
  .showIcon(false)
  .child(
    S.documentTypeList('page')
      .defaultOrdering([{ field: 'title', direction: 'asc'}])
  )
