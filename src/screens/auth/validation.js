import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email không hợp lệ!')
        .min(6, 'Tối Thiểu 6 Ký Tự!')
        .max(30, 'Tối Đa 30 Ký Tự!')
        .required('Bắt Buộc Nhập!'),
    password: Yup.string()
        .min(6, 'Tối Thiểu 6 Ký Tự!')
        .max(30, 'Tối Đa 30 Ký Tự!')
        .required('Bắt Buộc Nhập!'),
    passwordVerification: Yup.string()
        .oneOf([Yup.ref('password')],'Xác Nhận Mật Khẩu Không Đúng!')
        .required('Bắt Buộc Nhập!'),
});

const SignInSchema = Yup.object().shape({
    email: Yup.string().required('Bắt Buộc Nhập!'),
    password: Yup.string().required('Bắt Buộc Nhập!'),
});

export { SignUpSchema, SignInSchema };