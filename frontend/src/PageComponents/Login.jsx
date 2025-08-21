import {
  AbsoluteCenter,
  Box,
  Button,
  Field,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    setServerError(""); // Reset error
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response) {
        setServerError("Network error. Please try again.");
        return;
      }
      const result = await response.json();
      if (!response.ok) {
        if (result && result.message) {
          setServerError(result.message);
        } else {
          setServerError("Login failed");
        }
      } else {
        // handle success (e.g., redirect, save token, etc.)
        setServerError("");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("null")) {
        console.error("Error:", error);
      } else {
        setServerError("Network error. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="contentbox1" flex="1" pb={12} bg="gray.50">
        <Box h="100px" />
        <Box
          className="contentbox2"
          flex="1"
          w="400px"
          h="auto"
          p={2}
          pb={5}
          mx="auto"
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <Box position="relative" h="40px" borderRadius="md">
            <AbsoluteCenter className="headerheading1">
              <Box bg="teal.500" px="4" py="2" borderRadius="md" color="white">
                Login
              </Box>
            </AbsoluteCenter>
          </Box>
          <Stack
            pt={4}
            pl={3}
            gap="4"
            maxW="sm"
            css={{ "--field-label-width": "96px" }}
          >
            {/* username */}
            
            <Field.Root required orientation="horizontal">
              <Field.Label>
                Username
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("username", { required: true })}
                bg="gray.100"
                placeholder="me@example.com"
              />
              <Field.ErrorText color="red.500">
                {errors.username?.message}
              </Field.ErrorText>
            </Field.Root>
            {/* password */}
            <Field.Root required orientation="horizontal">
              <Field.Label>
                Password
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                {...register("password", { required: true })}
                bg="gray.100"
                placeholder="Password"
                type="password"
              />
              <Field.ErrorText color="red.500">
                {errors.password?.message}
              </Field.ErrorText>
            </Field.Root>
            {/* submit */}
            <Button type="submit" colorScheme="teal" variant="solid" w="8vw">
              Submit
            </Button>
            {/* server error */}
            {serverError && (
              <Text color="red.500" mt={2}>
                {serverError}
              </Text>
            )}
          </Stack>
          {/* register */}
          
          <Link
            to="/register"
            style={{ color: "#319795", marginTop: "16px", display: "block" }}
          >
            Need an account? Register
          </Link>
        </Box>
      </Box>
    </form>
  );
};
