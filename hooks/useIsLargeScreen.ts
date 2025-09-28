import { useMediaQuery } from "@mui/material";

export function useIsLargeScreen() {
    return useMediaQuery("(min-width: 760px)")
}