import { guitarImg, guitarImg2, guitarImg3 } from '../../assets';

//dump data: data = bảng 'Đơn hàng'(lấy số lượng) join 'Sản phẩm'(lấy id, tên, giá bán, ảnh) join 'Cửa hàng'(lấy id, tên cửa hàng) join 'Giảm giá'(lấy phần trăm giảm)
//Tạm thời cứ giả sử tất cả thông tin cần để hiển thị đều có hết
const orderData = [
    {
        id: 1,
        quantity: 2,
        product: {
            id: 1,
            name: 'Greg Bennett GD-100SGE',
            salePrice: 5660000,
            discountPrice: 4471400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 1,
            name: 'Ba Đờn',
        },
    },
    {
        id: 2,
        quantity: 1,
        product: {
            id: 2,
            name: 'Greg Bennett 2',
            salePrice: 2660000,
            discountPrice: 2101400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 2,
            name: 'Việt Thương',
        },
    },
    {
        id: 3,
        quantity: 1,
        product: {
            id: 2,
            name: 'Greg Bennett 2',
            salePrice: 2660000,
            discountPrice: 2101400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 2,
            name: 'Việt Thương',
        },
    },
    {
        id: 4,
        quantity: 1,
        product: {
            id: 2,
            name: 'Greg Bennett 2',
            salePrice: 2660000,
            discountPrice: 2101400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 2,
            name: 'Việt Thương',
        },
    },
    {
        id: 5,
        quantity: 2,
        product: {
            id: 1,
            name: 'Greg Bennett GD-100SGE',
            salePrice: 5660000,
            discountPrice: 4471400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 1,
            name: 'Ba Đờn',
        },
    },
    {
        id: 6,
        quantity: 2,
        product: {
            id: 1,
            name: 'Greg Bennett GD-100SGE',
            salePrice: 5660000,
            discountPrice: 4471400, 
            img: [
                guitarImg,
                guitarImg2,
                guitarImg3
            ],
            discount: {
                id: 1,
                name: 'Giảm giá hè',
                percent: 0.21,
            },
        },
        shop: {
            id: 1,
            name: 'Ba Đờn',
        },
    },
];

export default orderData;