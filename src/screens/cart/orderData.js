import { guitarImg, guitarImg2, guitarImg3 } from '../../assets';

//dump data: data = bảng 'Đơn hàng'(lấy số lượng) join 'Sản phẩm'(lấy id, tên, giá bán, ảnh) join 'Cửa hàng'(lấy id, tên cửa hàng) join 'Giảm giá'(lấy phần trăm giảm)
//Tạm thời cứ giả sử tất cả thông tin cần để hiển thị đều có hết

/*
status: 
1 - 'Chờ xác nhận',
2 - 'Chờ vận chuyển',
3 - 'Chờ giao hàng',
4 - 'Đã giao hàng',
5 - 'Đơn đã hủy', 

*/

const orderData = [
    {
        id: 1,
        quantity: 2,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 1
    },
    {
        id: 2,
        quantity: 1,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 1
    },
    {
        id: 3,
        quantity: 1,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 2
    },
    {
        id: 4,
        quantity: 1,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 3
    },
    {
        id: 5,
        quantity: 2,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 4
    },
    {
        id: 6,
        quantity: 2,
        orderDate: '01/01/2022',
        deliveryDate: '04/01/2022',
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
        status: 5
    },
];


export default orderData;