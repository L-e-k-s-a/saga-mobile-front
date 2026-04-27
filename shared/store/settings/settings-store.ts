import { RoutesForTabs, TypeRoutesForTabs } from "@/shared/routes/routes"
import { create } from "zustand"


type SettingsStore = {
    favorite: TypeRoutesForTabs,
    setFavorite: (path: TypeRoutesForTabs) => void

}



export const useSettingsStore = create<SettingsStore>()((set) => ({
    favorite: RoutesForTabs.TASKS,

    setFavorite: (path: TypeRoutesForTabs) => set({favorite: path})
}))