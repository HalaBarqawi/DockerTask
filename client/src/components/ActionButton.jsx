import React from 'react'
import { ListItemButton } from '@mui/material'

// const useStyles = makeStyles(theme => ({
//    root: {
//        minWidth: 0,
//        margin: theme.spacing(0.5)
//    },
//    secondary: {
//        backgroundColor: theme.palette.secondary.light,
//        '& .MuiButton-label': {
//            color: theme.palette.secondary.main,
//        }
//    },
//    primary: {
//        backgroundColor: theme.palette.primary.light,
//        '& .MuiButton-label': {
//            color: theme.palette.primary.main,
//        }
//    },
// }))
export default function ActionButton(props) {
   const {children,onClick} = props
   
    return (
        <ListItemButton
            onClick={onClick}>
            {children}
        </ListItemButton>
    )
}
