import { useMemo, useState } from 'react';
import { RotateCcw, Play, ChevronRight } from 'lucide-react';

import bgRoom from '../assets/Backgrounds/Căn phòng họp bí mật (Màn 1).jpg';
import bgVillage from '../assets/Backgrounds/Làng quê (Màn 2).jpg';
import bgWarehouse from '../assets/Backgrounds/Kho hàng đêm khuya (Màn 3).jpg';
import bgTown from '../assets/Backgrounds/Phố thị trấn 1930.jpg';
import bgSunrise from '../assets/Backgrounds/Cảnh bình minh kết game.jpg';
import bgField from '../assets/Backgrounds/Cảnh đồng áng – Bác Thịnh.jpg';
import bgFactory from '../assets/Backgrounds/Xưởng công nhân (Công Duy).jpg';

import avatarMinh from '../assets/characters/Minh.jpg';
import avatarLanTrieu from '../assets/characters/Lan_Trieu.jpg';
import avatarHungBach from '../assets/characters/Hung_Bach.jpg';
import avatarAnCuong from '../assets/characters/An_Cuong.jpg';
import avatarPhungThien from '../assets/characters/Phung_Thien.jpg';
import avatarBacThinh from '../assets/characters/Bac_Thinh.jpg';
import avatarCongDuy from '../assets/characters/Cong_Duy.jpg';

type CharacterId =
  | 'MINH'
  | 'LAN_TRIEU'
  | 'HUNG_BACH'
  | 'AN_CUONG'
  | 'PHUNG_THIEN'
  | 'BAC_THINH'
  | 'CONG_DUY';

type BackgroundId =
  | 'ROOM'
  | 'VILLAGE'
  | 'WAREHOUSE'
  | 'TOWN'
  | 'SUNRISE'
  | 'FIELD'
  | 'FACTORY';

type IntroStage = 'landing' | 'characters' | 'context' | 'game';

interface DialogueLine {
  type: 'narration' | 'dialogue' | 'action';
  text: string;
  characterId?: CharacterId;
}

interface ChoiceOption {
  id: 'A' | 'B' | 'C';
  text: string;
  nextSceneId: SceneId;
  decisionKey: 'M1' | 'M2' | 'M3' | 'M4';
  isCorrect?: boolean;
}

interface Scene {
  id: SceneId;
  title: string;
  bg: BackgroundId;
  lines: DialogueLine[];
  nextSceneId?: SceneId;
  choices?: ChoiceOption[];
}

type SceneId =
  | 'INTRO'
  | 'M1_OPEN'
  | 'M1_CHOICE'
  | 'M1_BRANCH_A'
  | 'M1_BRANCH_B'
  | 'M1_BRANCH_C'
  | 'M2_OPEN'
  | 'M2_CHOICE'
  | 'M2_BRANCH_A'
  | 'M2_BRANCH_B'
  | 'M2_BRANCH_C'
  | 'M3_OPEN'
  | 'M3_CHOICE'
  | 'M3_BRANCH_A'
  | 'M3_BRANCH_B'
  | 'M3_BRANCH_C'
  | 'M4_OPEN'
  | 'M4_CHOICE'
  | 'M4_BRANCH_A'
  | 'M4_BRANCH_B'
  | 'M4_BRANCH_C'
  | 'M5_OPEN'
  | 'M5_END'
  | 'RESULT';

const CHARACTERS: Record<CharacterId, { name: string; avatar: string }> = {
  MINH: { name: 'Minh', avatar: avatarMinh },
  LAN_TRIEU: { name: 'Lan Triều', avatar: avatarLanTrieu },
  HUNG_BACH: { name: 'Hùng Bạch', avatar: avatarHungBach },
  AN_CUONG: { name: 'An Cương', avatar: avatarAnCuong },
  PHUNG_THIEN: { name: 'Phụng Thiện', avatar: avatarPhungThien },
  BAC_THINH: { name: 'Bác Thịnh', avatar: avatarBacThinh },
  CONG_DUY: { name: 'Công Duy', avatar: avatarCongDuy },
};

const CHARACTER_INTRO: Array<{ id: CharacterId; role: string; personality: string }> = [
  {
    id: 'MINH',
    role: 'Nhân vật người chơi',
    personality: 'Trẻ, sắc bén, nhiệt huyết; đang tìm con đường đúng giữa nhiều luồng tư tưởng.',
  },
  {
    id: 'PHUNG_THIEN',
    role: 'Xu hướng cải lương',
    personality: 'Thận trọng, thiên về pháp lý và cải cách dần dần, lo ngại cái giá của bạo lực.',
  },
  {
    id: 'HUNG_BACH',
    role: 'Xu hướng bạo động tự phát',
    personality: 'Quyết liệt, nóng nảy, căm thù thực dân sâu sắc và luôn muốn hành động ngay.',
  },
  {
    id: 'AN_CUONG',
    role: 'Xu hướng giáo điều lý thuyết',
    personality: 'Rất chắc lý luận, nhưng dễ áp dụng máy móc và thiếu linh hoạt theo thực tiễn.',
  },
  {
    id: 'LAN_TRIEU',
    role: 'Người dẫn đường chiến lược',
    personality: 'Điềm tĩnh, thực tế, lắng nghe và định hướng bằng lập luận có chiều sâu.',
  },
  {
    id: 'BAC_THINH',
    role: 'Nông dân đại diện quần chúng',
    personality: 'Chân chất, nhiều mất mát, là thước đo thực tiễn của mọi đường lối.',
  },
  {
    id: 'CONG_DUY',
    role: 'Công nhân – cầu nối thực tiễn',
    personality: 'Bình tĩnh, tin vào sức mạnh tổ chức tập thể và liên minh công-nông.',
  },
];

const BACKGROUNDS: Record<BackgroundId, string> = {
  ROOM: bgRoom,
  VILLAGE: bgVillage,
  WAREHOUSE: bgWarehouse,
  TOWN: bgTown,
  SUNRISE: bgSunrise,
  FIELD: bgField,
  FACTORY: bgFactory,
};

const SCENES: Record<SceneId, Scene> = {
  INTRO: {
    id: 'INTRO',
    title: 'Mở đầu',
    bg: 'TOWN',
    lines: [
      { type: 'narration', text: 'Đông Dương, năm 1929. Đất nước chìm trong bóng tối thuộc địa.' },
      { type: 'narration', text: 'Bạn là MINH – cán bộ trẻ vừa trở về, mang theo một lá thư mật và một câu hỏi lớn.' },
      { type: 'narration', text: '“Chúng ta cần làm gì bây giờ?”' },
    ],
    nextSceneId: 'M1_OPEN',
  },
  M1_OPEN: {
    id: 'M1_OPEN',
    title: 'Màn 1: Bóng tối chia rẽ',
    bg: 'ROOM',
    lines: [
      { type: 'narration', text: 'Hà Nội. Căn phòng nhỏ gần Khâm Thiên. Không khí vừa nóng vừa căng thẳng.' },
      {
        type: 'dialogue',
        characterId: 'PHUNG_THIEN',
        text: 'Ba tháng qua, nhiều đồng chí bị bắt. Mạng lưới ở Sài Gòn gần như tan rã.',
      },
      {
        type: 'dialogue',
        characterId: 'HUNG_BACH',
        text: 'Chúng ta quá nhu nhược! Cần hành động thực sự ngay bây giờ!',
      },
      {
        type: 'dialogue',
        characterId: 'AN_CUONG',
        text: 'Không phải nhanh hay chậm. Vấn đề là nền tảng giai cấp có đúng hay không.',
      },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Minh, em mới về. Em thấy gì?',
      },
    ],
    nextSceneId: 'M1_CHOICE',
  },
  M1_CHOICE: {
    id: 'M1_CHOICE',
    title: 'Quyết định 1',
    bg: 'ROOM',
    lines: [
      {
        type: 'action',
        text: '*Lan Triều vừa đặt câu hỏi: “Nếu cứ tiếp tục như thế này thêm ba năm nữa – chúng ta còn lại gì?”*',
      },
      { type: 'action', text: '*Hùng Bạch đập tay xuống bàn:*' },
      {
        type: 'dialogue',
        characterId: 'HUNG_BACH',
        text: 'Hợp nhất ngay! Đoàn kết là sức mạnh – chúng ta đang lãng phí thời gian tranh luận!',
      },
      { type: 'action', text: '*Lan Triều lắc đầu nhẹ, nhìn bạn:*' },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Nhưng hợp nhất trên nền tảng nào? Đó mới là câu hỏi. Minh – em thấy sao?',
      },
      {
        type: 'dialogue',
        characterId: 'MINH',
        text: 'Điều kiện để ba tổ chức hợp nhất là...',
      },
    ],
    choices: [
      {
        id: 'A',
        text: 'Hợp nhất ngay – thời gian là vũ khí. Bất đồng sẽ tự giải quyết trong quá trình hoạt động chung.',
        nextSceneId: 'M1_BRANCH_A',
        decisionKey: 'M1',
      },
      {
        id: 'B',
        text: 'Phải thống nhất cương lĩnh trước, nhưng không thể chờ đồng thuận hoàn toàn. Đa số đồng ý là đủ để bắt đầu.',
        nextSceneId: 'M1_BRANCH_B',
        decisionKey: 'M1',
      },
      {
        id: 'C',
        text: 'Phải thống nhất cương lĩnh trước, và cương lĩnh đó phải được tất cả thực sự tin – không chỉ ký tên cho xong.',
        nextSceneId: 'M1_BRANCH_C',
        decisionKey: 'M1',
        isCorrect: true,
      },
    ],
  },
  M1_BRANCH_A: {
    id: 'M1_BRANCH_A',
    title: 'Bẫy thực dụng',
    bg: 'ROOM',
    lines: [
      {
        type: 'narration',
        text: '❌ Phân tích: Hợp nhất không nền tảng tư tưởng giống như xây nhà không móng. Khủng hoảng đến sẽ tan từ bên trong.',
      },
      {
        type: 'narration',
        text: 'Hậu quả: Nội bộ hỗn loạn, thực dân lợi dụng chia rẽ. Bạn tiếp tục với BẤT LỢI ở màn sau.',
      },
    ],
    nextSceneId: 'M2_OPEN',
  },
  M1_BRANCH_B: {
    id: 'M1_BRANCH_B',
    title: 'Bẫy đa số hình thức',
    bg: 'ROOM',
    lines: [
      {
        type: 'narration',
        text: '⚠️ Phân tích: “Đa số đồng ý” nghe hợp lý, nhưng trong tổ chức bí mật người bất đồng có thể do dự đúng thời điểm then chốt.',
      },
      {
        type: 'narration',
        text: 'Hậu quả: Hợp nhất được nhưng có RỦI RO ẨN – ký tên mà chưa thật sự tin.',
      },
    ],
    nextSceneId: 'M2_OPEN',
  },
  M1_BRANCH_C: {
    id: 'M1_BRANCH_C',
    title: 'Niềm tin chung thật sự',
    bg: 'ROOM',
    lines: [
      {
        type: 'narration',
        text: '✅ Phân tích: Cương lĩnh không phải hợp đồng pháp lý, mà là niềm tin chung để cùng hành động khi chịu áp lực.',
      },
      { type: 'dialogue', characterId: 'LAN_TRIEU', text: 'Tốt. Chúng ta sang câu hỏi tiếp theo.' },
    ],
    nextSceneId: 'M2_OPEN',
  },
  M2_OPEN: {
    id: 'M2_OPEN',
    title: 'Màn 2: Chọn mâu thuẫn trung tâm',
    bg: 'FIELD',
    lines: [
      { type: 'narration', text: 'Lan Triều đưa bạn về làng Mỹ Cường để nhìn thẳng vào thực tiễn.' },
      {
        type: 'dialogue',
        characterId: 'BAC_THINH',
        text: 'Tôi không biết chữ nghĩa. Tôi chỉ biết cả thằng Pháp lẫn Cai Liêm đều đè lên lưng tôi.',
      },
      {
        type: 'dialogue',
        characterId: 'BAC_THINH',
        text: 'Nhưng nếu không có thằng Pháp, thằng Cai Liêm có dám làm thế không?',
      },
    ],
    nextSceneId: 'M2_CHOICE',
  },
  M2_CHOICE: {
    id: 'M2_CHOICE',
    title: 'Quyết định 2',
    bg: 'FIELD',
    lines: [
      {
        type: 'action',
        text: '*Bác Thịnh vừa nói xong. An Cương và Hùng Bạch tiếp tục tranh cãi.*',
      },
      { type: 'action', text: '*Lan Triều đứng dậy, giọng trầm:*' },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Dừng lại. Câu hỏi không phải “ai là kẻ thù”, mà là kẻ thù NÀO phải đánh TRƯỚC. Minh – em nghĩ sao?',
      },
      {
        type: 'dialogue',
        characterId: 'MINH',
        text: 'Mâu thuẫn cần giải quyết trước tiên là...',
      },
    ],
    choices: [
      {
        id: 'A',
        text: 'Mâu thuẫn giai cấp – địa chủ và tư bản. Giải phóng giai cấp thì dù ai cai trị cũng không bóc lột được nữa.',
        nextSceneId: 'M2_BRANCH_A',
        decisionKey: 'M2',
      },
      {
        id: 'B',
        text: 'Cả hai cùng lúc – đánh thực dân mà không giải phóng giai cấp thì chỉ đổi ông chủ này lấy ông chủ khác.',
        nextSceneId: 'M2_BRANCH_B',
        decisionKey: 'M2',
      },
      {
        id: 'C',
        text: 'Mâu thuẫn dân tộc là trọng tâm trước tiên; vì giải phóng dân tộc là điều kiện để giải quyết bền vững các mâu thuẫn khác.',
        nextSceneId: 'M2_BRANCH_C',
        decisionKey: 'M2',
        isCorrect: true,
      },
    ],
  },
  M2_BRANCH_A: {
    id: 'M2_BRANCH_A',
    title: 'Sai thứ tự ưu tiên',
    bg: 'VILLAGE',
    lines: [
      {
        type: 'narration',
        text: 'Phân tích: Lý thuyết dài hạn đúng, nhưng thực tiễn thuộc địa khiến mọi thắng lợi giai cấp bị chính quyền thực dân đảo ngược ngay.',
      },
      {
        type: 'dialogue',
        characterId: 'BAC_THINH',
        text: 'Nếu tôi lấy lại ruộng sáng nay, chiều Pháp kéo lính đến thì sao?',
      },
      { type: 'narration', text: 'Hãy chọn lại quyết định 2.' },
    ],
    nextSceneId: 'M2_CHOICE',
  },
  M2_BRANCH_B: {
    id: 'M2_BRANCH_B',
    title: 'Bẫy “đánh cả hai cùng lúc”',
    bg: 'VILLAGE',
    lines: [
      {
        type: 'narration',
        text: 'Phân tích: Nghe rất thuyết phục nhưng sẽ phân tán lực lượng, mục tiêu mơ hồ và khó xây mặt trận thống nhất.',
      },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Đánh hai mặt trận bằng một lực lượng mỏng là tự làm yếu mình. Hãy chọn lại chiến lược.',
      },
      { type: 'narration', text: 'Hãy chọn lại quyết định 2.' },
    ],
    nextSceneId: 'M2_CHOICE',
  },
  M2_BRANCH_C: {
    id: 'M2_BRANCH_C',
    title: 'Dân tộc trước – thứ tự đúng',
    bg: 'VILLAGE',
    lines: [
      {
        type: 'dialogue',
        characterId: 'MINH',
        text: 'Không phủ nhận giai cấp, nhưng phải giải phóng dân tộc trước để có không gian giải quyết các mâu thuẫn còn lại.',
      },
      { type: 'dialogue', characterId: 'LAN_TRIEU', text: 'Đúng. Bây giờ sang câu hỏi về lực lượng nòng cốt.' },
    ],
    nextSceneId: 'M3_OPEN',
  },
  M3_OPEN: {
    id: 'M3_OPEN',
    title: 'Màn 3: Xác định lực lượng',
    bg: 'WAREHOUSE',
    lines: [
      {
        type: 'dialogue',
        characterId: 'AN_CUONG',
        text: 'Công nhân phải lãnh đạo vì tính tổ chức và tính cách mạng triệt để.',
      },
      {
        type: 'dialogue',
        characterId: 'CONG_DUY',
        text: 'Cách mạng cần tất cả mọi người, nhưng cần họ đúng vai trò.',
      },
      { type: 'dialogue', characterId: 'LAN_TRIEU', text: 'Minh, em quyết định đi.' },
    ],
    nextSceneId: 'M3_CHOICE',
  },
  M3_CHOICE: {
    id: 'M3_CHOICE',
    title: 'Quyết định 3',
    bg: 'WAREHOUSE',
    lines: [
      { type: 'action', text: '*Tranh luận về lực lượng đang đến hồi gay gắt nhất.*' },
      {
        type: 'dialogue',
        characterId: 'AN_CUONG',
        text: 'Lãnh đạo là vai trò lịch sử – không phải bầu chọn. Giai cấp công nhân không cần xin phép.',
      },
      {
        type: 'dialogue',
        characterId: 'PHUNG_THIEN',
        text: 'Tôi xuất thân tiểu tư sản nhưng đã hy sinh rất nhiều. Dựa vào gì để nói ai đại diện cho ai?',
      },
      { type: 'action', text: '*Công Duy im lặng nhìn Minh, chờ đợi.*' },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Câu hỏi là: liên minh nào tạo đủ sức mạnh để thắng?',
      },
      { type: 'dialogue', characterId: 'MINH', text: 'Lực lượng nòng cốt của cách mạng phải là...' },
    ],
    choices: [
      {
        id: 'A',
        text: 'Giai cấp công nhân – dù ít số lượng nhưng ở vị trí kinh tế then chốt; một điểm đình công có giá trị chiến lược lớn.',
        nextSceneId: 'M3_BRANCH_A',
        decisionKey: 'M3',
      },
      {
        id: 'B',
        text: 'Liên minh công nhân – nông dân – trí thức theo cấu trúc ba lực lượng bình đẳng, bổ sung cho nhau.',
        nextSceneId: 'M3_BRANCH_B',
        decisionKey: 'M3',
      },
      {
        id: 'C',
        text: 'Liên minh công-nông là nòng cốt, thu hút tầng lớp khác phù hợp.',
        nextSceneId: 'M3_BRANCH_C',
        decisionKey: 'M3',
        isCorrect: true,
      },
    ],
  },
  M3_BRANCH_A: {
    id: 'M3_BRANCH_A',
    title: 'Bẫy so sánh máy móc',
    bg: 'FACTORY',
    lines: [
      {
        type: 'narration',
        text: 'Phân tích: So với Nga 1917 là khập khiễng. Việt Nam 1930 có công nhân còn phân tán, bỏ qua nông dân là tự cô lập.',
      },
      { type: 'narration', text: 'Hãy chọn lại quyết định 3.' },
    ],
    nextSceneId: 'M3_CHOICE',
  },
  M3_BRANCH_B: {
    id: 'M3_BRANCH_B',
    title: 'Bẫy bình đẳng cấu trúc',
    bg: 'TOWN',
    lines: [
      {
        type: 'narration',
        text: 'Phân tích: Không sai về giá trị đóng góp, nhưng “ba bên bình đẳng” khiến khó quyết định khi bất đồng chiến lược.',
      },
      {
        type: 'dialogue',
        characterId: 'PHUNG_THIEN',
        text: 'Tôi không thích điều này, nhưng tôi hiểu vì sao phải có hạt nhân vững.',
      },
      { type: 'narration', text: 'Hãy chọn lại quyết định 3.' },
    ],
    nextSceneId: 'M3_CHOICE',
  },
  M3_BRANCH_C: {
    id: 'M3_BRANCH_C',
    title: 'Liên minh công-nông',
    bg: 'FACTORY',
    lines: [
      {
        type: 'dialogue',
        characterId: 'MINH',
        text: 'Liên minh công-nông là hạt nhân. Trí thức và các tầng lớp khác là lực lượng tham gia quan trọng, nhưng không thay hạt nhân.',
      },
      {
        type: 'dialogue',
        characterId: 'PHUNG_THIEN',
        text: 'Tôi không thích câu trả lời đó. Nhưng tôi hiểu lý do của nó.',
      },
    ],
    nextSceneId: 'M4_OPEN',
  },
  M4_OPEN: {
    id: 'M4_OPEN',
    title: 'Màn 4: Phương pháp đấu tranh',
    bg: 'TOWN',
    lines: [
      {
        type: 'dialogue',
        characterId: 'HUNG_BACH',
        text: 'Có nhóm thanh niên đang chuẩn bị tấn công đồn. Đây là thời cơ!',
      },
      {
        type: 'dialogue',
        characterId: 'CONG_DUY',
        text: 'Tôi từng thấy bạo động tự phát khiến phong trào tê liệt nhiều năm.',
      },
      {
        type: 'narration',
        text: 'Thông tin cơ sở: Vùng A tự phát, Vùng B đình công có tổ chức, Vùng C vừa bị đàn áp nặng.',
      },
    ],
    nextSceneId: 'M4_CHOICE',
  },
  M4_CHOICE: {
    id: 'M4_CHOICE',
    title: 'Quyết định 4',
    bg: 'TOWN',
    lines: [
      { type: 'action', text: '*Tin tức đến liên tiếp. Bản đồ trải rộng trên bàn.*' },
      { type: 'narration', text: 'Vùng A: Nông dân tự phát tụ họp đông, chưa có lãnh đạo rõ ràng.' },
      { type: 'narration', text: 'Vùng B: Công nhân đình công có trật tự, nhưng chủ đang điều quân.' },
      { type: 'narration', text: 'Vùng C: Nhóm tấn công đồn đêm qua, 8 người chết, không đạt mục tiêu.' },
      {
        type: 'dialogue',
        characterId: 'HUNG_BACH',
        text: 'Vùng A đang chờ chúng ta! Bây giờ hoặc không bao giờ!',
      },
      {
        type: 'dialogue',
        characterId: 'PHUNG_THIEN',
        text: 'Vùng C vừa xảy ra. Anh muốn lặp lại à?',
      },
      {
        type: 'dialogue',
        characterId: 'CONG_DUY',
        text: 'Vùng B cần hỗ trợ ngay – không phải kích động, mà là tổ chức để giữ được thế.',
      },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Minh, chỉ có thể chọn một hành động chính. Ta không đủ người cho cả ba nơi.',
      },
      { type: 'dialogue', characterId: 'MINH', text: 'Nguồn lực có hạn, ưu tiên của tôi là...' },
    ],
    choices: [
      {
        id: 'A',
        text: 'Ưu tiên Vùng A – bắt kịp phong trào quần chúng tự phát, bỏ lỡ lúc này là có tội.',
        nextSceneId: 'M4_BRANCH_A',
        decisionKey: 'M4',
      },
      {
        id: 'B',
        text: 'Ưu tiên Vùng B – củng cố nơi đã có tổ chức; đình công thành công sẽ là bàn đạp mở rộng.',
        nextSceneId: 'M4_BRANCH_B',
        decisionKey: 'M4',
        isCorrect: true,
      },
      {
        id: 'C',
        text: 'Không đến cả ba, rút toàn bộ về củng cố trung tâm; bảo toàn lực lượng và chờ thời điểm khác.',
        nextSceneId: 'M4_BRANCH_C',
        decisionKey: 'M4',
      },
    ],
  },
  M4_BRANCH_A: {
    id: 'M4_BRANCH_A',
    title: 'Bẫy chạy theo tự phát',
    bg: 'TOWN',
    lines: [
      {
        type: 'narration',
        text: 'Phân tích: Đến Vùng A mà thiếu kế hoạch, hậu phương, đường rút lui sẽ bị cuốn vào hỗn loạn như Vùng C.',
      },
      { type: 'narration', text: 'Hậu quả: Mất người, mất nhịp tổ chức, Vùng B cũng thất bại vì bị bỏ rơi.' },
      { type: 'narration', text: 'Hãy chọn lại quyết định 4.' },
    ],
    nextSceneId: 'M4_CHOICE',
  },
  M4_BRANCH_B: {
    id: 'M4_BRANCH_B',
    title: 'Củng cố điểm có tổ chức',
    bg: 'TOWN',
    lines: [
      {
        type: 'dialogue',
        characterId: 'CONG_DUY',
        text: 'Giữ vững Vùng B trước. Nếu thắng ở đây, Vùng A sẽ tự tìm thấy hướng đi tổ chức.',
      },
      {
        type: 'narration',
        text: 'Kết quả: Đình công Vùng B thành công, tạo tiếng vang và mở đường mở rộng lực lượng có kỷ luật.',
      },
    ],
    nextSceneId: 'M5_OPEN',
  },
  M4_BRANCH_C: {
    id: 'M4_BRANCH_C',
    title: 'Bẫy co cụm chờ thời',
    bg: 'TOWN',
    lines: [
      {
        type: 'narration',
        text: '❌ Phân tích: Bảo toàn lực lượng đúng khi không có cơ hội khả thi. Nhưng Vùng B đang có cơ sở thực tế cần hỗ trợ ngay.',
      },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Rút về trung tâm lúc quần chúng cần hành động cụ thể sẽ khiến ta an toàn nhưng cô lập.',
      },
      { type: 'narration', text: 'Hãy chọn lại quyết định 4.' },
    ],
    nextSceneId: 'M4_CHOICE',
  },
  M5_OPEN: {
    id: 'M5_OPEN',
    title: 'Màn 5: Hai dòng lịch sử',
    bg: 'ROOM',
    lines: [
      { type: 'narration', text: 'Tháng 2-1930. Các đại biểu ngồi lại để viết cương lĩnh.' },
      {
        type: 'dialogue',
        characterId: 'LAN_TRIEU',
        text: 'Mục tiêu cuối cùng là gì, sau khi giành độc lập?',
      },
      {
        type: 'dialogue',
        characterId: 'MINH',
        text: 'Đánh đuổi thực dân, xóa bỏ phong kiến, đất cho người cày, độc lập dân tộc và tiến lên xã hội không bóc lột.',
      },
    ],
    nextSceneId: 'M5_END',
  },
  M5_END: {
    id: 'M5_END',
    title: 'Kết',
    bg: 'SUNRISE',
    lines: [
      {
        type: 'narration',
        text: 'Lịch sử không do thiên mệnh quyết định. Lịch sử do con người quyết định bằng lựa chọn đúng.',
      },
      { type: 'narration', text: 'Bình minh đã đến.' },
    ],
    nextSceneId: 'RESULT',
  },
  RESULT: {
    id: 'RESULT',
    title: 'Kết quả',
    bg: 'SUNRISE',
    lines: [
      {
        type: 'narration',
        text: 'Bình minh đã đến.',
      },
      {
        type: 'narration',
        text: 'Không phải ngẫu nhiên. Không phải vì vận trời. Mà vì những con người bình thường đã đưa ra những quyết định đúng – trong bóng tối, dưới áp bức, khi không ai biết ngày mai sẽ ra sao.',
      },
      {
        type: 'narration',
        text: '― Bài học thứ nhất: Xác định đúng kẻ thù không phải là chuyện đơn giản.',
      },
      {
        type: 'narration',
        text: 'Trong suốt hành trình này, bạn đã thấy: có người chỉ thấy địa chủ, có người chỉ thấy thực dân, có người muốn đánh tất cả cùng lúc. Tất cả đều có lý lẽ. Nhưng chỉ một hướng dẫn đến chiến thắng.',
      },
      {
        type: 'narration',
        text: 'Cương lĩnh 1930 xác định: mâu thuẫn chủ yếu là giữa toàn thể dân tộc Việt Nam với thực dân Pháp xâm lược. Đây không phải là sự chọn lựa giữa dân tộc hay giai cấp – mà là nhận ra rằng: không có độc lập, không thể có bất cứ điều gì khác.',
      },
      {
        type: 'narration',
        text: 'Như bác Thịnh đã nói – giản dị mà sắc bén hơn mọi lý luận: "Nếu không có thằng Pháp, thằng Cai Liêm có dám làm thế không?"',
      },
      {
        type: 'narration',
        text: '― Bài học thứ hai: Sức mạnh không đến từ sự tinh khiết – mà đến từ sự đoàn kết đúng cách.',
      },
      {
        type: 'narration',
        text: 'An Cương muốn một giai cấp thuần túy. Hùng Bạch muốn mọi người xông lên cùng lúc. Phụng Thiện muốn một liên minh bình đẳng không phân biệt. Tất cả đều bỏ lỡ một điều.',
      },
      {
        type: 'narration',
        text: 'Cương lĩnh 1930 chọn liên minh công – nông làm hạt nhân: giai cấp công nhân lãnh đạo bởi tính tổ chức và mục tiêu rõ ràng; nông dân là lực lượng đông đảo, chịu áp bức sâu sắc nhất, có động lực cách mạng mạnh mẽ nhất.',
      },
      {
        type: 'narration',
        text: 'Không cô lập như An Cương muốn. Không hòa tan như Phụng Thiện đề nghị. Có hạt nhân vững chắc – rồi mới có thể thu hút rộng rãi. Đó là sự khác biệt giữa một phong trào có định hướng và một đám đông có nhiệt huyết.',
      },
      {
        type: 'narration',
        text: '― Bài học thứ ba: Lòng dũng cảm không thay thế được chiến lược.',
      },
      {
        type: 'narration',
        text: 'Hùng Bạch không sai khi nói không thể ngồi yên mãi. Nhưng ông đã nhầm khi nghĩ rằng hành động bất kỳ đều tốt hơn không hành động. Người bạn của ông – hai mươi lăm tuổi, chết trong ba ngày, không ai nhớ tên – là minh chứng đau đớn nhất.',
      },
      {
        type: 'narration',
        text: 'Cương lĩnh 1930 không chọn bạo động tự phát. Không chọn cải lương ảo tưởng. Không chọn giáo điều cứng nhắc. Chọn đấu tranh có tổ chức, có chiến lược, biết khi nào tiến – khi nào lui – khi nào bảo toàn lực lượng cho thời điểm quyết định.',
      },
      {
        type: 'narration',
        text: 'Bảo tồn lực lượng không phải là hèn nhát. Đó là sự tôn trọng đối với những người đã và sẽ hy sinh – để sự hy sinh đó không trở thành vô nghĩa.',
      },
      {
        type: 'narration',
        text: '― Và đây là điều quan trọng nhất bạn vừa trải nghiệm:',
      },
      {
        type: 'narration',
        text: 'Trước tháng 2 năm 1930, phong trào cách mạng Việt Nam đang chìm trong khủng hoảng đường lối. Không phải thiếu người dũng cảm. Không phải thiếu căm thù kẻ thù. Mà thiếu câu trả lời cho ba câu hỏi cốt lõi: Chống ai? Dựa vào ai? Bằng cách nào?',
      },
      {
        type: 'narration',
        text: 'Cương lĩnh chính trị đầu tiên của Đảng – tháng 2 năm 1930 – đã trả lời cả ba câu hỏi đó. Lần đầu tiên trong lịch sử, phong trào cách mạng Việt Nam có một đường lối thống nhất, rõ ràng, xuất phát từ thực tiễn của đất nước.',
      },
      {
        type: 'narration',
        text: 'Đó không phải là một văn bản lý thuyết. Đó là kết quả của những tranh luận như bạn vừa chứng kiến – những bất đồng thực sự, những lựa chọn thực sự, được đưa ra bởi những con người thực sự đang đặt cược cả cuộc đời vào đó.',
      },
      {
        type: 'narration',
        text: '― Và từ quyết định đêm đó:',
      },
      {
        type: 'narration',
        text: '1945 – Cách mạng tháng Tám thành công trong mười ngày. Không phải phép màu – là mười lăm năm xây dựng tổ chức, giữ gìn lực lượng, và kiên định đường lối từ Cương lĩnh 1930.',
      },
      {
        type: 'narration',
        text: '1954 – Chiến thắng Điện Biên Phủ. Lần đầu tiên trong lịch sử hiện đại, một dân tộc thuộc địa đánh bại hoàn toàn một đội quân viễn chinh phương Tây trên chiến trường.',
      },
      {
        type: 'narration',
        text: '1975 – Thống nhất đất nước. Bác Thịnh – nếu còn sống – sẽ thấy con cháu mình lớn lên trong một đất nước không còn bóng thực dân.',
      },
      {
        type: 'narration',
        text: '1986 và sau đó – Đổi Mới, hội nhập, phát triển. Tất cả những điều đó chỉ có thể xảy ra trên nền tảng của một đất nước độc lập và thống nhất.',
      },
      {
        type: 'narration',
        text: 'Lịch sử không phải là chuỗi sự kiện tất yếu xảy ra theo ý trời. Lịch sử là những ngã rẽ – và ở mỗi ngã rẽ, có những con người phải chọn.',
      },
      {
        type: 'narration',
        text: 'Bạn vừa đứng ở những ngã rẽ đó. Bạn đã thấy: chọn sai không phải vì ngu dốt – mà vì mỗi sai lầm đều có lý lẽ riêng của nó. Điều làm nên sự khác biệt không phải là gan dạ hay nhiệt huyết – mà là tư duy đúng, đường lối đúng, vào thời điểm đúng.',
      },
      {
        type: 'narration',
        text: 'Đó là giá trị của Cương lĩnh chính trị đầu tiên năm 1930. Không phải một trang giấy – mà là ánh sáng đã dẫn đường cho một dân tộc đi qua bóng tối dài nhất của mình.',
      },
    ],
  },
};

const CAST_ORDER: CharacterId[] = [
  'MINH',
  'LAN_TRIEU',
  'HUNG_BACH',
  'AN_CUONG',
  'PHUNG_THIEN',
  'BAC_THINH',
  'CONG_DUY',
];

const DECISION_TOTAL = 4;

export default function GamePage() {
  const [introStage, setIntroStage] = useState<IntroStage>('landing');
  const [sceneId, setSceneId] = useState<SceneId>('INTRO');
  const [lineIndex, setLineIndex] = useState(0);
  const [correctDecisions, setCorrectDecisions] = useState<Set<'M1' | 'M2' | 'M3' | 'M4'>>(new Set());

  const scene = SCENES[sceneId];
  const currentLine = scene.lines[lineIndex];

  const currentSpeaker = currentLine?.type === 'dialogue' && currentLine.characterId ? currentLine.characterId : undefined;

  const score = useMemo(() => Math.round((correctDecisions.size / DECISION_TOTAL) * 100), [correctDecisions]);

  const resetGame = () => {
    setIntroStage('landing');
    setSceneId('INTRO');
    setLineIndex(0);
    setCorrectDecisions(new Set());
  };

  const goToScene = (nextSceneId: SceneId) => {
    setSceneId(nextSceneId);
    setLineIndex(0);
  };

  const handleContinue = () => {
    if (lineIndex < scene.lines.length - 1) {
      setLineIndex((prev) => prev + 1);
      return;
    }

    if (scene.nextSceneId) {
      goToScene(scene.nextSceneId);
    }
  };

  const handleChoice = (choice: ChoiceOption) => {
    if (choice.isCorrect) {
      setCorrectDecisions((prev) => {
        if (prev.has(choice.decisionKey)) {
          return prev;
        }

        const next = new Set(prev);
        next.add(choice.decisionKey);
        return next;
      });
    }

    goToScene(choice.nextSceneId);
  };

  const backgroundImage =
    introStage === 'game'
      ? BACKGROUNDS[scene.bg]
      : introStage === 'context'
        ? BACKGROUNDS.FIELD
        : BACKGROUNDS.TOWN;
  const showChoices = Boolean(scene.choices && lineIndex === scene.lines.length - 1);
  const canContinue = !showChoices && Boolean(scene.nextSceneId || lineIndex < scene.lines.length - 1);
  const isResult = sceneId === 'RESULT';
  const isWrappedAction =
    currentLine?.text.trim().startsWith('*') && currentLine?.text.trim().endsWith('*');
  const lineText =
    currentLine && isWrappedAction
      ? currentLine.text.trim().slice(1, -1)
      : (currentLine?.text ?? '');

  // TODO: Khi cần bật âm thanh, có thể thêm state bật/tắt và phát theo từng scene (BGM/SFX) từ source nội bộ.

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary text-secondary-4">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        {introStage !== 'game' ? (
          <div className="mx-auto my-auto w-full max-w-5xl rounded-2xl border border-secondary-4/20 bg-primary/80 p-6 backdrop-blur-md md:p-8">
            {introStage === 'landing' && (
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-secondary-3">Game lịch sử tương tác</p>
                <h1 className="mt-3 text-3xl font-bold text-secondary-4 md:text-5xl">Game</h1>
                <p className="mx-auto mt-5 max-w-2xl text-secondary-4/85">
                  Bình minh chưa đến: đọc hội thoại, đưa ra 4 quyết định chiến lược, nhận kết quả cuối cùng.
                </p>
                <button
                  type="button"
                  onClick={() => setIntroStage('characters')}
                  className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-secondary-3 px-6 py-3 font-semibold text-primary transition hover:scale-[1.02]"
                >
                  <Play size={18} />
                  Xem nhân vật
                </button>
              </div>
            )}

            {introStage === 'characters' && (
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-secondary-3">Phần 1 / Giới thiệu nhân vật</p>
                <h2 className="mt-2 text-2xl font-bold text-secondary-4 md:text-3xl">Tính cách các nhân vật</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CHARACTER_INTRO.map((item) => {
                    const character = CHARACTERS[item.id];
                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-secondary-4/20 bg-black/25 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={character.avatar}
                            alt={character.name}
                            className="h-12 w-12 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div>
                            <p className="font-semibold text-secondary-4">{character.name}</p>
                            <p className="text-xs text-secondary-3">{item.role}</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-secondary-4/85">{item.personality}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIntroStage('context')}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary-3 px-5 py-2.5 text-sm font-semibold text-primary transition hover:scale-[1.02]"
                  >
                    Tiếp: Bối cảnh
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {introStage === 'context' && (
              <div className="text-left md:text-center">
                <p className="text-xs uppercase tracking-[0.15em] text-secondary-3">Phần 2 / Giới thiệu bối cảnh</p>
                <h2 className="mt-2 text-2xl font-bold text-secondary-4 md:text-3xl">Đông Dương cuối năm 1929</h2>
                <div className="mx-auto mt-5 max-w-3xl space-y-3 text-secondary-4/90">
                  <p>
                    Đất nước chìm trong bóng tối thuộc địa, ba tổ chức cách mạng hoạt động riêng lẻ và liên tục bị đàn áp.
                  </p>
                  <p>
                    Bạn vào vai <span className="font-semibold">MINH</span>, mang theo một lá thư mật và câu hỏi: “Chúng ta cần làm gì bây giờ?”.
                  </p>
                  <p>
                    Nhiệm vụ của bạn là đưa ra các quyết định chiến lược đúng để không lặp lại những thất bại lịch sử.
                  </p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIntroStage('game')}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary-3 px-5 py-2.5 text-sm font-semibold text-primary transition hover:scale-[1.02]"
                  >
                    Vào game
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-secondary-4/15 bg-primary/55 p-3 backdrop-blur-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-secondary-3">{scene.title}</p>
                <p className="text-sm text-secondary-4/75">Điểm chiến lược: {score}/100</p>
              </div>
              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 rounded-lg border border-secondary-4/30 px-3 py-2 text-sm text-secondary-4/90 transition hover:bg-secondary-4/10"
              >
                <RotateCcw size={16} />
                Chơi lại
              </button> 
            </div>

            <div className="mb-4 flex gap-2 overflow-x-auto rounded-xl border border-secondary-4/15 bg-primary/45 p-2 backdrop-blur-sm">
              {CAST_ORDER.map((id) => {
                const character = CHARACTERS[id];
                const isActive = currentSpeaker === id;
                return (
                  <div
                    key={id}
                    className={`flex min-w-[92px] flex-col items-center rounded-lg px-2 py-1 transition ${
                      isActive ? 'bg-secondary-3/25 ring-1 ring-secondary-3/80' : 'bg-black/20'
                    }`}
                  >
                    <img
                      src={character.avatar}
                      alt={character.name}
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="mt-1 text-center text-[11px] text-secondary-4/85">{character.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-auto rounded-2xl border border-secondary-4/20 bg-primary/80 p-5 shadow-2xl backdrop-blur-md md:p-6">
              {currentLine?.type === 'dialogue' && currentLine.characterId && (
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={CHARACTERS[currentLine.characterId].avatar}
                    alt={CHARACTERS[currentLine.characterId].name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-secondary-3">Nhân vật</p>
                    <p className="font-semibold text-secondary-4">{CHARACTERS[currentLine.characterId].name}</p>
                  </div>
                </div>
              )}

              {currentLine && (
                <p
                  className={`min-h-20 text-lg leading-relaxed ${
                    currentLine.type === 'dialogue'
                      ? 'text-secondary-4'
                      : 'text-secondary-4/90 italic'
                  }`}
                >
                  {lineText}
                </p>
              )}

              {showChoices && scene.choices && (
                <div className="mt-5 grid gap-2">
                  {scene.choices.map((choice) => (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleChoice(choice)}
                      className="w-full rounded-lg border border-secondary-4/35 bg-black/20 px-4 py-3 text-left text-sm text-secondary-4/95 transition hover:border-secondary-3 hover:bg-secondary-3/10"
                    >
                      <span className="mr-2 font-semibold text-secondary-3">{choice.id}.</span>
                      {choice.text}
                    </button>
                  ))}
                </div>
              )}

              {canContinue && (
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    onClick={handleContinue}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary-3 px-5 py-2.5 text-sm font-semibold text-primary transition hover:scale-[1.02]"
                  >
                    Tiếp tục
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {isResult && (
                <div className="mt-6 rounded-lg border border-secondary-3/30 bg-secondary-3/10 p-4 text-sm text-secondary-4">
                  <p>
                    Số quyết định đúng: <span className="font-semibold">{correctDecisions.size}/{DECISION_TOTAL}</span>
                  </p>
                  <p className="mt-1">
                    Gợi ý đáp án tối ưu: <span className="font-semibold">C → C → C → B</span>
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
