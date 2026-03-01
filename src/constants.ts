export interface TimelineEvent {
  year: string;
  phase: string;
  subtitle: string;
  title: string;
  summary: string;
  context: string;
  mainContent: string[];
  relatedFigures: string[];
  significance: string[];
  imageHint: string;
  keywords: string[];
  quote?: string;
}

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    year: 'Nửa sau thế kỷ XIX',
    phase: 'Giai đoạn 1: Bối cảnh lịch sử',
    subtitle: 'Chủ nghĩa tư bản chuyển sang giai đoạn đế quốc chủ nghĩa',
    title: 'Bối cảnh thế giới: Đế quốc chủ nghĩa và xâm lược thuộc địa',
    summary: 'Từ nửa sau thế kỷ XIX, các nước tư bản Âu-Mỹ có những chuyển biến mạnh mẽ; chủ nghĩa tư bản chuyển từ tự do cạnh tranh sang độc quyền, đẩy mạnh xâm chiếm và nô dịch các nước nhỏ, yếu ở châu Á, châu Phi và Mỹ-Latinh.',
    context:
      'Từ nửa sau thế kỷ XIX, các nước tư bản Âu-Mỹ có những chuyển biến mạnh mẽ trong đời sống kinh tế - xã hội. Chủ nghĩa tư bản phương Tây chuyển nhanh từ giai đoạn tự do cạnh tranh sang giai đoạn độc quyền (giai đoạn đế quốc chủ nghĩa), đẩy mạnh quá trình xâm chiếm và nô dịch các nước nhỏ, yếu ở châu Á, châu Phi và khu vực Mỹ-Latinh, biến các quốc gia này thành thuộc địa của các nước đế quốc.',
    mainContent: [
      'Các nước tư bản Âu-Mỹ chuyển biến mạnh mẽ về kinh tế - xã hội.',
      'Chủ nghĩa tư bản chuyển từ tự do cạnh tranh sang giai đoạn độc quyền (đế quốc chủ nghĩa).',
      'Đẩy mạnh xâm chiếm và nô dịch các nước nhỏ, yếu ở châu Á, châu Phi, Mỹ-Latinh.',
      'Biến nhiều quốc gia thành thuộc địa của các nước đế quốc.',
    ],
    relatedFigures: ['Các nước đế quốc Âu-Mỹ', 'Các dân tộc thuộc địa'],
    significance: ['Tạo bối cảnh quốc tế dẫn tới nguy cơ xâm lược Việt Nam.', 'Giải thích động lực thực dân Pháp mở rộng thuộc địa ở Đông Dương.'],
    imageHint: 'https://img.loigiaihay.com/picture/2020/0527/luoc-do-pham-vi-thuoc-dia-cua-cac-nuoc-de-quoc-dau-the-ki-xx.png , https://vietjack.me/storage/uploads/images/19/untitled-1635158407.png',
    keywords: ['Đế quốc chủ nghĩa', 'Thuộc địa', 'Tự do cạnh tranh', 'Độc quyền'],
  },
  {
    year: '1858',
    phase: 'Giai đoạn 1: Bối cảnh lịch sử',
    subtitle: 'Thực dân Pháp nổ súng xâm lược Việt Nam',
    title: 'Thực dân Pháp xâm lược Việt Nam',
    summary: 'Ngày 1/9/1858, Pháp tấn công Đà Nẵng, mở đầu thời kỳ xâm lược và đô hộ Việt Nam.',
    context:
      'Giữa thế kỷ XIX, chủ nghĩa tư bản phương Tây chuyển sang giai đoạn đế quốc chủ nghĩa, đẩy mạnh chiếm thuộc địa ở châu Á, châu Phi.',
    mainContent: [
      'Pháp nổ súng tại Đà Nẵng, từng bước thôn tính lãnh thổ Việt Nam.',
      'Mục tiêu chính: chiếm thuộc địa, khai thác tài nguyên và thị trường.',
      'Triều Nguyễn suy yếu, không đủ năng lực tổ chức kháng chiến hiệu quả.',
      'Việt Nam dần rơi vào tình trạng thuộc địa nửa phong kiến.',
    ],
    relatedFigures: ['Nhân dân Việt Nam', 'Triều đình nhà Nguyễn', 'Quân đội thực dân Pháp'],
    significance: ['Mở đầu thời kỳ đô hộ của thực dân Pháp.', 'Làm xã hội Việt Nam phân hóa ngày càng sâu sắc.'],
    imageHint: 'https://th.bing.com/th/id/R.0250fdd4e9f5f0c927344ac466dc4b87?rik=rahbC9vZbSmTjg&pid=ImgRaw&r=0 , https://baotanglichsu.vn/DataFiles/Uploaded/image/Phap-tan-cong-vao--Hoi-An.gif',
    keywords: ['Xâm lược', 'Đà Nẵng', 'Thuộc địa', 'Triều Nguyễn'],
  },
  {
    year: '1884',
    phase: 'Giai đoạn 1: Bối cảnh lịch sử',
    subtitle: 'Hiệp ước Patenôtre xác lập ách thống trị thuộc địa',
    title: 'Hiệp ước Patenôtre',
    summary: 'Hiệp ước 1884 đánh dấu việc Việt Nam chính thức trở thành thuộc địa của Pháp.',
    context:
      'Sau nhiều hiệp ước nhượng bộ, triều đình phong kiến từng bước lệ thuộc và mất khả năng tự chủ đối ngoại.',
    mainContent: [
      'Việt Nam chính thức chịu sự bảo hộ của thực dân Pháp.',
      'Mất quyền tự chủ về đối ngoại và nhiều quyền quản trị quốc gia.',
      'Chính quyền phong kiến bản xứ trở thành bộ máy lệ thuộc.',
      'Phong trào yêu nước truyền thống đứng trước yêu cầu tìm hướng đi mới.',
    ],
    relatedFigures: ['Triều đình Huế', 'Toàn quyền Pháp tại Đông Dương', 'Sĩ phu yêu nước'],
    significance: ['Đẩy phong trào yêu nước chuyển dần sang khuynh hướng mới.', 'Tạo tiền đề xuất hiện tư tưởng cách mạng hiện đại.'],
    imageHint: 'https://tse1.mm.bing.net/th/id/OIP.qNKkyNpQm4AdgLBXCjs7nwAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 , https://video-thumbs.mediacdn.vn/zoom/600_315/vtv/2022/2/17/1702khatvongnonsong-16451113426801201291114-c4314_thumb6.jpg , https://tse3.mm.bing.net/th/id/OIP.PqhAsWg7Qm2VU5qkd9Un4gHaKq?rs=1&pid=ImgDetMain&o=7&rm=3 , https://vietjack.me/storage/uploads/images/11/5-1633939114.png',
    keywords: ['Patenôtre', 'Bảo hộ', 'Lệ thuộc', 'Phong trào yêu nước'],
  },
  {
    year: '1917',
    phase: 'Giai đoạn 2: Tiền đề thành lập Đảng',
    subtitle: 'Cách mạng Tháng Mười Nga mở ra thời đại mới',
    title: 'Cách mạng Tháng Mười Nga',
    summary: 'Cuộc cách mạng do V.I. Lenin lãnh đạo đã tạo bước ngoặt lớn cho phong trào cách mạng thế giới và thuộc địa.',
    context:
      'Phong trào giải phóng dân tộc toàn cầu phát triển mạnh, đặt vấn đề con đường mới cho các dân tộc bị áp bức.',
    mainContent: [
      'Lật đổ chế độ Nga hoàng và chính phủ tư sản lâm thời.',
      'Thành lập nhà nước Xô viết đầu tiên trên thế giới.',
      'Tạo nền tảng thực tiễn cho học thuyết cách mạng vô sản.',
      'Tác động trực tiếp đến nhận thức cách mạng ở Việt Nam.',
    ],
    relatedFigures: ['V.I. Lenin', 'Giai cấp công nhân Nga', 'Nguyễn Ái Quốc'],
    significance: ['Truyền bá chủ nghĩa Mác - Lênin vào Việt Nam.', 'Gợi mở con đường giải phóng dân tộc theo khuynh hướng vô sản.'],
    imageHint: 'https://th.bing.com/th/id/OIP.pR2F-n9ARxJAAOnmrXuXPQHaEo?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3 , https://special.vietnamplus.vn/wp-content/uploads/2021/03/ttxvn0901hc-1578581884-73.jpg',
    keywords: ['Lenin', 'Mác - Lênin', 'Xô viết', 'Giải phóng dân tộc'],
  },
  {
    year: '1919',
    phase: 'Giai đoạn 2: Tiền đề thành lập Đảng',
    subtitle: 'Nguyễn Ái Quốc gửi bản yêu sách 8 điểm',
    title: 'Yêu sách của nhân dân An Nam tại Versailles',
    summary: 'Nguyễn Ái Quốc gửi bản yêu sách đến Hội nghị Versailles, đòi quyền tự do, dân chủ cho dân tộc Việt Nam.',
    context:
      'Sau Chiến tranh thế giới thứ nhất, các diễn đàn quốc tế trở thành nơi đấu tranh chính trị quan trọng của các dân tộc thuộc địa.',
    mainContent: [
      'Bản yêu sách 8 điểm được gửi tới Hội nghị Versailles.',
      'Nội dung đòi quyền tự do, bình đẳng và cải cách cho người Việt Nam.',
      'Không được các cường quốc chấp nhận.',
      'Đánh dấu bước chuyển từ yêu nước tự phát sang hoạt động chính trị quốc tế có tổ chức.',
    ],
    relatedFigures: ['Nguyễn Ái Quốc', 'Nhóm người Việt Nam yêu nước tại Pháp'],
    significance: ['Khẳng định lập trường đấu tranh dân tộc trên trường quốc tế.', 'Mở đầu giai đoạn hoạt động chính trị đối ngoại của Nguyễn Ái Quốc.'],
    imageHint: 'https://tse2.mm.bing.net/th/id/OIP.9yPGKT_FE0Gs7n3ORUUPtgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3 , https://tse2.mm.bing.net/th/id/OIP.Rad34p-9U32HIaPXnZ5viAHaEJ?rs=1&pid=ImgDetMain&o=7&rm=3',
    keywords: ['Versailles', 'Yêu sách 8 điểm', 'Nguyễn Ái Quốc', 'Quốc tế'],
    quote: '“Không có gì quý hơn độc lập, tự do” (tinh thần xuyên suốt của con đường đấu tranh dân tộc).',
  },
  {
    year: '1925',
    phase: 'Giai đoạn 2: Tiền đề thành lập Đảng',
    subtitle: 'Thành lập Hội Việt Nam Cách mạng Thanh niên',
    title: 'Hội Việt Nam Cách mạng Thanh niên ra đời',
    summary: 'Tổ chức do Nguyễn Ái Quốc thành lập tại Quảng Châu, trực tiếp chuẩn bị về tổ chức và tư tưởng cho sự ra đời của Đảng.',
    context:
      'Phong trào yêu nước cần một tổ chức tiên phong có đường lối rõ ràng để thống nhất lực lượng cách mạng.',
    mainContent: [
      'Thành lập tại Quảng Châu (Trung Quốc) vào tháng 6/1925.',
      'Đào tạo cán bộ cách mạng thông qua các lớp huấn luyện chính trị.',
      'Xuất bản báo Thanh niên, truyền bá chủ nghĩa Mác - Lênin vào Việt Nam.',
      'Tạo nền tảng tổ chức cho quá trình hình thành các tổ chức cộng sản.',
    ],
    relatedFigures: ['Nguyễn Ái Quốc', 'Các hội viên Thanh niên cách mạng'],
    significance: ['Chuẩn bị lực lượng chính trị và cán bộ nòng cốt.', 'Là tổ chức tiền thân trực tiếp của Đảng Cộng sản Việt Nam.'],
    imageHint: 'https://www.nxbctqg.org.vn/img_data/images/images/duong%20c%C3%A1ch%20menh1.jpg , https://tse3.mm.bing.net/th/id/OIP.FPs_RvEo1_sPPygAbI4_lwHaEk?rs=1&pid=ImgDetMain&o=7&rm=3',
    keywords: ['Quảng Châu', 'Báo Thanh niên', 'Huấn luyện cán bộ', 'Tiền thân của Đảng'],
  },
  {
    year: '1929',
    phase: 'Giai đoạn 2: Tiền đề thành lập Đảng',
    subtitle: 'Ba tổ chức cộng sản lần lượt ra đời',
    title: 'Thành lập 3 tổ chức cộng sản',
    summary: 'Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng và Đông Dương Cộng sản Liên đoàn ra đời trong năm 1929.',
    context:
      'Phong trào công nhân và yêu nước phát triển mạnh, đòi hỏi một chính đảng cách mạng thống nhất lãnh đạo toàn quốc.',
    mainContent: [
      'Lần lượt hình thành các tổ chức cộng sản tại Bắc, Nam và Trung Kỳ.',
      'Thể hiện bước phát triển về chất của phong trào cách mạng vô sản ở Việt Nam.',
      'Tồn tại tình trạng hoạt động riêng rẽ, thiếu thống nhất tổ chức và đường lối.',
      'Đặt ra yêu cầu cấp bách phải hợp nhất thành một đảng duy nhất.',
    ],
    relatedFigures: ['Trần Văn Cung', 'Ngô Gia Tự', 'Nguyễn Đức Cảnh', 'Các chiến sĩ cộng sản tiên phong'],
    significance: ['Khẳng định xu thế tất yếu thành lập Đảng Cộng sản thống nhất.', 'Chuẩn bị trực tiếp cho Hội nghị hợp nhất đầu năm 1930.'],
    imageHint: 'https://tse1.mm.bing.net/th/id/OIP.q1nYeXv10bhRecLCbmj_lQHaGm?rs=1&pid=ImgDetMain&o=7&rm=3 , https://th.bing.com/th/id/OIP.XVRoWU6lZ_YxNo2WfsGfqwHaEc?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    keywords: ['Đông Dương Cộng sản Đảng', 'An Nam Cộng sản Đảng', 'Cộng sản Liên đoàn', 'Hợp nhất'],
  },
  {
    year: '03/02/1930',
    phase: 'Giai đoạn 3: Thành lập Đảng và ý nghĩa',
    subtitle: 'Hội nghị hợp nhất tại Hồng Kông',
    title: 'Thành lập Đảng Cộng sản Việt Nam',
    summary: 'Dưới sự chủ trì của Nguyễn Ái Quốc, các tổ chức cộng sản được hợp nhất, thông qua Cương lĩnh chính trị đầu tiên.',
    context:
      'Tình trạng phân tán lực lượng cách mạng đòi hỏi một tổ chức lãnh đạo thống nhất để giải quyết khủng hoảng đường lối cứu nước.',
    mainContent: [
      'Nguyễn Ái Quốc chủ trì hội nghị hợp nhất các tổ chức cộng sản.',
      'Thành lập Đảng Cộng sản Việt Nam và xác định tôn chỉ, điều lệ ban đầu.',
      'Thông qua Cương lĩnh chính trị đầu tiên với mục tiêu chiến lược rõ ràng.',
      'Xác lập đường lối cách mạng dân tộc dân chủ nhân dân.',
      'Xây dựng liên minh công - nông và mở rộng khối đại đoàn kết dân tộc.',
      'Khẳng định tính chất: độc lập dân tộc gắn liền với chủ nghĩa xã hội.',
    ],
    relatedFigures: ['Nguyễn Ái Quốc', 'Các đại biểu Đông Dương Cộng sản Đảng', 'Các đại biểu An Nam Cộng sản Đảng'],
    significance: [
      'Chấm dứt khủng hoảng về đường lối và tổ chức lãnh đạo cách mạng Việt Nam.',
      'Đánh dấu bước ngoặt lịch sử, mở ra thời kỳ mới cho cách mạng Việt Nam.',
      'Đặt nền tảng tư tưởng - chính trị cho mọi thắng lợi cách mạng về sau.',
    ],
    imageHint: 'https://tse4.mm.bing.net/th/id/OIP.mHQOewMsTL7HYcw1Zv8pnQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3 , https://tapchicongsan.org.vn/documents/20182/21413683/thanh+l%E1%BA%ADp+%C4%90%E1%BA%A3ng+%E1%BB%9F+H%C6%B0%C6%A1ng+C%E1%BA%A3ng.jpg/63e086b2-3d72-41e5-836b-9d3d6532adc0?t=1581328399958',
    keywords: ['03/02/1930', 'Hồng Kông', 'Cương lĩnh đầu tiên', 'Liên minh công - nông', 'Độc lập dân tộc'],
    quote: '“Đảng là đội tiên phong của vô sản giai cấp”.',
  },
  {
    year: '1945',
    phase: 'Phần mở rộng sau 1930',
    subtitle: 'Cách mạng Tháng Tám thành công',
    title: 'Giành chính quyền trên cả nước',
    summary: 'Nhân dân giành chính quyền, khai sinh nước Việt Nam Dân chủ Cộng hòa.',
    context: 'Kết quả của quá trình chuẩn bị lực lượng lâu dài dưới sự lãnh đạo của Đảng.',
    mainContent: [
      'Tổng khởi nghĩa giành chính quyền ở nhiều địa phương.',
      'Ngày 2/9/1945, nước Việt Nam Dân chủ Cộng hòa ra đời.',
    ],
    relatedFigures: ['Chủ tịch Hồ Chí Minh', 'Toàn dân Việt Nam'],
    significance: ['Mở ra kỷ nguyên độc lập dân tộc.', 'Khẳng định vai trò lãnh đạo của Đảng trong cách mạng giải phóng dân tộc.'],
    imageHint: 'https://file3.qdnd.vn/data/images/0/2022/09/01/tvkimgiang/bac%20ho%20doc%20tuyen%20ngon.jpg?dpi=150&quality=100&w=870 , https://th.bing.com/th/id/R.f2844c006f4a4319cae34ced39421d6a?rik=%2flkvf4rryJJAgQ&pid=ImgRaw&r=0',
    keywords: ['Cách mạng Tháng Tám', 'Độc lập', 'Ba Đình'],
  },
  {
    year: '1975',
    phase: 'Phần mở rộng sau 1930',
    subtitle: 'Giải phóng miền Nam, thống nhất đất nước',
    title: 'Đại thắng mùa Xuân 1975',
    summary: 'Cuộc kháng chiến chống Mỹ kết thúc thắng lợi, đất nước hoàn toàn thống nhất.',
    context: 'Sự nghiệp đấu tranh giải phóng dân tộc bước vào giai đoạn quyết định.',
    mainContent: [
      'Tổng tiến công và nổi dậy mùa Xuân 1975 toàn thắng.',
      'Giải phóng miền Nam, hoàn thành thống nhất đất nước.',
    ],
    relatedFigures: ['Quân và dân cả nước', 'Các lực lượng cách mạng miền Nam'],
    significance: ['Kết thúc chiến tranh, thu non sông về một mối.', 'Tạo tiền đề cho công cuộc xây dựng và phát triển đất nước.'],
    imageHint: 'https://th.bing.com/th/id/OIP.Pe0oFskEOCToxpT1h_b7RQHaEo?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3 , https://tse3.mm.bing.net/th/id/OIP.diOXxsp-rr_FKacx32gE6QHaFM?rs=1&pid=ImgDetMain&o=7&rm=3',
    keywords: ['30/4', 'Thống nhất', 'Đại thắng mùa Xuân'],
  },
  {
    year: '1986',
    phase: 'Phần mở rộng sau 1930',
    subtitle: 'Khởi xướng công cuộc Đổi mới',
    title: 'Đại hội VI và đường lối Đổi mới',
    summary: 'Đất nước chuyển sang thời kỳ đổi mới toàn diện, phát triển kinh tế thị trường định hướng xã hội chủ nghĩa.',
    context: 'Yêu cầu vượt qua khó khăn kinh tế - xã hội và hội nhập với xu thế phát triển mới của thế giới.',
    mainContent: [
      'Mở cửa kinh tế, thúc đẩy sản xuất và hội nhập.',
      'Từng bước hoàn thiện mô hình kinh tế thị trường định hướng xã hội chủ nghĩa.',
    ],
    relatedFigures: ['Đại hội VI của Đảng', 'Nhân dân và cộng đồng doanh nghiệp'],
    significance: ['Mở ra giai đoạn phát triển mới của đất nước.', 'Tạo nền tảng cho tăng trưởng và hội nhập quốc tế.'],
    imageHint: 'https://imgnvsk.vnanet.vn/mediaupload/org/2023/08/19/dhvi-619-16-48-13.png',
    keywords: ['Đổi mới', 'Mở cửa', 'Kinh tế thị trường định hướng XHCN'],
  },
  {
    year: '2025',
    phase: 'Phần mở rộng sau 1930',
    subtitle: 'Việt Nam trong giai đoạn phát triển mới',
    title: 'Hiện tại và tầm nhìn tương lai',
    summary: 'Việt Nam tiếp tục phát triển kinh tế, hội nhập quốc tế và đẩy mạnh chuyển đổi số, ứng dụng AI.',
    context: 'Bối cảnh toàn cầu hóa, cạnh tranh công nghệ và yêu cầu phát triển bền vững trong thế kỷ XXI.',
    mainContent: [
      'Đẩy mạnh tăng trưởng kinh tế gắn với đổi mới sáng tạo.',
      'Mở rộng hội nhập quốc tế trên nhiều lĩnh vực.',
      'Tăng tốc ứng dụng AI và công nghệ trong quản trị, giáo dục, sản xuất.',
    ],
    relatedFigures: ['Nhà nước', 'Doanh nghiệp', 'Thế hệ trẻ Việt Nam'],
    significance: ['Khẳng định năng lực thích ứng và bứt phá của Việt Nam.', 'Nối tiếp tinh thần độc lập, tự cường trong bối cảnh mới.'],
    imageHint: 'https://tse1.mm.bing.net/th/id/OIP.OEGiqiIUm4jsYX0WFWi0JQHaEQ?rs=1&pid=ImgDetMain&o=7&rm=3 , https://th.bing.com/th/id/R.1a16024995eabc49f751b10d110439f3?rik=i%2b%2f%2bbzSpvsDJZQ&pid=ImgRaw&r=0',
    keywords: ['Hội nhập', 'Chuyển đổi số', 'AI', 'Phát triển bền vững'],
  },
];
