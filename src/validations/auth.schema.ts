import * as yup from 'yup';


// register validations schema
export const registerSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile_number: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

//login schema validations
export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Email or Mobile number is required')
    .test('email-or-mobile', 'Enter a valid email or 10-digit mobile number', value =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value!) || /^[0-9]{10}$/.test(value!)
    ),
  password: yup.string().required('Password is required'),
});

