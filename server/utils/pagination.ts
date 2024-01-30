export type PaginationPreviousOrNext = {
  href: string
  text?: string
  attributes?: Record<string, string>
}

export type PaginationItem =
  | {
      number: number
      href: string
      current?: boolean
    }
  | {
      ellipsis: true
    }

export type Pagination = {
  previous?: PaginationPreviousOrNext
  items?: Array<PaginationItem>
  next?: PaginationPreviousOrNext
  landmarkLabel?: string
}

/**
 * Produces parameters for GOV.UK Pagination component macro
 * NB: `page` starts at 1
 *
 * Accessibility notes:
 * - set `landmarkLabel` on the returned object otherwise the navigation box is announced as "results"
 * - set `previous.attributes.aria-label` and `next.attributes.aria-label` on the returned object if "Previous" and "Next" are not clear enough
 */
export function pagination(currentPage: number, pageCount: number, hrefPrefix: string): Pagination {
  const params: Pagination = {}

  if (!pageCount || pageCount <= 1) {
    return params
  }

  if (currentPage !== 1) {
    params.previous = {
      href: `${hrefPrefix}page=${currentPage - 1}`,
    }
  }
  if (currentPage < pageCount) {
    params.next = {
      href: `${hrefPrefix}page=${currentPage + 1}`,
    }
  }

  let pages: Array<number | null>
  if (currentPage >= 5) {
    pages = [1, 2, null, currentPage - 1, currentPage]
  } else {
    pages = [1, 2, 3, 4].slice(0, currentPage)
  }
  const maxPage = Math.max(currentPage, pages.at(-1))
  if (maxPage === pageCount - 1) {
    pages.push(pageCount)
  } else if (maxPage === pageCount - 2) {
    pages.push(pageCount - 1, pageCount)
  } else if (maxPage === pageCount - 3) {
    pages.push(maxPage + 1, pageCount - 1, pageCount)
  } else if (maxPage <= pageCount - 4) {
    pages.push(maxPage + 1, null, pageCount - 1, pageCount)
  }

  params.items = pages.map((somePage: number | null): PaginationItem => {
    if (somePage) {
      const item: PaginationItem = {
        number: somePage,
        href: `${hrefPrefix}page=${somePage}`,
      }
      if (somePage === currentPage) {
        item.current = true
      }
      return item
    }
    return { ellipsis: true }
  })

  return params
}
