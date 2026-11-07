// The site can run at the domain root (www.greutergarten.ch) or below a
// sub-path such as https://<name>.github.io/<repo>/. Vite's `base` (set via
// the BASE_PATH env variable at build time) provides that prefix.

/** "" for the domain root, otherwise e.g. "/greuter-website". */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** Prefixes a root-relative public file path ("/assets/…") with the base. */
export const asset = (path: string) => (path.startsWith('/') ? BASE + path : path)

/** Removes the base from a browser pathname, e.g. for route lookups. */
export const stripBase = (pathname: string) =>
  BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname
