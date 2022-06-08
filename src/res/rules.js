
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
        id: 1,
        title: 'Chờ xác nhận',
        title2: 'Đơn hàng đang chờ xác nhận !',
        icon: 'clipboard-check',
        color: 'orange'
    },
    {
        id: 2,
        title: 'Chờ vận chuyển',
        title2: 'Đơn hàng đang chờ vận chuyển !',
        icon: 'truck',
        color: '#1F4690'
    },
    {
        id: 3,
        title: 'Chờ giao hàng',
        title2: 'Đơn hàng đang chờ giao hàng !',
        icon: 'truck-loading',
        color: '#5FD068'
    },
    {
        id: 4,
        title: 'Đã giao hàng',
        title2: 'Đơn hàng đã được giao thành công !',
        icon: 'check-square',
        color: 'green'
    },
    {
        id: 5,
        title: 'Đơn đã hủy',
        title2: 'Đơn hàng đã bị hủy !',
        icon: 'window-close',
        color: '#e01b1b'
    },
]

const specificationsFormat = (itemIndex) => {
    return productDetail.find((value, index) => itemIndex === index)
};

export { specificationsFormat, orderStatusLookup };