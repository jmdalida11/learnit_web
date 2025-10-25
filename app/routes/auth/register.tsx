import { Button, Card, Flex, Stack } from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router";
import ControlledInput from "~/components/inputs/controlledInput";

type Inputs = {
  username: string;
  password: string;
  name: string;
  email: string;
};

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    // toaster.create({
    //   description: "File saved successfully",
    //   type: "info",
    //   closable: true,
    // });
  };

  return (
    <Flex
      h="full"
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      p={{ base: 2, md: 8 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Root
          padding={{ base: 4, md: 8 }}
          w={{ base: "90%", sm: "80%", md: "400px", lg: "480px" }}
        >
          <Card.Header mb={{ base: 3, md: 5 }}>
            <Card.Title fontSize={{ base: "xl", md: "2xl" }}>
              Sign up
            </Card.Title>
            <Card.Description fontSize={{ base: "sm", md: "md" }}>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <Card.Body mb={{ base: 3, md: 5 }}>
            <Stack gap={{ base: 3, md: 4 }} w="full">
              <ControlledInput
                label={"Username"}
                name={"username"}
                control={control}
                rules={{
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum length is 3" },
                  maxLength: { value: 30, message: "Maximum length is 30" },
                }}
                error={errors?.username}
              />

              <ControlledInput
                label={"Password"}
                name={"password"}
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum length is 8" },
                  maxLength: { value: 30, message: "Maximum length is 30" },
                }}
                error={errors?.password}
              />

              <ControlledInput
                label={"Name"}
                name={"name"}
                control={control}
                rules={{
                  required: "Name is required",
                  maxLength: { value: 255, message: "Maximum length is 255" },
                }}
                error={errors?.name}
              />

              <ControlledInput
                label={"Email"}
                name={"email"}
                control={control}
                type={"email"}
                rules={{
                  required: "Email is required",
                }}
                error={errors?.email}
              />
            </Stack>
          </Card.Body>

          <Card.Footer justifyContent={{ base: "center", md: "flex-end" }}>
            <Button
              variant="solid"
              px={{ base: 4, md: 6 }}
              w={{ base: "full", md: "auto" }}
              type="submit"
            >
              Create Account
            </Button>
            <Button
              variant="solid"
              px={{ base: 4, md: 6 }}
              w={{ base: "full", md: "auto" }}
            >
              <NavLink to="/login">Back to login</NavLink>
            </Button>
          </Card.Footer>
        </Card.Root>
      </form>
    </Flex>
  );
};

export default Register;
