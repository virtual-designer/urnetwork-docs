import { create } from "zustand";

export interface AppState {
	isSidebarExpanded: boolean;
	isSidebarToggleVisible: boolean;
	searchQuery: string | null;
	hideSearchResults: boolean;
}

export interface AppActions {
	setIsSidebarExpanded: (value: boolean) => void;
	toggleIsSidebarExpanded: () => void;
	setIsSidebarToggleVisible: (value: boolean) => void;
	setSearchQuery: (query: string | null) => void;
	setHideSearchResults: (value: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>(set => ({
	isSidebarToggleVisible: false,
	isSidebarExpanded: true,
	searchQuery: null,
	hideSearchResults: false,
	setIsSidebarExpanded: (value: boolean) => set({ isSidebarExpanded: value }),
	setIsSidebarToggleVisible: (value: boolean) =>
		set({ isSidebarToggleVisible: value }),
	toggleIsSidebarExpanded: () =>
		set(state => ({ isSidebarExpanded: !state.isSidebarExpanded })),
	setSearchQuery: (query: string | null) => set({ searchQuery: query }),
	setHideSearchResults: (value: boolean) => set({ hideSearchResults: value }),
}));
