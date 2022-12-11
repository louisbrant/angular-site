export interface TableInterface {
  header: string
  headerName: string
  values: string
}

export interface TableHeaderInterface {
  value?: string
  name: string
  template?: string
  styles?: any
}

export interface TableDataInterface {

}

export enum ROW_TYPES {
  string,
  date,
  country,
  money,
}
