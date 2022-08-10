import {
  Alert,
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Link from "../assets/broken-link.png";

const Search = () => {
  const [value, setValue] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [openSuccess, setOpenSuccess] = useState(false);

  const axios = require("axios");

  const encodedParams = new URLSearchParams();
  encodedParams.append("url", value);

  const options = {
    method: "POST",
    url: "https://url-shortener-service.p.rapidapi.com/shorten",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "71610a198bmsh682062c9639190ap17d30fjsn40de3452eb55",
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    data: encodedParams,
  };
  const getData = () => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setShortUrl(response.data.result_url);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const getQR = () => {
    axios
      .get(
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={shortUrl}&amp;size=100x100"
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setOpenSuccess(true);
        }
      });
  };
  const reset = () => {
    setValue("");
    setShortUrl();
  };
  const handleClose = () => {
    setOpenSuccess(false);
  };

  console.log(value);
  console.log(shortUrl);
  return (
    <div>
      <Grid>
        <Card
          sx={{
            background:
              "linear-gradient( 96.5deg,  rgba(39,103,187,1) 10.4%, rgba(16,72,144,1) 87.7% )",
            borderRadius: "0px",
            padding: "20px",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ mt: 3, mb: 5 }}
          >
            <Grid item>
              <img src={Link} alt="link-logo" />
            </Grid>
            <Grid item sm={12} align="center">
              <Typography
                color="#F9F5EB"
                variant="h2"
                sx={{ fontFamily: "'Itim', cursive" }}
              >
                URL SHORTY
              </Typography>
            </Grid>
            <Grid item sm={12} align="center">
              <Typography
                variant="h6"
                color="#F9F5EB"
                sx={{ fontFamily: "'Itim', cursive" }}
              >
                URLSHORTY is a free tool to shorten a URL or reduce a link
                Create short & memorable links in seconds.
              </Typography>
            </Grid>
            <Grid item sm={12} align="center">
              <TextField
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                sx={{ background: "#ffffff", width: "50vw" }}
                placeholder="Enter Link Here"
                fullWidth
              ></TextField>
            </Grid>
            {shortUrl !== undefined ? (
              <Grid item sm={4} xs={12}>
                <Card sx={{ bgcolor: "#e3f2fd" }}>
                  <Grid container>
                    <Grid item sm={10} xs={9} sx={{ padding: "10px" }}>
                      <Typography> {shortUrl}</Typography>
                    </Grid>
                    <Grid item sm={1} xs={1}>
                      <Tooltip title="Copy">
                        <IconButton
                          onClick={() => {
                            navigator.clipboard.writeText(shortUrl);
                          }}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid item sm={1} xs={2}>
                      <Tooltip title="Generate QR Code">
                        <IconButton
                          onClick={() => {
                            getQR();
                          }}
                        >
                          <QrCodeIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ) : null}
            {/* <Grid item>
              <Card>
                <img
                  src={
                    "https://api.qrserver.com/v1/create-qr-code/?data={shortUrl}&amp;size=100x100"
                  }
                  alt="qrcode"
                />
              </Card>
            </Grid> */}

            <Grid item sm={12} xs={12} align="center">
              <Button onClick={getData} variant="contained">
                <Typography sx={{ fontFamily: "'Itim', cursive" }}>
                  Shorten URL
                </Typography>
              </Button>
            </Grid>
            <Grid item sm={12} xs={12} align="center">
              <Button onClick={reset} variant="contained">
                <Typography sx={{ fontFamily: "'Itim', cursive" }}>
                  Reset
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Card>
        {/* -------------------------------------------------------------------------------- */}
        <Card
          sx={{
            background: "#f5f5f5",
            borderRadius: "0px",
            padding: "100px",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item sm={12} align="center">
              <Typography
                variant="h3"
                color="#1C3879"
                sx={{ fontFamily: "'Itim', cursive" }}
              >
                Simple and fast URL shortener!
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} lg={12}>
              <Typography color="#1C3879" align="center">
                URL Shorty allows to reduce long links from all sites on the
                Internet, just paste the long URL and click the Shorten URL
                button. Use it to shorten links for any social media platforms,
                blogs, ads, or pretty much anywhere else you want to share them.
                Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS,
                videos. After shorterning the URL you can share the QR Code for
                that shortened URL.
              </Typography>
            </Grid>
          </Grid>
        </Card>
        {/* -------------------------------------------------------------------------------- */}
        {/* <Card sx={{ background: "#607EAA", borderRadius: "0px" }}>
          <Grid container>
            <Grid item sm={3}>
              <Feature
                image={Easy}
                alt="Easy"
                info="URL Shorty is easy and fast, enter the long link to get your
                shortened link along with QR Code."
              />
            </Grid>
            <Grid item sm={3}>
              <Feature
                image={Link}
                alt="Easy"
                info="URL Shorty is easy and fast, enter the long link to get your
                shortened link along with QR Code."
              />
            </Grid>
          </Grid>
        </Card> */}
        {/* -------------------------------------------------------------------------------- */}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ background: "#2E3192", padding: "10px" }}
        >
          <Grid item>
            <Typography
              sx={{ fontFamily: "'Itim', cursive", color: "#ffffff" }}
            >
              &#169; URL Shorty Developed By Amit Metkari{" "}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          QR Code Generated Succesfully !
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Search;
