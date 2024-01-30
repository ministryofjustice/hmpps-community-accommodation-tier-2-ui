import { type Pagination, pagination } from './pagination'

describe('pagination', () => {
  it('should be empty when there are no pages', () => {
    expect(pagination(1, 0, '?a=b&')).toEqual<Pagination>({})
  })

  it('should be empty when there’s only 1 page', () => {
    expect(pagination(1, 1, '?a=b&')).toEqual<Pagination>({})
  })

  it('should work on page 1 of 2', () => {
    expect(pagination(1, 2, '?a=b&')).toEqual<Pagination>({
      next: { href: '?a=b&page=2' },
      items: [
        { number: 1, href: '?a=b&page=1', current: true },
        { number: 2, href: '?a=b&page=2' },
      ],
    })
  })

  it('should work on page 2 of 2', () => {
    expect(pagination(2, 2, '?a=b&')).toEqual<Pagination>({
      previous: { href: '?a=b&page=1' },
      items: [
        { number: 1, href: '?a=b&page=1' },
        { number: 2, href: '?a=b&page=2', current: true },
      ],
    })
  })

  it('should work on page 2 of 3', () => {
    expect(pagination(2, 3, '?a=b&')).toEqual<Pagination>({
      previous: { href: '?a=b&page=1' },
      next: { href: '?a=b&page=3' },
      items: [
        { number: 1, href: '?a=b&page=1' },
        { number: 2, href: '?a=b&page=2', current: true },
        { number: 3, href: '?a=b&page=3' },
      ],
    })
  })

  it('should work on page 1 of 7', () => {
    expect(pagination(1, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1', current: true },
      { number: 2, href: '?a=b&page=2' },
      { ellipsis: true },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 2 of 7', () => {
    expect(pagination(2, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2', current: true },
      { number: 3, href: '?a=b&page=3' },
      { ellipsis: true },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 3 of 7', () => {
    expect(pagination(3, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2' },
      { number: 3, href: '?a=b&page=3', current: true },
      { number: 4, href: '?a=b&page=4' },
      { ellipsis: true },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 4 of 7', () => {
    expect(pagination(4, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2' },
      { number: 3, href: '?a=b&page=3' },
      { number: 4, href: '?a=b&page=4', current: true },
      { number: 5, href: '?a=b&page=5' },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 5 of 7', () => {
    expect(pagination(5, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2' },
      { ellipsis: true },
      { number: 4, href: '?a=b&page=4' },
      { number: 5, href: '?a=b&page=5', current: true },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 6 of 7', () => {
    expect(pagination(6, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2' },
      { ellipsis: true },
      { number: 5, href: '?a=b&page=5' },
      { number: 6, href: '?a=b&page=6', current: true },
      { number: 7, href: '?a=b&page=7' },
    ])
  })

  it('should work on page 7 of 7', () => {
    expect(pagination(7, 7, '?a=b&')).toHaveProperty('items', [
      { number: 1, href: '?a=b&page=1' },
      { number: 2, href: '?a=b&page=2' },
      { ellipsis: true },
      { number: 6, href: '?a=b&page=6' },
      { number: 7, href: '?a=b&page=7', current: true },
    ])
  })
})
