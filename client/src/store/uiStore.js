import { create } from 'zustand'

const useUiStore = create((set) => ({
  visitorCount: 0,
  setVisitorCount: (count) => set({ visitorCount: count }),
}))

export default useUiStore