import S from "@sanity/desk-tool/structure-builder";

// prettier-ignore
export const dimensions = S.listItem()
  .title('Dimensions')
  .showIcon(false)
  .child(
    S.list()
      .title('Dimensions')
      .items([
        S.listItem()
          .title('Marketing regions')
          .schemaType('marketingRegion')
          .showIcon(false)
          .child(
            S.documentTypeList('marketingRegion')
              .defaultOrdering([{ field: 'title', direction: 'asc'}])
          ),
        S.listItem()
          .title('Affinities')
          .schemaType('affinity')
          .showIcon(false)
          .child(
            S.documentTypeList('affinity')
              .defaultOrdering([{ field: 'title', direction: 'asc'}])
          )
      ])
  )
