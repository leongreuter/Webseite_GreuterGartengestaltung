import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { BASE } from './lib/base'

export { pages, notFoundMeta, localBusinessJsonLd } from './data/seo'
export { SITE_URL } from './data/site'

/** Renders one route to HTML for static pre-rendering. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={BASE + url} basename={BASE || undefined}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
