import {
  QueryFields,
  QueryFilter,
  QueryFilterArr,
  QueryJoin,
  QueryJoinArr,
  QuerySort,
  QuerySortArr,
  SCondition
} from '@nestjsx/crud-request'
type TFilter = QueryFilter | QueryFilterArr | Array<QueryFilter | QueryFilterArr>
type TJoin = QueryJoin | QueryJoinArr | Array<QueryJoin | QueryJoinArr>
type TSort = QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>
export class CurdParams {
  private params!: SCondition
  private filter: Array<QueryFilter | QueryFilterArr> = []
  private or: Array<QueryFilter | QueryFilterArr> = []
  private fields!: QueryFields
  private join: Array<QueryJoin | QueryJoinArr> = []
  private sort: Array<QuerySort | QuerySortArr> = []
  private limit!: number
  private offset!: number
  private cache!: boolean

  search(params: SCondition) {
    this.params = params
    return this
  }

  setFilter(filter: TFilter) {
    if (Array.isArray(filter)) {
      this.filter = [...this.filter, ...filter]
    } else if (filter) {
      this.filter = [...this.filter, filter]
    }
    return this
  }

  setOr(or: TFilter) {
    if (Array.isArray(or)) {
      this.or = [...this.or, ...or]
    } else if (or) {
      this.or = [...this.or, or]
    }
    return this
  }

  select(fields: QueryFields) {
    this.fields = fields
    return this
  }

  setJoin(join: TJoin) {
    if (Array.isArray(join)) {
      this.join = [...this.join, ...join] as Array<QueryJoin | QueryJoinArr>
    } else if (join) {
      this.join = [...this.join, join]
    }
    return this
  }

  sortBy(sort: TSort) {
    if (Array.isArray(sort)) {
      this.sort = [...this.sort, ...sort] as Array<QuerySort | QuerySortArr>
    } else if (sort) {
      this.sort = [...this.sort, sort]
    }
    return this
  }

  setLimit(limit: number) {
    this.limit = limit
    return this
  }

  setOffset(offset: number) {
    this.offset = offset
    return this
  }

  setResetCache(cache: boolean) {
    this.cache = cache
    return this
  }

  createBuilderParams() {
    return {
      params: this.params,
      fields: this.fields,
      search: this.search,
      join: this.join,
      sort: this.sort,
      offset: this.offset,
      limit: this.limit,
      resetCache: this.cache
    }
  }
}
