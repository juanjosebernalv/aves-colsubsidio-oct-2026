'use client'

import { useState, useEffect } from 'react'
import { fetchBirdImageUrl } from '@/lib/birdMediaService'

interface BirdImageState {
  imageUrl: string | null
  loading: boolean
}

const REAL_IMAGE_PREFIXES = [
  'https://inaturalist-open-data.s3.amazonaws.com',
  'https://static.inaturalist.org',
  'https://upload.wikimedia.org',
  'https://cdn.download.ams.birds.cornell.edu',
  'https://www.serpar.gob.pe',
  'http://avesdeperu.org',
  'https://avesdeperu.org',
  'https://i0.wp.com/birdscolombia.com',
  'https://birdscolombia.com',
]

function isRealImageUrl(url: string): boolean {
  return REAL_IMAGE_PREFIXES.some((prefix) => url.startsWith(prefix))
}

export function useBirdImage(scientificName: string, photoUrl?: string): BirdImageState {
  const [state, setState] = useState<BirdImageState>(() => {
    if (photoUrl && isRealImageUrl(photoUrl)) {
      return { imageUrl: photoUrl, loading: false }
    }
    return { imageUrl: null, loading: true }
  })

  useEffect(() => {
    if (photoUrl && isRealImageUrl(photoUrl)) {
      setState({ imageUrl: photoUrl, loading: false })
      return
    }

    let cancelled = false
    setState({ imageUrl: null, loading: true })

    fetchBirdImageUrl(scientificName).then((url) => {
      if (!cancelled) { setState({ imageUrl: url, loading: false }) }
    }).catch(() => {
      if (!cancelled) { setState({ imageUrl: null, loading: false }) }
    })

    return () => { cancelled = true }
  }, [scientificName, photoUrl])

  return state
}
