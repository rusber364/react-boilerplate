declare module '*.module.css' {
  const exports: { [exportName: string]: string }
  export default exports
}

declare module '*.module.styl' {
  const exports: { [exportName: string]: string }
  export default exports
}
