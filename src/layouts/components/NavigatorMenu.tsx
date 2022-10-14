import { Box, Drawer } from "@mui/material";

export function NavigatorMenu({
    menuWidth,
    open,
}: {
    menuWidth: number;
    open: boolean;
}) {
    return (
        <Drawer
            variant="persistent"
            sx={{
                width: menuWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: menuWidth,
                    boxSizing: "border-box",
                },
            }}
            anchor="left"
            open={open}
        >
            <Box></Box>
        </Drawer>
    );
}
