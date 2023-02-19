import React, { useState } from "react";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Tabs,
  ListItemButton,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Header from "components/Header";
import { useGetCropsQuery } from "state/api";
import { EditRounded,CloseRounded } from "@mui/icons-material";
import Popup from "components/Popup";
import EditCrop from "scenes/form/editCrop";
import ActionButton from "components/ActionButton";
import AddCrop from "scenes/form/addCrop";

const Crop= ({
  _id,
  cropName,
  fieldName,
  amount,
  price,
  startingDate,
  HarvestDate,}) => {
   
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const newDate = new Date(startingDate);
  const HDate = new Date(HarvestDate)

  const [openPopup,setOpenPopup] = useState(false)

  const closePopup = () => {
    setOpenPopup(false)
  }
  const handleDelete = (id) =>{
    try{
    fetch(`http://192.168.3.186:8000/delete-crop/${id}`,{
       method:"delete",
       mode: 'cors',
       headers: {
          'Content-Type': 'application/json'
       },
       })
       .then((res) => window.alert("deleted successfully!"))
      }
    catch(err){
      console.log(err)
    }
    }

  return (
    <>
     <Popup 
      title="Edit Crop"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      handleClose={closePopup}  
       >
      <EditCrop item={ {_id,cropName,fieldName,amount,price,startingDate,HarvestDate}}/>
      </Popup>

    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <div style={{display:'flex'}}>
        <Typography variant="h4" component="div" style={{flexGrow:1}}>
          {cropName}
        </Typography>
        <ListItemButton onClick={()=>
          {
            setOpenPopup(true)
          }}>
          <EditRounded />
       </ListItemButton>
       <ListItemButton onClick={()=>handleDelete(_id)}>
        <CloseRounded fontSize="small" />
       </ListItemButton>
       </div>
        <Typography  color={theme.palette.secondary[400]}>
          {amount} seeds
        </Typography>
        <Typography color={theme.palette.secondary[400]}>{fieldName}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[200],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography> price : ${Number(price).toFixed(2)}</Typography>
          <Typography>
            Planting Date:{newDate.getFullYear()}-{newDate.getMonth()}-{newDate.getDay()}
          </Typography>
          <Typography>Expected Harvest Date:</Typography>
          <Typography>{HDate.getFullYear()}-{HDate.getMonth()}-{HDate.getDay()}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
};

const Crops = () => {
  const theme = useTheme();
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetCropsQuery(email);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [recordForEdit,setRecordForEdit] = useState(null)
  const [openPopup,setOpenPopup] = useState(false) 
  const closePopup = () => {
    setOpenPopup(false)
  }
  return (
    <Box m="1.5rem 2.5rem">
      <Popup 
        title="Add new crop"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handleClose={closePopup}
      >
        <AddCrop />
      </Popup> 
      <FlexBetween>
        <Header title="CROPS" subtitle="See your list of crops." />
          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() =>
                setOpenPopup(true)
              }
            >
              Add New Crop
            </Button>
          </Box>
      </FlexBetween>
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              cropName,
              fieldName,
              amount,
              price,
              startingDate,
              HarvestDate,
            }) => (
              <Crop
                key={_id}
                _id={_id}
                cropName={cropName}
                fieldName={fieldName}
                amount={amount}
                price={price}
                startingDate={startingDate}
                HarvestDate={HarvestDate}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
    
  );
};

export default Crops;
