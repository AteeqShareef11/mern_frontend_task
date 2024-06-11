/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Grid,
  Box,
  Stack,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useForm from "@/hooks/validation";
import vehicleServices from "@/app/services/vehicleServices";
import { useRouter } from "next/navigation";

const initialValues = {
  carModel: "",
  price: "",
  phone: "",
  city: "",
};

const validationRules = {
  carModel: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (value.length < 3) {
      return "Car model must be at least 3 letters long";
    }
    return "";
  },
  price: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (isNaN(value) || value <= 0) {
      return "Price must be a positive number";
    }
    return "";
  },
  phone: (value) => {
    if (!value) {
      return "This field is required";
    }
    if (!/^\d{11}$/.test(value)) {
      return "Phone number must be exactly 11 digits";
    }
    return "";
  },

  city: (value) => (value ? "" : "This field is required"),
};


export default function VehicleForm() {
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter()

  const { values, errors, handleOnChange, validateAllFields, setFormValues } = useForm(
    initialValues,
    validationRules
  );

  const handlePictureChange = (e) => {
    const newPictures = Array.from(e.target.files);
    if (pictures.length + newPictures.length <= maxPictures) {
      setPictures([...pictures, ...newPictures]);
    } else {
      setError(`You can only add up to ${maxPictures} pictures`);
    }
  };

  const handleAddMorePictures = () => {
    document.getElementById('fileInput').click();
  };

  const handleDeletePicture = (index) => {
    setPictures(pictures.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("carModel", values.carModel);
    formData.append("price", values.price);
    formData.append("phone", values.phone);
    formData.append("city", values.city);
    formData.append("maxPics", maxPictures);
    pictures.forEach((picture) => {
      formData.append("pictures", picture);
    });

    if (validateAllFields()) {
      vehicleServices.createVehicle(formData).then((res) => {
        setSuccess("Vehicle information submitted successfully");
        setError("");
        router.push("/dashboard/vehicles")
        setFormValues(initialValues)
      }).catch((error) => {
        setError("Error submitting vehicle information");
        setSuccess(error?.message || error?.response?.data?.message);
      });
    }
  };
  const handleMaxPicturesChange = (e) => {
    let value = Number(e.target.value);
    if (value > 10) {
      value = 10;
    }
    setMaxPictures(value);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Submit Vehicle Information
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Stack spacing={2} component="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Car Model"
          variant="outlined"
          fullWidth
          margin="normal"
          name="carModel"
          error={errors.carModel}
          helperText={errors.carModel}
          value={values.carModel}
          onChange={handleOnChange}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          name="price"
          error={errors.price}
          helperText={errors.price}
          value={values.price}
          onChange={handleOnChange}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          type="number"

          margin="normal"
          name="phone"
          error={errors.phone}
          helperText={errors.phone}
          value={values.phone}
          onChange={handleOnChange}
        />
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          margin="normal"
          name="city"
          error={errors.city}
          helperText={errors.city}
          value={values.city}
          onChange={handleOnChange}
        />
        <TextField
          label="Max Number of Pictures"
          variant="outlined"
          fullWidth
          margin="normal"
          min={1}
          max={10}
          type="number"
          value={maxPictures}
          onChange={handleMaxPicturesChange}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handlePictureChange}
        />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={handleAddMorePictures}
          disabled={pictures.length >= maxPictures}
        >
          Add More Pictures
        </Button>
        <Grid container spacing={2}>
          {pictures.map((picture, index) => (
            <Grid item key={index} xs={4} position="relative">
              <img
                src={URL.createObjectURL(picture)}
                alt="preview"
                style={{ width: "100%" }}
              />
              <IconButton
                aria-label="delete"
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)"
                }}
                onClick={() => handleDeletePicture(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
