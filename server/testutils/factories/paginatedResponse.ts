import { Factory } from 'fishery'
import { PaginatedResponse } from '../../@types/ui'

export default Factory.define<PaginatedResponse<unknown>>(() => ({
  data: [] as Array<unknown>,
  pageNumber: '1',
  totalPages: '10',
  totalResults: '100',
  pageSize: '10',
}))
