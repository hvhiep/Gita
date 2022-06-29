import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
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

export { SignupSchema };