import { useState } from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import { useRouter } from 'next/router'

export default function MenuAsignaciones() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const Router = useRouter()

    const adminMatriculados = () => {
        Router.push('/matriculados')
        handleClose()
    }

    return (
        <>
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, width: "30px", height: "30px" }}
                onClick={handleClick}
            >
                <i className="fi fi-rr-menu-dots-vertical" style={{ fontSize: "15px" }} />

            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={adminMatriculados}>Administrar matriculados</MenuItem>
                <MenuItem onClick={handleClose}>Agregar asignaciones</MenuItem>
            </Menu>
        </>
    )
}