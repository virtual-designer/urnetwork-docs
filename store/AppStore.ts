import { create } from 'zustand';

export interface AppState {
    isSidebarExpanded: boolean;
    isSidebarToggleVisible: boolean;
}

export interface AppActions {
    setIsSidebarExpanded: (value: boolean) => void;
    toggleIsSidebarExpanded: () => void;
    setIsSidebarToggleVisible: (value: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
    isSidebarToggleVisible: false,
    isSidebarExpanded: true,
    setIsSidebarExpanded: (value: boolean) => set({ isSidebarExpanded: value }),
    setIsSidebarToggleVisible: (value: boolean) => set({ isSidebarToggleVisible: value }),
    toggleIsSidebarExpanded: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
}))