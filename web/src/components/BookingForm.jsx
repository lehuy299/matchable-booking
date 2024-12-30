import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function BookingForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      termsAccepted: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d+$/, "Phone number must be numeric")
        .required("Phone number is required"),
      termsAccepted: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
        .required(),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Please enter your personal details</h2>

      {/* Name */}
      <div>
        <Label className="block text-sm font-medium">Name</Label>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md ${
            formik.touched.name && formik.errors.name ? "border-red-500" : ""
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <Label className="block text-sm font-medium">Email</Label>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <Label className="block text-sm font-medium">Phone Number</Label>
        <Input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full p-2 border rounded-md ${
            formik.touched.phone && formik.errors.phone ? "border-red-500" : ""
          }`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div>
        <Label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formik.values.termsAccepted}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size='icon'
          />
          <span className="text-sm">
            I accept the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              terms and conditions
            </a>
          </span>
        </Label>
        {formik.touched.termsAccepted && formik.errors.termsAccepted && (
          <p className="text-red-500 text-sm">{formik.errors.termsAccepted}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Submit Booking
      </Button>
    </form>
  );
}

export default BookingForm;
