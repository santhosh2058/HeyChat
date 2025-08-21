import {
  AbsoluteCenter,
  Box,
  Button,
  Field,
  FileUpload,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiUpload } from "react-icons/hi";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const onSubmit = async (data) => {
    try {
      let uploadedFileUrl = "";

        uploadedFileUrl = await handleUpload();
        if (!uploadedFileUrl) {
          alert("File upload failed");
          return;
        }
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, pic: uploadedFileUrl }),
      });
      const result = await response.json();
      console.log(result); // handle success or error
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return "";
    }

    const formData = new FormData();
    formData.append("file", selectedFile); // backend field name must match

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      //console.log(res.data);
      return res.data.url || "";
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading file");
      return "";
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="contentbox1" flex="1" pb={12} bg="gray.100">
        <Box h="50px" />
        <Box
          className="contentbox2"
          flex="1"
          w="40vw"
          h="auto"
          p={2}
          pb={5}
          mx="auto"
          bg="gray.200"
          borderRadius="md"
          boxShadow="md"
        >
          {/* signup heading */}
          <Box position="relative" h="40px" borderRadius="md">
            <AbsoluteCenter className="headerheading1">
              <Box bg="bg.muted" px="4" py="2" borderRadius="md" color="fg">
                Register
              </Box>
            </AbsoluteCenter>
          </Box>

          <Stack w="full" pr="4" className="form" pt={4} pl={3} gap="4">
            {/* Name */}
            <Field.Root
              invalid={!!errors.name}
              required
              orientation="horizontal"
            >
              <Field.Label>
                Name <Field.RequiredIndicator />
              </Field.Label>
              <Box display="flex" flexDirection="column" flex="1">
                <Input
                  bg="bg.muted"
                  placeholder="Enter name"
                  {...register("name", { required: "Name is required" })}
                />
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Box>
            </Field.Root>

            {/* Email */}
            <Field.Root
              invalid={!!errors.email}
              required
              orientation="horizontal"
            >
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Box display="flex" flexDirection="column" flex="1">
                <Input
                  bg="bg.muted"
                  placeholder="me@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z0-9_.]*@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Box>
            </Field.Root>

            {/* Username */}
            <Field.Root
              invalid={!!errors.username}
              required
              orientation="horizontal"
            >
              <Field.Label>
                Username <Field.RequiredIndicator />
              </Field.Label>
              <Box display="flex" flexDirection="column" flex="1">
                <Input
                  bg="bg.muted"
                  placeholder="Choose a username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
              </Box>
            </Field.Root>

            {/* Password */}
            <Field.Root
              invalid={!!errors.password}
              required
              orientation="horizontal"
            >
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <Box display="flex" flexDirection="column" flex="1">
                <Input
                  type="password"
                  bg="bg.muted"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Box>
            </Field.Root>
            {/* Profile Pic Upload */}
            <FileUpload.Root
              accept={{ "image/jpeg": [], "image/png": [] }}
              maxFiles={1}
              onFileChange={({ acceptedFiles }) => {
                if (acceptedFiles.length > 0) {
                  setSelectedFile(acceptedFiles[0]); // store File object
                }
              }}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button borderColor="black" variant="outline" size="sm">
                  <HiUpload /> Upload Photo
                </Button>
              </FileUpload.Trigger>
              <FileUpload.List />
            </FileUpload.Root>

            {/* Submit */}
            <Button type="submit" colorScheme="teal" w="full">
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </form>
  );
};
