export default {}

declare module 'nunjucks' {
  export interface ConfigureOptions {
    dev?: boolean | undefined
  }
}
