import { FormEvent, Suspense, lazy, useMemo, useState } from 'react';

const QuizPage = lazy(() => import('./QuizPage'));

const QUIZ_CODE_HASH = 'cb2758f75dc355d36bb1fd97bb33eb02b60f22e8c2362e4a099db871b1ba4ceb';

async function sha256Hex(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export default function QuizAccessPage() {
  const [codeInput, setCodeInput] = useState('');
  const [isChecking, setChecking] = useState(false);
  const [isUnlocked, setUnlocked] = useState(false);
  const [errorText, setErrorText] = useState('');

  const canSubmit = useMemo(() => codeInput.trim().length > 0 && !isChecking, [codeInput, isChecking]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setChecking(true);
      setErrorText('');

      const normalizedInput = codeInput.trim().toUpperCase();
      const inputHash = await sha256Hex(normalizedInput);

      if (inputHash !== QUIZ_CODE_HASH) {
        setErrorText('Mã chưa đúng, vui lòng thử lại.');
        return;
      }

      setUnlocked(true);
    } finally {
      setChecking(false);
    }
  };

  if (isUnlocked) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-primary text-secondary-4 flex items-center justify-center">
            Đang mở trò chơi quiz...
          </div>
        }
      >
        <QuizPage />
      </Suspense>
    );
  }

  return (
    <section className="min-h-screen bg-primary text-secondary-4 pt-28 pb-16 px-4 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-secondary-4/20 bg-secondary-4/[0.03] px-6 py-8 md:px-8 md:py-10 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary-3">Quiz Access</p>
          <h1 className="font-title-rounded text-3xl md:text-4xl leading-tight">Nhập mã để tham gia quiz</h1>
          <p className="text-secondary-4/75">Vui lòng nhập mã để bắt đầu trò chơi.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-secondary-4/80" htmlFor="quiz-access-code">
            Mã tham gia
          </label>
          <input
            id="quiz-access-code"
            type="password"
            autoComplete="off"
            value={codeInput}
            onChange={(event) => setCodeInput(event.target.value)}
            className="w-full rounded-xl border border-secondary-4/30 bg-black/20 px-4 py-3 text-secondary-4 outline-none focus:border-secondary-3 transition-colors"
            placeholder="Nhập mã..."
          />

          {errorText && (
            <p className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-200 animate-fade-in">
              {errorText}
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-full bg-secondary-3 px-6 py-3 text-primary font-bold disabled:opacity-60 disabled:cursor-not-allowed hover:bg-secondary-3/80 transition-colors"
          >
            {isChecking ? 'Đang kiểm tra mã...' : 'Vào chơi quiz'}
          </button>
        </form>
      </div>
    </section>
  );
}
