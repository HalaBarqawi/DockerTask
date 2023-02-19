import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { Alert, Box, Button, TextField } from "@mui/material";


export default function Popup(props) {
   const {title,children,openPopup,setOpenPopup} = props
  //  const classes = useStyle();
  return (
    <Dialog open={openPopup} maxWidth="md" >
      <DialogTitle>
        <div style={{display:'flex'}}>
         <Typography variant='h4' component="div" style={{flexGrow:1,color:'white'}}>
             {title}
         </Typography>
         <Box
          // display="flex" justifyContent="end" mt="20px"
          >
               <Button  color="secondary" variant="contained" onClick={props.handleClose}>
                 X
               </Button>
             </Box>
         </div>
      </DialogTitle>
      <DialogContent dividers>
         {children}
      </DialogContent>
    </Dialog>
  )
}
