import React, { useState } from "react";
import { useSelector } from "react-redux";
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
  
} from "@mui/material";
import Header from "components/Header";
import { useGetHarvestQuery } from "state/api";

const Harvest= ({
  _id,
  fieldName,
  Team,
  HarvestDate,
  boxSize,
  amount,
  quality
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const HDate = new Date(HarvestDate)

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div">
          {fieldName}
        </Typography>
        <Typography  color={theme.palette.secondary[400]}>
          {amount} crops
        </Typography>
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
          {/* <Typography> price : ${Number(price).toFixed(2)}</Typography> */}
          
          <Typography>
            Team:{Team.map((item)=>{
               return <Typography>{item},</Typography>
            })}
          </Typography>
          <Typography>
           Harvest Date:{HDate.getFullYear()}-{HDate.getMonth()}-{HDate.getDay()}
          </Typography>
          <Typography>Box size: {boxSize} kg</Typography>
          <Typography >Quality: {quality}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Harvests = () => {
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetHarvestQuery(email);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    
    <Box m="1.5rem 2.5rem">
      <Header title="Harvested Fields" subtitle="See your list of harvest." />
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
              fieldName,
              workersName,
              submitDate,
              boxSize,
              amount,
              quality
            }) => (
              <Harvest
                key={_id}
                _id={_id}
                fieldName={fieldName}
                Team={workersName}
                amount={amount}
                quality={quality}
                HarvestDate={submitDate}
                boxSize={boxSize}
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

export default Harvests;
