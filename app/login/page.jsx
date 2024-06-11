"use client";
import React from "react";
import {
    Button,
    TextField,
    Container,
    Typography,
    Stack,
} from "@mui/material";
import useForm from "@/hooks/validation";
import authServices from "../services/authServices";
import { useRouter } from "next/navigation";

const initialValues = {
    email: "",
    password: "",
};
const validationRules = {
    email: (value) => {
        if (!value) {
            return "This field is required";
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
            return "Please enter a valid email address";
        }
        return "";
    },
    password: (value) => (value ? "" : "This field is required"),
};

const Login = () => {
    const { values, errors, handleOnChange, validateAllFields } = useForm(
        initialValues,
        validationRules
    );
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateAllFields()) {
            authServices
                .loginUser(values)
                .then((res) => {
                    localStorage.setItem("token", res?.data?.token);
                    router.push("/dashboard/vehicles")
                })
                .catch((error) => {
                    console.error(error);
                    window.alert(error?.response?.data?.message || error?.message)
                });
        }
    };

    return (
        <Container
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            maxWidth="sm"
        >
            <Stack>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        fullWidth
                        margin="normal"
                        error={errors.email}
                        helperText={errors.email}
                        value={values.email}
                        onChange={handleOnChange}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="password"
                        type="password"
                        error={errors.password}
                        helperText={errors.password}
                        value={values.password}
                        onChange={handleOnChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Stack>
        </Container>
    );
};

export default Login;
