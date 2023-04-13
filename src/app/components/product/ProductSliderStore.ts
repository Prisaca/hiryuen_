import type { Image } from 'swell-js'
import { create } from 'zustand'


interface productSliderStore {
    selectedImage: Image
    setSelectedImage: (image: Image) => void
}

export const useProductSliderStore = create<productSliderStore>()((set) => ({
    selectedImage: 0,
    setSelectedImage: (image: Image) => set({ selectedImage: image }),
}))