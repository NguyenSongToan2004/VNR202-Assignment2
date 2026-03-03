import { useEffect, useMemo, useState } from 'react';

import quizImage1 from '../assets/Quiz/image_1.png';
import quizImage2 from '../assets/Quiz/image_2.png';
import quizImage3 from '../assets/Quiz/image_3.png';
import quizImage4 from '../assets/Quiz/image_4.png';

interface ChoiceOption {
  id: string;
  text: string;
}

interface McqQuestion {
  id: string;
  type: 'mcq';
  prompt: string;
  options: ChoiceOption[];
  correctAnswerIds: string[];
  explanation: string;
  allowMultiple?: boolean;
}

interface ImageQuestion {
  id: string;
  type: 'image';
  prompt: string;
  imageSrc: string;
  answer: string;
}

type QuizItem = McqQuestion | ImageQuestion;

const MCQ_QUESTIONS: McqQuestion[] = [
  {
    id: 'Q1',
    type: 'mcq',
    prompt: 'Ai là người trực tiếp soạn thảo Cương lĩnh chính trị đầu tiên của Đảng (2/1930)?',
    options: [
      { id: 'A', text: 'Trần Phú' },
      { id: 'B', text: 'Nguyễn Ái Quốc' },
      { id: 'C', text: 'Lê Hồng Phong' },
      { id: 'D', text: 'Phan Bội Châu' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Tại Hội nghị hợp nhất các tổ chức cộng sản (3-2-1930) tại Hương Cảng, Nguyễn Ái Quốc đã soạn thảo Chính cương vắn tắt và Sách lược vắn tắt. Đây chính là Cương lĩnh chính trị đầu tiên của Đảng ta.',
  },
  {
    id: 'Q2',
    type: 'mcq',
    prompt: 'Cương lĩnh xác định nhiệm vụ nào được đặt lên hàng đầu?',
    options: [
      { id: 'A', text: 'Chống phong kiến, chia ruộng đất cho dân cày' },
      { id: 'B', text: 'Chống phát xít, bảo vệ hòa bình' },
      { id: 'C', text: 'Chống đế quốc, giành độc lập dân tộc' },
      { id: 'D', text: 'Phát triển kinh tế, xây dựng đất nước' },
    ],
    correctAnswerIds: ['C'],
    explanation:
      'Việt Nam lúc bấy giờ là một nước thuộc địa. Mâu thuẫn giữa toàn thể dân tộc ta với thực dân xâm lược là mâu thuẫn lớn nhất, nên việc đuổi ngoại xâm để giành lại chủ quyền phải là ưu tiên số một.',
  },
  {
    id: 'Q3',
    type: 'mcq',
    prompt: 'Hai giai cấp nào được Cương lĩnh xác định là "lực lượng nòng cốt" của cách mạng?',
    options: [
      { id: 'A', text: 'Công nhân và Tiểu tư sản' },
      { id: 'B', text: 'Công nhân và Nông dân' },
      { id: 'C', text: 'Nông dân và Trí thức' },
      { id: 'D', text: 'Tư sản dân tộc và Công nhân' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Đây là hai giai cấp chiếm số đông nhất trong xã hội, bị bóc lột nặng nề nhất nên có tinh thần cách mạng triệt để nhất. Liên minh Công - Nông tạo nên sức mạnh vô địch cho cách mạng.',
  },
  {
    id: 'Q4',
    type: 'mcq',
    prompt: 'Theo Cương lĩnh, lực lượng nào giữ vai trò lãnh đạo cách mạng Việt Nam?',
    options: [
      { id: 'A', text: 'Giai cấp tư sản dân tộc' },
      { id: 'B', text: 'Khối liên minh công - nông' },
      { id: 'C', text: 'Các sĩ phu yêu nước' },
      { id: 'D', text: 'Giai cấp công nhân thông qua Đảng Cộng sản' },
    ],
    correctAnswerIds: ['D'],
    explanation:
      'Giai cấp công nhân đại diện cho phương thức sản xuất tiến bộ, có tổ chức và kỷ luật. Đảng Cộng sản là đội tiên phong của giai cấp này, nắm giữ lý luận khoa học (chủ nghĩa Mác-Lênin).',
  },
  {
    id: 'Q5',
    type: 'mcq',
    prompt: 'Cương lĩnh xác định mục tiêu chiến lược của cách mạng Việt Nam là gì?',
    options: [
      { id: 'A', text: 'Làm cách mạng tư sản dân quyền và thổ địa cách mạng để đi tới xã hội cộng sản' },
      { id: 'B', text: 'Thành lập chính phủ quân chủ lập hiến' },
      { id: 'C', text: 'Xây dựng nền kinh tế tư bản chủ nghĩa phát triển' },
      { id: 'D', text: 'Đòi quyền dân sinh, dân chủ từ thực dân Pháp' },
    ],
    correctAnswerIds: ['A'],
    explanation:
      'Đây là lộ trình hai giai đoạn: Giai đoạn 1 là giải phóng dân tộc (tư sản dân quyền) và giải quyết ruộng đất (thổ địa); Giai đoạn 2 là tiến thẳng lên CNXH và chủ nghĩa cộng sản mà không qua giai đoạn tư bản chủ nghĩa.',
  },
  {
    id: 'Q6',
    type: 'mcq',
    prompt: 'Tại sao Cương lĩnh lại ưu tiên nhiệm vụ chống đế quốc hơn nhiệm vụ chống phong kiến?',
    options: [
      { id: 'A', text: 'Vì giai cấp phong kiến đã hoàn toàn đầu hàng thực dân' },
      { id: 'B', text: 'Vì mâu thuẫn dân tộc là mâu thuẫn cơ bản, gay gắt nhất lúc bấy giờ' },
      { id: 'C', text: 'Vì nông dân không có nhu cầu về ruộng đất' },
      { id: 'D', text: 'Vì quốc tế cộng sản yêu cầu như vậy' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Thực dân Pháp là kẻ thù chung của toàn dân tộc. Nếu không đánh đuổi được đế quốc, đất nước không có độc lập thì quyền lợi của giai cấp nông dân (ruộng đất) cũng không bao giờ thực hiện được một cách trọn vẹn.',
  },
  {
    id: 'Q7',
    type: 'mcq',
    prompt:
      'Việc Cương lĩnh xác định "Cách mạng Việt Nam là một bộ phận của cách mạng thế giới" nhằm mục đích gì?',
    options: [
      { id: 'A', text: 'Để tìm kiếm sự viện trợ tài chính' },
      { id: 'B', text: 'Để khẳng định tinh thần đoàn kết quốc tế và sức mạnh thời đại' },
      { id: 'C', text: 'Để sáp nhập Việt Nam vào các nước láng giềng' },
      { id: 'D', text: 'Để Việt Nam có thể tham gia vào Hội Quốc liên sớm hơn' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Việt Nam cần sự ủng hộ của phong trào cộng sản và công nhân quốc tế để tạo ra sức mạnh tổng hợp, đồng thời đóng góp vào sự nghiệp giải phóng các dân tộc bị áp bức trên toàn cầu.',
  },
  {
    id: 'Q8',
    type: 'mcq',
    prompt: 'Cương lĩnh đã giải quyết được điều gì cho cách mạng Việt Nam đầu thế kỷ XX?',
    options: [
      { id: 'A', text: 'Chấm dứt hoàn toàn sự bóc lột của giai cấp địa chủ' },
      { id: 'B', text: 'Xóa bỏ hoàn toàn nạn mù chữ ngay lập tức' },
      { id: 'C', text: 'Giải quyết tình trạng khủng hoảng về đường lối và giai cấp lãnh đạo' },
      { id: 'D', text: 'Đưa Việt Nam trở thành nước công nghiệp hiện đại' },
    ],
    correctAnswerIds: ['C'],
    explanation:
      'Trước năm 1930, các phong trào yêu nước (như của Phan Bội Châu, Phan Châu Trinh) đều thất bại vì thiếu một đường lối khoa học. Cương lĩnh đã chỉ ra con đường cứu nước đúng đắn nhất.',
  },
  {
    id: 'Q9',
    type: 'mcq',
    prompt: 'Trong mô hình "Cây cách mạng", các tầng lớp như Tiểu tư sản, Trí thức được ví như bộ phận nào?',
    options: [
      { id: 'A', text: 'Gốc rễ (Nòng cốt)' },
      { id: 'B', text: 'Thân cây (Trụ cột)' },
      { id: 'C', text: 'Cành, lá (Lực lượng cần lôi kéo, tranh thủ)' },
      { id: 'D', text: 'Đất và nước (Yếu tố bên ngoài)' },
    ],
    correctAnswerIds: ['C'],
    explanation:
      'Họ là những người có tinh thần yêu nước nhưng dễ dao động. Cách mạng cần "lôi kéo" họ để mở rộng khối đại đoàn kết, tạo nên sức mạnh lan tỏa giống như cành lá của một cái cây.',
  },
  {
    id: 'Q10',
    type: 'mcq',
    prompt: 'Quan điểm "lấy dân làm gốc" trong Cương lĩnh hiện nay được Đảng ta cụ thể hóa bằng phương châm nào?',
    options: [
      { id: 'A', text: 'Dân làm chủ, Đảng quản lý' },
      { id: 'B', text: 'Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng' },
      { id: 'C', text: 'Toàn dân đoàn kết xây dựng đời sống văn hóa' },
      { id: 'D', text: 'Nông thôn mới, đô thị văn minh' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Đây là sự kế thừa và phát triển tư tưởng "cách mạng là sự nghiệp của quần chúng". Khi người dân được tham gia vào mọi quy trình và hưởng thành quả, sức mạnh dân tộc sẽ bền vững nhất.',
  },
  {
    id: 'Q11',
    type: 'mcq',
    prompt: 'Tại sao nói Cương lĩnh (2/1930) thể hiện sự vận dụng SÁNG TẠO chủ nghĩa Mác-Lênin vào Việt Nam?',
    options: [
      { id: 'A', text: 'Vì đã rập khuôn hoàn toàn mô hình cách mạng ở châu Âu' },
      { id: 'B', text: 'Vì xác định cách mạng là do giai cấp tư sản lãnh đạo' },
      { id: 'C', text: 'Vì biết đặt vấn đề dân tộc lên trên vấn đề giai cấp trong bối cảnh thuộc địa' },
      { id: 'D', text: 'Vì không chú trọng đến vai trò của giai cấp công nhân' },
    ],
    correctAnswerIds: ['C'],
    explanation:
      'Chủ nghĩa Mác gốc thường nhấn mạnh đấu tranh giai cấp ở các nước tư bản. Nguyễn Ái Quốc đã sáng tạo khi nhận ra ở nước thuộc địa như Việt Nam, việc đoàn kết toàn dân để giải phóng dân tộc phải là ưu tiên trước hết.',
  },
  {
    id: 'Q12',
    type: 'mcq',
    prompt: 'Phản biện lại ý kiến cho rằng Cương lĩnh "nặng tính dân tộc hơn tính giai cấp", lập luận nào sau đây là đúng nhất?',
    options: [
      { id: 'A', text: 'Tính giai cấp chỉ quan trọng ở các nước tư bản phát triển' },
      { id: 'B', text: 'Độc lập dân tộc là tiền đề và là cách duy nhất để giải phóng giai cấp tại Việt Nam' },
      { id: 'C', text: 'Giai cấp nông dân không cần giải phóng, chỉ cần độc lập' },
      { id: 'D', text: 'Cương lĩnh hoàn toàn không đề cập đến vấn đề giai cấp' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Trong cảnh nô lệ, mọi giai cấp đều bị áp bức. Giải phóng dân tộc chính là giải phóng giai cấp ở mức độ rộng lớn nhất. Quyền lợi giai cấp và dân tộc lúc này là thống nhất.',
  },
  {
    id: 'Q13',
    type: 'mcq',
    prompt: 'Việc Cương lĩnh chủ trương lôi kéo tiểu địa chủ và tư sản dân tộc thể hiện chiến lược gì?',
    options: [
      { id: 'A', text: 'Thỏa hiệp về mặt tư tưởng với giai cấp bóc lột' },
      { id: 'B', text: 'Chiến lược đại đoàn kết dân tộc, cô lập kẻ thù chính' },
      { id: 'C', text: 'Sự thiếu kiên định của Đảng trong những ngày đầu thành lập' },
      { id: 'D', text: 'Mong muốn xây dựng một xã hội đa đảng' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      'Đây là nghệ thuật "thêm bạn bớt thù". Việc lôi kéo các tầng lớp này giúp tập trung hỏa lực vào kẻ thù nguy hiểm nhất là thực dân Pháp và tay sai đại địa chủ phản động.',
  },
  {
    id: 'Q14',
    type: 'mcq',
    prompt: 'Nếu phải chọn một từ khóa nói lên giá trị xuyên suốt từ Cương lĩnh 1930 đến thực tiễn xây dựng đất nước ngày nay, đó là:',
    options: [
      { id: 'A', text: 'Bảo thủ' },
      { id: 'B', text: 'Độc lập & Sáng tạo' },
      { id: 'C', text: 'Chờ đợi thời cơ' },
      { id: 'D', text: 'Đối ngoại cực đoan' },
    ],
    correctAnswerIds: ['B'],
    explanation:
      '"Độc lập" là mục tiêu không bao giờ thay đổi. "Sáng tạo" là phương pháp giúp Đảng đưa đất nước vượt qua mọi thách thức lịch sử, từ chiến tranh đến đổi mới và hội nhập.',
  },
  {
    id: 'Q15',
    type: 'mcq',
    prompt: 'Vì sao việc giữ vững vai trò lãnh đạo của Đảng là "tính tất yếu" được khẳng định từ Cương lĩnh?',
    options: [
      { id: 'A', text: 'Vì các khuynh hướng khác đã thất bại trong việc tìm đường cứu nước đúng đắn' },
      { id: 'B', text: 'Vì Đảng có quân đội mạnh ngay từ ngày đầu thành lập' },
      { id: 'C', text: 'Vì các đảng phái khác tự nguyện nhường quyền lãnh đạo' },
      { id: 'D', text: 'Vì đây là quy định của thực dân Pháp lúc bấy giờ' },
    ],
    correctAnswerIds: ['A'],
    explanation:
      'Lịch sử đã làm phép thử với khuynh hướng phong kiến và tư sản nhưng đều không thành công. Chỉ khi có Đảng với hệ tư tưởng tiên tiến, cách mạng mới đi đến thắng lợi cuối cùng.',
  },
];

const IMAGE_QUESTIONS: ImageQuestion[] = [
  {
    id: 'IMG1',
    type: 'image',
    prompt: 'Đuổi hình bắt chữ: Quan sát hình và đoán đáp án.',
    imageSrc: quizImage1,
    answer:
      'Nguyễn Ái Quốc phát biểu Đại hội Đảng Xã hội Pháp lần thứ XVIII họp ở Thành phố Tours tháng 12 năm 1920 (Nguồn TTXVN)',
  },
  {
    id: 'IMG2',
    type: 'image',
    prompt: 'Đuổi hình bắt chữ: Quan sát hình và đoán đáp án.',
    imageSrc: quizImage2,
    answer:
      'Sách "Đường Kách mệnh" tập hợp những bài giảng của Nguyễn Ái Quốc trong những năm 1925 - 1927 tại các lớp huấn luyện đào tạo cán bộ cho cách mạng Việt Nam tại Quảng Châu, Trung Quốc',
  },
  {
    id: 'IMG3',
    type: 'image',
    prompt: 'Đuổi hình bắt chữ: Quan sát hình và đoán đáp án.',
    imageSrc: quizImage3,
    answer:
      'Tranh vẽ "Nguyễn Ái Quốc giảng bài tại lớp huấn luyện cán bộ cách mạng Việt Nam tại Quảng Châu, Trung Quốc"',
  },
  {
    id: 'IMG4',
    type: 'image',
    prompt: 'Đuổi hình bắt chữ: Quan sát hình và đoán đáp án.',
    imageSrc: quizImage4,
    answer: 'Lãnh tụ V.I. Lênin diễn thuyết ở Quảng trường Đỏ, Moscow năm 1917',
  },
];

const MIXED_ORDER: string[] = [
  'Q1',
  'Q2',
  'IMG1',
  'Q3',
  'Q4',
  'Q5',
  'IMG2',
  'Q6',
  'Q7',
  'Q8',
  'IMG3',
  'Q9',
  'Q10',
  'Q11',
  'IMG4',
  'Q12',
  'Q13',
  'Q14',
  'Q15',
];

const QUESTION_TIME_SECONDS = 30;

export default function QuizPage() {
  const quizItems = useMemo(() => {
    const questionMap = new Map<string, QuizItem>([
      ...MCQ_QUESTIONS.map((item) => [item.id, item]),
      ...IMAGE_QUESTIONS.map((item) => [item.id, item]),
    ]);

    return MIXED_ORDER.map((id) => questionMap.get(id)).filter((item): item is QuizItem => Boolean(item));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SECONDS);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMcqCorrect, setMcqCorrect] = useState<boolean | null>(null);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  const [wrongMarkedOptions, setWrongMarkedOptions] = useState<string[]>([]);
  const [isAnswerShown, setAnswerShown] = useState(false);
  const [isFinished, setFinished] = useState(false);

  const currentItem = quizItems[currentIndex];
  const isLastQuestion = currentIndex === quizItems.length - 1;

  useEffect(() => {
    if (!hasStarted || isFinished || timeLeft <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [hasStarted, isFinished, timeLeft, currentIndex]);

  const handleResetQuestionState = (nextIndex: number) => {
    setCurrentIndex(nextIndex);
    setTimeLeft(QUESTION_TIME_SECONDS);
    setSelectedAnswers([]);
    setMcqCorrect(null);
    setSubmitAttempt(0);
    setWrongMarkedOptions([]);
    setAnswerShown(false);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    handleResetQuestionState(currentIndex + 1);
  };

  const handleToggleOption = (optionId: string) => {
    if (!currentItem || currentItem.type !== 'mcq') {
      return;
    }

    if (currentItem.allowMultiple) {
      setWrongMarkedOptions([]);
      setSelectedAnswers((prev) =>
        prev.includes(optionId) ? prev.filter((item) => item !== optionId) : [...prev, optionId]
      );
      return;
    }

    setWrongMarkedOptions([]);
    setSelectedAnswers([optionId]);
  };

  const handleSubmitMcq = () => {
    if (!currentItem || currentItem.type !== 'mcq') {
      return;
    }

    setSubmitAttempt((prev) => prev + 1);

    if (selectedAnswers.length === 0) {
      setMcqCorrect(false);
      setWrongMarkedOptions([]);
      return;
    }

    const selectedSet = new Set(selectedAnswers);
    const correctSet = new Set(currentItem.correctAnswerIds);

    const isCorrect =
      selectedSet.size === correctSet.size && [...selectedSet].every((answerId) => correctSet.has(answerId));

    setMcqCorrect(isCorrect);

    if (isCorrect) {
      setWrongMarkedOptions([]);
    } else {
      setWrongMarkedOptions(selectedAnswers.filter((answerId) => !correctSet.has(answerId)));
    }
  };

  const handleRestart = () => {
    setFinished(false);
    handleResetQuestionState(0);
  };

  const isIncorrectSelection = (optionId: string) => {
    return wrongMarkedOptions.includes(optionId);
  };

  if (isFinished) {
    return (
      <section className="min-h-screen bg-primary text-secondary-4 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-2xl border border-secondary-4/20 bg-secondary-4/[0.03] px-8 py-12 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary-3">Hoàn thành</p>
          <h1 className="font-title-rounded text-3xl md:text-5xl leading-tight">Cảm ơn các bạn đã tham gia trò chơi với chúng mình!</h1>
          <p className="text-secondary-4/70 text-base md:text-lg">Hẹn gặp lại ở những thử thách tiếp theo.</p>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center justify-center rounded-full bg-secondary-3 px-7 py-3 text-primary font-bold hover:bg-secondary-3/80 transition-colors"
          >
            Chơi lại từ đầu
          </button>
        </div>
      </section>
    );
  }

  if (!currentItem) {
    return null;
  }

  if (!hasStarted) {
    return (
      <section className="min-h-screen bg-primary text-secondary-4 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
        <div className="w-full max-w-3xl rounded-2xl border border-secondary-4/20 bg-secondary-4/[0.03] px-6 py-8 md:px-8 md:py-10 space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary-3 text-center">Hướng dẫn chơi</p>
          <h1 className="font-title-rounded text-3xl md:text-4xl text-center leading-tight">Quiz Cương lĩnh chính trị đầu tiên của Đảng</h1>
          <ul className="space-y-3 text-secondary-4/85 leading-relaxed list-disc pl-5">
            <li>Mỗi câu có thời gian làm bài 30 giây.</li>
            <li>Hết thời gian sẽ hiện thông báo, hệ thống không tự chuyển câu.</li>
            <li>Mỗi lần chỉ hiển thị 1 câu hỏi.</li>
            <li>Với câu trắc nghiệm: chọn đáp án rồi bấm <strong>Chốt câu này</strong>.</li>
            <li>Với câu đuổi hình bắt chữ: quan sát hình, sau đó bấm <strong>Hiện đáp án</strong> khi cần.</li>
            <li>Chuyển câu bằng nút <strong>Qua câu tiếp theo</strong>.</li>
          </ul>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setHasStarted(true)}
              className="inline-flex items-center justify-center rounded-full bg-secondary-3 px-7 py-3 text-primary font-bold hover:bg-secondary-3/80 transition-colors"
            >
              Bắt đầu chơi
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-primary text-secondary-4 pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary-3">Quiz tương tác</p>
          <h1 className="font-title-rounded text-3xl md:text-4xl leading-tight">Cương lĩnh chính trị đầu tiên của Đảng (1930)</h1>
        </header>

        <div className="rounded-2xl border border-secondary-4/20 bg-secondary-4/[0.03] p-5 md:p-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-secondary-4/80 font-semibold">
              Câu {currentIndex + 1}/{quizItems.length}
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary-4/20 px-4 py-1.5">
              <span className="text-secondary-4/70">Thời gian:</span>
              <span className={`font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-secondary-3'}`}>{timeLeft}s</span>
            </div>
          </div>

          {timeLeft === 0 && (
            <div className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-red-200 font-medium">
              Hết thời gian cho câu hỏi này, nhưng bạn vẫn có thể tiếp tục trả lời hoặc bấm "Qua câu tiếp theo".
            </div>
          )}

          {currentItem.type === 'mcq' ? (
            <div className="space-y-5">
              <h2 className="text-lg md:text-2xl font-bold leading-relaxed">{currentItem.prompt}</h2>

              <div className="space-y-3">
                {currentItem.options.map((option) => {
                  const isSelected = selectedAnswers.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleToggleOption(option.id)}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                        isSelected
                          ? 'border-secondary-3 bg-secondary-3/15'
                          : 'border-secondary-4/20 bg-transparent hover:border-secondary-3/50'
                      }`}
                    >
                      <span className="font-semibold mr-2">{option.id}.</span>
                      <span>{option.text}</span>
                      {isIncorrectSelection(option.id) && (
                        <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-red-400/70 bg-red-500/20 text-red-300 font-bold">
                          ✕
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubmitMcq}
                  className="rounded-full border border-secondary-4/25 px-5 py-2.5 font-semibold hover:border-secondary-3 transition-colors"
                >
                  Chốt câu này
                </button>
                <button
                  type="button"
                  onClick={() => setAnswerShown(true)}
                  className="rounded-full border border-secondary-4/25 px-5 py-2.5 font-semibold hover:border-secondary-3 transition-colors"
                >
                  Hiện đáp án
                </button>
              </div>

              {isMcqCorrect !== null && (
                <div
                  key={`mcq-result-${submitAttempt}-${isMcqCorrect ? 'correct' : 'wrong'}`}
                  className={`rounded-xl px-4 py-4 font-bold ${
                    isMcqCorrect
                      ? 'border border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                      : 'border border-amber-400/40 bg-amber-400/10 text-amber-200'
                  } animate-fade-in`}
                >
                  {isMcqCorrect ? '✓ Chính xác!' : 'Rất tiếc! Bạn có thể chọn lại và chốt lại câu này.'}
                </div>
              )}

              {isAnswerShown && (
                <div className="rounded-xl border border-secondary-3/40 bg-secondary-3/10 px-4 py-4 space-y-3">
                  <p className="font-bold text-secondary-3">
                    Đáp án đúng: {currentItem.correctAnswerIds.join(', ')}
                  </p>
                  <p className="text-secondary-4/85 leading-relaxed">{currentItem.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <h2 className="text-lg md:text-2xl font-bold leading-relaxed">{currentItem.prompt}</h2>

              <div className="rounded-xl overflow-hidden border border-secondary-4/20 bg-black/20">
                <img
                  src={currentItem.imageSrc}
                  alt={`Đuổi hình bắt chữ ${currentItem.id}`}
                  className="w-full h-auto object-contain max-h-[460px] mx-auto"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setAnswerShown(true)}
                  className="rounded-full border border-secondary-4/25 px-5 py-2.5 font-semibold hover:border-secondary-3 transition-colors"
                >
                  Hiện đáp án
                </button>
              </div>

              {isAnswerShown && (
                <div className="rounded-xl border border-secondary-3/40 bg-secondary-3/10 px-4 py-4">
                  <p className="text-secondary-3 font-bold">Đáp án: {currentItem.answer}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleNextQuestion}
            className="rounded-full bg-secondary-3 px-6 py-3 text-primary font-bold hover:bg-secondary-3/80 transition-colors"
          >
            {isLastQuestion ? 'Kết thúc trò chơi' : 'Qua câu tiếp theo'}
          </button>
        </div>
      </div>
    </section>
  );
}