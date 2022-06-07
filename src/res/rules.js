
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
        color: 'orange'
    },
    {
        id: 2,
        title: 'Chờ vận chuyển',
        color: '#1F4690'
    },
    {
        id: 3,
        title: 'Chờ giao hàng',
        color: '#5FD068'
    },
    {
        id: 4,
        title: 'Đã giao hàng',
        color: 'green'
    },
    {
        id: 5,
        title: 'Đơn đã hủy',
        color: '#e01b1b'
    },
]

const specificationsFormat = (itemIndex) => {
    return productDetail.find((value, index) => itemIndex === index)
};

export { specificationsFormat, orderStatusLookup };