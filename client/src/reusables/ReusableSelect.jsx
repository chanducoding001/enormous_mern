
import { ErrorMessage, Field } from "formik";
import React from "react";

const ReusableSelect = ({ name, placeholder, options }) => {
  return (
    <div className="inputContainer">
      <Field as="select" name={name} className="inputField select">
        <option value="" hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} className="errorMsg" component="p" />
    </div>
  );
};

export default ReusableSelect;
