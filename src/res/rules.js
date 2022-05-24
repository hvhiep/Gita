
const lookup = [
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
]

const specificationsFormat = (itemIndex) => {
    return lookup.find((value, index) => itemIndex === index)
} 
export { specificationsFormat };