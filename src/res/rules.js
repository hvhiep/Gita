
const productDetail = [
    'Thương hiệu',
    'Xuất xứ',
    'Kiểu dáng',
    'Kiểu sơn',
    'Mặt đàn',
    'Lưng & Hông',
    'Đầu đàn & Cần',
    'Ngựa đàn',
    'Dây đàn',
    'Ty chỉnh cần',
    'Bảo hành',
    'EQ',
];

const orderStatusLookup = [
    {
        id: 0,
        title: 'Chờ xác nhận',
        title2: 'Đơn hàng đang chờ xác nhận !',
        icon: 'clipboard-check',
        color: 'orange'
    },
    {
        id: 1,
        title: 'Chờ vận chuyển',
        title2: 'Đơn hàng đang chờ vận chuyển !',
        icon: 'truck',
        color: '#1F4690'
    },
    {
        id: 2,
        title: 'Chờ giao hàng',
        title2: 'Đơn hàng đang chờ giao hàng !',
        icon: 'truck-loading',
        color: '#5FD068'
    },
    {
        id: 3,
        title: 'Đã giao hàng',
        title2: 'Đơn hàng đã được giao thành công !',
        icon: 'check-square',
        color: 'green'
    },
    {
        id: 4,
        title: 'Đơn đã hủy',
        title2: 'Đơn hàng đã bị hủy !',
        icon: 'window-close',
        color: '#e01b1b'
    },
]

const specificationsFormat = (itemIndex) => {
    return productDetail.find((value, index) => itemIndex === index)
};

const errorCodeFirebaseAuth = [
    // sign in
    {
        code: 'auth/invalid-email',
        value: 'Email không hợp lệ!'
    },
    {
        code: 'auth/user-not-found',
        value: 'Tài khoản không hợp lệ!'
    },
    {
        code: 'auth/wrong-password',
        value: 'Sai mật khẩu!'
    },
    {
        code: 'auth/user-disabled',
        value: 'Tài khoản đã bị khóa!'
    },
    // sign up
    {
        code: 'auth/email-already-in-use',
        value: 'Email bị trùng!'
    },
    {
        code: 'auth/invalid-email',
        value: 'Email không hợp lệ!'
    },
    {
        code: 'auth/operation-not-allowed',
        value: 'Tài khoản đã bị khóa!'
    },
    {
        code: 'auth/weak-password',
        value: 'Mật khẩu quá yếu!'
    },
];

const transformErrorCode = (code) => {
    const message = errorCodeFirebaseAuth.find((item) => item.code === code);
    if(message !== undefined)
        return message.value;
}



export { specificationsFormat, orderStatusLookup, transformErrorCode };