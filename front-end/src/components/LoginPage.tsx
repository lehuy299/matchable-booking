import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useNavigate } from "react-router";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    console.log(values);
    try {
      const response = await axios.post("http://localhost:3000/auth/sign-in", values);
      console.log(response);
      //navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login to Matchable</h2>
        <Formik<LoginFormValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-1 border rounded shadow-sm focus:ring focus:ring-indigo-300"
                  as={Input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
