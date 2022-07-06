//***status đơn hàng:
//-1: trong giỏ hàng (chưa xác nhận mua)
//ở trạng thái này chưa có thông tin:
// orderDate, deliveryDate, deliveryAddressId,  

// 0: chờ xác nhận
// 1: chờ vận chuyển
// 2: chờ giao hàng
// 3: đã giao hàng
// 4: đơn đã hủy

//*** orderCancellation:
// id=0: value: 'Thời gian giao hàng quá lâu'
// id=1: value: 'Thay đổi ý'
// id=2: value: 'Trùng đơn hàng'
// id=3: value: 'Thay đổi địa chỉ giao hàng'

const orderDate = new Date(2022, 6, 2, 8, 33, 30, 0);
const deliveryDate = new Date(2022, 6, 4, 12, 33, 30, 0);
// khi thêm một product vào giỏ hàng thì order sẽ có thông tin như bên dưới
const orderTestData = [
    {
        selected: false, //true: được select trong phần giỏ hàng
        userId: 'jb5n1dhF7geNMX8TVHnjCFwOvdo2',
        quantity: 2,
        deliveryAddressId: null, // khi nào chọn địa chỉ mới cập nhật lại
        orderDate: null, //vì chưa xác nhận mua nên === null
        deliveryDate: null, //vì chưa xác nhận mua nên === null
        status: -1, //trong giỏ hàng
        orderCancellation: null, //khi nào hủy thì mới cập nhật lại
        product: {
            id: 'qIEzrh42R6uiCCuCE7nl',
            name: 'Acoustic Epiphone DR-100 Natural',
            standardCost: 2500000,
            salePrice: 3500000,
            quantity: 2000,
            soldQuantity: 350,
            rating: 4.8,
            type: 1,
            img: [
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar1_1.jpg?alt=media&token=1f7209dc-d6f2-46f5-a896-a1d0436b8dd8',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar1_2.jpg?alt=media&token=aa9a1b01-5125-46c2-9a66-bfff3c244d82',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar1_3.jpg?alt=media&token=b7587773-5cfa-4696-89b4-89aa380d013a',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar1_4.jpg?alt=media&token=912cafc0-cb14-4861-9606-bfdce4efcf54',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar1_5.jpg?alt=media&token=9bab5d0f-1b50-48b0-af06-ee03b0e8e903'
            ],
            discount: {
                id: 'TghBgAqBdYpgXvPE2ojQ',
                name: "Giảm giá hè(shop0) 1",
                percent: 0.2
            },
            shop: {
                shopId: 'suUQzTNtQG1iG0B7P4fl',
                address: "999 Quang Trung",
                avatarImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopAvatar0.png?alt=media&token=8e14ae91-5f16-4ac5-a84e-f4e95cfb6b84",
                backgroundImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopBg0.jpg?alt=media&token=e3f44012-26ce-4ab6-a92a-ac5583f8e003",
                city: "Kon Tum",
                district: "Sa Thầy",
                name: "Shop 0",
                userId: "jb5n1dhF7geNMX8TVHnjCFwOvdo2",
                ward: "Thị trấn Sa Thầy",
            },
        },
    },
    {
        selected: false, //true: được select trong phần giỏ hàng
        userId: 'jb5n1dhF7geNMX8TVHnjCFwOvdo2',
        quantity: 3,
        deliveryAddressId: null, // khi nào chọn địa chỉ mới cập nhật lại
        orderDate: null, //vì chưa xác nhận mua nên === null
        deliveryDate: null, //vì chưa xác nhận mua nên === null
        status: -1, //trong giỏ hàng
        orderCancellation: null, //khi nào hủy thì mới cập nhật lại
        product: {
            id: 'YwfvGbypsm95sf8euZWA',
            shop: {
                shopId: 'suUQzTNtQG1iG0B7P4fl',
                address: "999 Quang Trung",
                avatarImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopAvatar0.png?alt=media&token=8e14ae91-5f16-4ac5-a84e-f4e95cfb6b84",
                backgroundImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopBg0.jpg?alt=media&token=e3f44012-26ce-4ab6-a92a-ac5583f8e003",
                city: "Kon Tum",
                district: "Sa Thầy",
                name: "Shop 0",
                userId: "jb5n1dhF7geNMX8TVHnjCFwOvdo2",
                ward: "Thị trấn Sa Thầy",
            },
            name: 'Acoustic Rosen Xanh Đá G11SC',
            standardCost: 1500000,
            salePrice: 2300000,
            quantity: 1242,
            soldQuantity: 222,
            rating: 4.5,
            type: 1,
            img: [
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar2_1.jpg?alt=media&token=21943520-fb2d-4e03-a83e-0cbf3c328850',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar2_2.jpg?alt=media&token=98c68205-92cd-4b20-bd9a-bcf1ea02178c',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar2_3.jpg?alt=media&token=92b862ab-509e-42f0-b1a1-edc03a2b9592',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar2_4.jpg?alt=media&token=6bdd6001-0ad3-4d9a-9870-4d96fc8b243a'
            ],
            discount: {
                id: 'Qh2L5LUi1rvTnPxgf8zq',
                name: "Giảm giá hè(shop0) 2",
                percent: 0.25
            },
        }
    },
    {
        selected: false, //true: được select trong phần giỏ hàng
        userId: 'jb5n1dhF7geNMX8TVHnjCFwOvdo2',
        quantity: 1,
        deliveryAddressId: null, // khi nào chọn địa chỉ mới cập nhật lại
        orderDate: null, //vì chưa xác nhận mua nên === null
        deliveryDate: null, //vì chưa xác nhận mua nên === null
        status: -1, //trong giỏ hàng
        orderCancellation: null, //khi nào hủy thì mới cập nhật lại
        product: {
            id: 'V6wZdT4kl3Ajz2R6SfiN',
            shop: {
                shopId: 'gNPWDkhyC6i3nK2rISqe',
                address: "69 Võ Văn Kiệt",
                avatarImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopAvatar1.png?alt=media&token=6325ba16-a66c-4cff-94d2-e1f9b9909450",
                backgroundImg: "https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2FshopBg1.jpg?alt=media&token=82f7be0b-a78e-4845-a24f-8661fd4d78d3",
                city: "Hồ Chí Minh",
                district: "Thủ Đức",
                name: "shop 1",
                userId: "OlOnxRH71chi07tvZQKdmQOAbNi2",
                ward: "Linh Trung"
            },
            name: 'Classic Yamaha C80',
            standardCost: 3000000,
            salePrice: 4400000,
            quantity: 4321,
            soldQuantity: 2423,
            rating: 5,
            type: 0,
            img: [
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar3_1.jpg?alt=media&token=92a124c2-3249-456e-9882-8dfbd0e4e28f',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar3_2.jpg?alt=media&token=cb1bb9f0-d706-45da-9fae-d70b296618c1',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar3_3.jpg?alt=media&token=b587bfe6-2c22-416b-b4da-aa97a16d7c42',
                'https://firebasestorage.googleapis.com/v0/b/gita-backend.appspot.com/o/server%2Fguitar3_4.jpg?alt=media&token=a68e7c18-eae1-4e9d-88f7-917410bc8af0'
            ],
            discount: {
                id: 'Qh2L5LUi1rvTnPxgf8zq',
                name: "Giảm giá hè(shop0) 2",
                percent: 0.25
            },
        }
    },
]

export default orderTestData;

