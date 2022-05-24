import { guitarImg, guitarImg2, guitarImg3 } from '../../assets';
const productData = [
    {
        id: 1,
        name: 'Greg Bennett GD-100SGE',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 15300,
        stars: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 1,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 2,
        name: 'Greg Bennett GD-100SGE 2',
        standardCost: 2000000,
        salePrice: 2660000,
        soldQuantity: 2873,
        rating: 5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 1,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 3,
        name: 'Greg Bennett GD-100SGE 3',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 2,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 4,
        name: 'Greg Bennett GD-100SGE 4',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 2,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 5,
        name: 'Greg Bennett GD-100SGE 5',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 3,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 6,
        name: 'Greg Bennett GD-100SGE 6',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 3,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 7,
        name: 'Greg Bennett GD-100SGE 7',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 3,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
    {
        id: 8,
        name: 'Greg Bennett GD-100SGE 8',
        standardCost: 5000000,
        salePrice: 5660000,
        soldQuantity: 1000,
        rating: 4.5,
        img: [
            guitarImg,
            guitarImg2,
            guitarImg3
        ],
        location: 'Tp.HCM',
        discountId: 3,
        specifications: {
            brand: 'Taylor',
            origin: 'USA',
            shape: 'A Khuyết',
            paintStyle: 'Sơn mờ',
            top: 'Gỗ Thông Englemann (Laminated Englemann Spruce)',
            sideAndBack: 'Gỗ Okoume (Laminated Okoume)',
            headstockAndNeck: 'Gỗ Okoume',
            saddle: 'Gỗ Cẩm Lai(Rosewood)',
            string: 'Alice AW436',
            stringAdjustment: true,
            warranty: 12,
            eq: 'Amplifer Epiphone 15C',
            
        },
        information: 'Đàn Guitar Acoustic Mantic GT-1 thuộc dòng đàn entry level dành cho người mới bắt đầu. Với những thiết kế chuẩn mực của một cây đàn acoustic mantic GT-1 sẽ đáp ứng được nhu cầu tập luyện của bạn. Với thiết kế hiện đại của dòng đàn Mantic nổi tiếng GT-1 mang đậm chất tinh tế, nhẹ nhàng, không quá cầu kì, với ba mầu sắc được ưa chuộng nhất hiện nay là Vàng gỗ, Xanh ngọc và Đỏ mặt trời (Sunburst), GT-1 sẽ là điểm nhấn cho bạn trong mỗi cuộc giao lưu hội nhóm. Không chỉ đẹp về ngoại hình, GT-1 còn có âm thanh tốt, tiếng vang sáng, ngoài ra action đàn cực thấp nên những bạn mới chơi cũng có thể tiếp cận một cách dễ dàng.'
    },
];
export default productData;