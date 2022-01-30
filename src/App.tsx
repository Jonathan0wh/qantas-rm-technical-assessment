import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { retrieveAirportInfoByCode, retrieveAirports } from "services";
import { TAirport, TAirportInfo, TAirports } from "services/types";

import "./App.css";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TAirports>([]);
  const [loadingAirport, setLoadingAirport] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<TAirport | null>(null);

  const [airportInfo, setAirportInfo] = useState<TAirportInfo>();
  const [loadingAirportInfo, setLoadingAirportInfo] = useState(false);

  useEffect(() => {
    if (selectedAirport) {
      setLoadingAirportInfo(true);
      retrieveAirportInfoByCode(selectedAirport.airportCode)
        .then((result) => {
          setAirportInfo(result);
          setLoadingAirportInfo(false);
        })
        .catch((error) => console.log(error));
    } else {
      setAirportInfo(undefined);
    }
  }, [selectedAirport]);

  return (
    <Container>
      <Box sx={{ padding: 4 }}>
        <Autocomplete
          id="search-airport"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          loading={loadingAirport}
          options={options}
          isOptionEqualToValue={(option, value) => option.city === value.city}
          getOptionLabel={(option) =>
            option.city + " (" + option.airportCode + ")"
          }
          noOptionsText="No airport found"
          onInputChange={(event, value) => {
            if (value.length > 1) {
              setLoadingAirport(true);
              retrieveAirports(value)
                .then((result) => {
                  setLoadingAirport(false);
                  setOptions(result);
                })
                .catch((error) => console.log(error));
            } else {
              setOptions([]);
            }
          }}
          onChange={(event, value) => setSelectedAirport(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Airport Name"
              placeholder="Please enter airport name to start searching"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loadingAirport ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box sx={{ paddingX: 4 }}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Airport Information
            </Typography>
            {loadingAirportInfo ? (
              <>
                <Skeleton variant="text" height={40} />
                <Skeleton
                  variant="rectangular"
                  height={120}
                  sx={{ marginTop: 2 }}
                />
              </>
            ) : (
              <>
                {airportInfo && (
                  <Typography variant="h5" component="div">
                    {airportInfo.heading}
                  </Typography>
                )}
                {airportInfo && (
                  <Typography variant="body2">
                    {airportInfo.description}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default App;
