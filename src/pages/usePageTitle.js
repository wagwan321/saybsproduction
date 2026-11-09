import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | SAYBS Wedding Photography & Films` : 'SAYBS | Wedding Photography & Films, Lebanon'
  }, [title])
}
