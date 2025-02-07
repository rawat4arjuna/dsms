import React from "react";
import { FieldInputProps, FormikProps } from "formik";
import { FormControl, InputAdornment, TextField, TextFieldProps } from "@mui/material";

// Define the component props
interface FormikTextFieldProps  {
  name:string;
  label: string;
  required?: boolean;
  formik: FormikProps<any>;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string, formik: FormikProps<any>) => void;
  isToolTip?: boolean;
  toolTipLabel?: string;
  toolTipLabelSecondary?: string;
  InputProps?: any;
  valueStartAdornment?: boolean;
  getSign?: (state: any, values: any) => React.ReactNode;
  startAdornment?: any;
  state?: any;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>) => void;
  handleBlur?: (field: string, formik: FormikProps<any>) => void;
}

const FormikTextField: React.FC<FormikTextFieldProps> = ({
  label,
  required,
  formik,
  onChange,
  onBlur,
  isToolTip,
  InputProps = {},
  valueStartAdornment,
  getSign,
  startAdornment,
  state,
  handleChange,
  handleBlur,
  ...props
}) => {
  const meta = formik.getFieldMeta(props.name as string);


  return (
    <FormControl fullWidth error={meta.touched && Boolean(meta.error)}>
      <TextField

        label={
          <span>
            {label}
            {required && <span className="asterisk_sign">*</span>}
          </span>
        }
        size="small"
        {...props}
        InputProps={{
          ...InputProps,
          startAdornment: (
            <InputAdornment position="start">
              {valueStartAdornment && getSign && getSign(state, formik.values)}
              {startAdornment && (
                <startAdornment.Component
                  {...startAdornment}
                  formik={formik}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: isToolTip || Boolean(formik.values?.[props.name as string]) || valueStartAdornment,
        }}
        value={formik.values?.[props.name as string] || ""}
        onChange={(e) => {
          formik.setFieldValue(props.name,e.target.value)
         
        }}
        onBlur={() => {
          
          formik.handleBlur(props.name);
        }}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error ? meta.error : null}
        fullWidth
        variant="outlined"
      />
    </FormControl>
  );
};

export default FormikTextField;
