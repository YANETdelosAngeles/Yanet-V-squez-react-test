import * as yup from "yup";

export const basicSchema = yup.object().shape({
    name: yup.string().required("Required").max(30, 'Password should be of maximum 30 characters length'),
    last_name: yup.string().required("Required").max(30, 'Password should be of maximum 30 characters length'),
    birthday: yup.string().required(),
})

export const requiredLogin = yup.object().shape({
    email: yup.string().required("Required").email('this input is required example correo@gmail.com').required(),
    password: yup.string().required("Required").required(),
})