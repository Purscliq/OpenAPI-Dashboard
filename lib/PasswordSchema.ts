import * as yup from "yup";

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .test("password-strength", "Password is weak", (value) => {
      const password = value ?? "";
      return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
        password
      );
    }),
});
