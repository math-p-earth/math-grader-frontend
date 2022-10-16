import {
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
} from "@mui/material";
import { theme } from "../../assets/styles/theme";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Profile } from "./Profile";

interface MenuListInterface {
    icon: JSX.Element;
    label: string;
    link: string;
}

const menuListArr = [
    [
        {
            icon: <HomeIcon />,
            label: "Home",
        },
        {
            icon: <MenuBookIcon />,
            label: "Lecture Problem",
        },
        {
            icon: <ListAltIcon />,
            label: "Problem Set",
        },
        {
            icon: <DescriptionIcon />,
            label: "Past Paper",
        },
    ],
    [
        {
            icon: <div />,
            label: "Training System",
        },
    ],
] as MenuListInterface[][];

function MenuList() {
    const MenuMap = (arr: MenuListInterface[]) => {
        return arr.map((item) => {
            return (
                <ListItem>
                    <ListItemButton
                        component={Paper}
                        style={{
                            borderRadius: "5px",
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                    </ListItemButton>
                </ListItem>
            );
        });
    };

    return (
        <List dense>
            {MenuMap(menuListArr[0])}
            <Divider variant="middle" sx={{ pt: "6px", pb: "6px" }} />
            {MenuMap(menuListArr[1])}
        </List>
    );
}

// Home
// Drill
// Past Paper Collection

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
            <Paper elevation={4}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    padding={theme.spacing(0, 1)}
                    sx={{
                        ...theme.mixins.toolbar,
                        backgroundColor: theme.palette.primary.main,
                    }}
                />
            </Paper>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                sx={{
                    height: "100%",
                }}
            >
                <Grid item>
                    <MenuList />
                </Grid>
                <Grid item>
                    <Profile />
                </Grid>
            </Grid>
        </Drawer>
    );
}
