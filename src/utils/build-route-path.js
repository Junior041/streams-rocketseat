export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)')
    const patchRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    return patchRegex
}