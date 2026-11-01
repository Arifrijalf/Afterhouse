import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Hourglass, 
  Check, 
  Flame,
  X,
  HelpCircle,
  Sparkles,
  Users,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  EDITIONS, 
  DECKS, 
  PROMPTS, 
  type EditionType, 
  type DeckId, 
  type PromptCard 
} from './data/prompts';

export function App() {
  const [selectedEdition, setSelectedEdition] = useState<EditionType>('couple');
  const [activeDeck, setActiveDeck] = useState<DeckId | 'all'>('all');
  const [currentPrompt, setCurrentPrompt] = useState<PromptCard>(PROMPTS[0]);
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [candleMode, setCandleMode] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Bookmarking
  const [savedIds, setSavedIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('afterhours_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Listening Timer (120s)
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);

  useEffect(() => {
    try {
      localStorage.setItem('afterhours_saved', JSON.stringify(savedIds));
    } catch (err) {
      console.error(err);
    }
  }, [savedIds]);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (secondsLeft === 0 && timerRunning) {
      setTimerRunning(false);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#e07a5f', '#f2cc8f', '#81b29a', '#2a9d8f']
      });
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  // When edition changes, pick initial card for that edition and reset deck filter
  const handleEditionChange = (newEdition: EditionType) => {
    if (newEdition === selectedEdition) return;
    setSelectedEdition(newEdition);
    setActiveDeck('all');
    setTimerRunning(false);
    setSecondsLeft(120);

    const editionPrompts = PROMPTS.filter(p => p.edition === newEdition);
    const randomPick = editionPrompts[Math.floor(Math.random() * editionPrompts.length)];
    setCurrentPrompt(randomPick);
  };

  const drawNextCard = () => {
    setAnimating(true);
    setTimerRunning(false);
    setSecondsLeft(120);

    setTimeout(() => {
      let pool = PROMPTS.filter(p => p.edition === selectedEdition);
      if (activeDeck !== 'all') {
        pool = pool.filter(p => p.deck === activeDeck);
      }

      const filtered = pool.filter(p => p.id !== currentPrompt.id);
      const chosen = filtered.length > 0 
        ? filtered[Math.floor(Math.random() * filtered.length)]
        : pool[0];

      setCurrentPrompt(chosen);
      setAnimating(false);
    }, 180);
  };

  const toggleBookmark = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(prev => prev.filter(x => x !== id));
    } else {
      setSavedIds(prev => [...prev, id]);
    }
  };

  const handleShare = async () => {
    const text = `"${currentPrompt.question}"\n\n— AFTERHOURS Card (${currentPrompt.edition === 'couple' ? 'Date Night' : 'Hangout Tongkrongan'})`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AFTERHOURS — Kartu Percakapan',
          text,
          url: window.location.href,
        });
      } catch {
        copyText(text);
      }
    } else {
      copyText(text);
    }
  };

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentEditionData = EDITIONS.find(e => e.id === selectedEdition) || EDITIONS[0];
  const availableDecks = DECKS.filter(d => d.edition === selectedEdition);
  const activeDeckData = DECKS.find(d => d.id === currentPrompt.deck) || availableDecks[0];
  const isBookmarked = savedIds.includes(currentPrompt.id);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-700 bg-grain ${candleMode ? 'bg-[#08090a]' : 'bg-[#121316]'}`}>
      
      {/* Editorial Topbar */}
      <header className="w-full max-w-xl mx-auto px-5 pt-7 pb-4 border-b border-[#26282e]/80">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono-code text-[10px] tracking-widest text-[#a8a7a0] uppercase block">
              EDISI 02 / DEEP & ROAST
            </span>
            <h1 className="font-editorial text-2xl md:text-3xl tracking-tight text-[#f4f3ee] italic">
              Afterhours.
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Candle Mode */}
            <button
              onClick={() => setCandleMode(prev => !prev)}
              className={`p-2 rounded-lg border text-xs font-mono-code flex items-center gap-1.5 transition-all ${
                candleMode 
                  ? 'bg-[#e07a5f]/15 border-[#e07a5f]/40 text-[#e07a5f]' 
                  : 'bg-[#1b1d22] border-[#2b2d35] text-[#8e8d87] hover:text-[#ecebe4]'
              }`}
              title="Redupkan lampu layar (Cafe Candlelight Mode)"
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{candleMode ? 'Candle On' : 'Dim'}</span>
            </button>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setShowBookmarks(true)}
              className="p-2 rounded-lg bg-[#1b1d22] border border-[#2b2d35] text-[#8e8d87] hover:text-[#ecebe4] transition-colors relative"
              title="Buka catatan kartu tersimpan"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#e07a5f] text-[9px] font-bold text-white flex items-center justify-center font-mono-code">
                  {savedIds.length}
                </span>
              )}
            </button>

            {/* Guide Toggle */}
            <button
              onClick={() => setShowGuide(true)}
              className="p-2 rounded-lg bg-[#1b1d22] border border-[#2b2d35] text-[#8e8d87] hover:text-[#ecebe4] transition-colors"
              title="Petunjuk & Cara Main"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Edition Switcher (Pasangan vs Teman) */}
        <div className="mt-4 p-1 rounded-xl bg-[#181a1f] border border-[#2d3038] grid grid-cols-2 gap-1">
          <button
            onClick={() => handleEditionChange('couple')}
            className={`py-2 px-3 rounded-lg text-xs font-mono-code tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedEdition === 'couple'
                ? 'bg-[#ecebe4] text-[#121316] font-bold shadow-md'
                : 'text-[#8e8d87] hover:text-[#ecebe4]'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Edisi Pasangan (120)</span>
          </button>

          <button
            onClick={() => handleEditionChange('friends')}
            className={`py-2 px-3 rounded-lg text-xs font-mono-code tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedEdition === 'friends'
                ? 'bg-[#ecebe4] text-[#121316] font-bold shadow-md'
                : 'text-[#8e8d87] hover:text-[#ecebe4]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Edisi Teman (120)</span>
          </button>
        </div>
      </header>

      {/* Main Stage */}
      <main className="w-full max-w-lg mx-auto px-5 py-5 flex-1 flex flex-col justify-center">
        
        {/* Deck Filter Tabs (Dynamic per Edition) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveDeck('all')}
            className={`px-3 py-1.5 rounded-md text-[11px] font-mono-code uppercase tracking-wider whitespace-nowrap transition-all border ${
              activeDeck === 'all'
                ? 'bg-[#ecebe4] text-[#121316] border-[#ecebe4] font-semibold'
                : 'bg-[#191b20] text-[#7d7c76] border-[#2b2d35] hover:text-[#ecebe4]'
            }`}
          >
            Semua Dek
          </button>
          {availableDecks.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveDeck(d.id)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-mono-code tracking-wider whitespace-nowrap transition-all border ${
                activeDeck === d.id
                  ? 'bg-[#1e2026] text-[#ecebe4] border-[#8e8d87]'
                  : 'bg-[#191b20] text-[#7d7c76] border-[#2b2d35] hover:text-[#ecebe4]'
              }`}
            >
              {d.code}
            </button>
          ))}
        </div>

        {/* The Card Artifact */}
        <div className="relative mt-1">
          {/* Card Frame */}
          <div 
            className={`relative rounded-xl border border-[#2d3038] bg-[#181a1f] p-6 md:p-9 shadow-2xl transition-all duration-300 ${
              animating ? 'scale-[0.98] opacity-40 blur-xs' : 'scale-100 opacity-100'
            }`}
          >
            {/* Header: Deck Metadata */}
            <div className="flex items-center justify-between pb-5 border-b border-[#26282e]">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code tracking-widest uppercase border ${activeDeckData.badge}`}>
                  {activeDeckData.code}
                </span>
                <span className="font-mono-code text-[11px] text-[#6d6c66] tracking-wider uppercase">
                  #{currentPrompt.stamp}
                </span>
              </div>

              {/* Utility actions on card */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleBookmark(currentPrompt.id)}
                  className={`p-1.5 rounded hover:bg-[#252830] transition-colors ${
                    isBookmarked ? 'text-[#e07a5f]' : 'text-[#6d6c66] hover:text-[#ecebe4]'
                  }`}
                  title={isBookmarked ? 'Tersimpan' : 'Simpan topik ini'}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleShare}
                  className="p-1.5 rounded text-[#6d6c66] hover:text-[#ecebe4] hover:bg-[#252830] transition-colors"
                  title="Salin / Bagikan pertanyaan"
                >
                  {copied ? <Check className="w-4 h-4 text-[#81b29a]" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Question Body */}
            <div className="py-7 min-h-[190px] flex flex-col justify-center">
              <p className="font-editorial text-2xl md:text-3xl text-[#f4f3ee] leading-relaxed md:leading-[1.4] tracking-normal font-normal">
                "{currentPrompt.question}"
              </p>

              {currentPrompt.subtext && (
                <div className="mt-5 pt-4 border-t border-[#26282e]/60 flex items-start gap-2">
                  <span className="font-mono-code text-[10px] text-[#e07a5f] mt-0.5">NOTE:</span>
                  <p className="font-mono-code text-[11px] text-[#8e8d87] leading-relaxed">
                    {currentPrompt.subtext}
                  </p>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="pt-4 border-t border-[#26282e] flex items-center justify-between">
              <span className="font-mono-code text-[10px] text-[#5d5c57] uppercase tracking-wider">
                {selectedEdition === 'couple' ? 'Gantian dengar • Bebas interupsi' : 'Jujur tanpa tersinggung'}
              </span>

              <button
                onClick={() => {
                  if (timerRunning) {
                    setTimerRunning(false);
                  } else {
                    setSecondsLeft(120);
                    setTimerRunning(true);
                  }
                }}
                className={`px-2.5 py-1 rounded border text-[11px] font-mono-code tracking-wider flex items-center gap-1.5 transition-colors ${
                  timerRunning
                    ? 'bg-[#e07a5f]/15 border-[#e07a5f]/50 text-[#e07a5f]'
                    : 'bg-[#121316] border-[#2b2d35] text-[#8e8d87] hover:text-[#ecebe4]'
                }`}
                title="Timer 2 menit tanpa menyela"
              >
                <Hourglass className={`w-3 h-3 ${timerRunning ? 'animate-spin' : ''}`} />
                <span>{timerRunning ? formatTimer(secondsLeft) : '2:00 MIN'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: Pull Next Card */}
        <div className="mt-5 flex flex-col items-center gap-2.5">
          <button
            onClick={drawNextCard}
            className="w-full py-4 px-6 rounded-xl bg-[#ecebe4] hover:bg-[#ffffff] text-[#121316] font-medium text-sm tracking-wide transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/40 group"
          >
            <span>Tarik Kartu Berikutnya</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-2 font-mono-code text-[10px] text-[#5d5c57] tracking-wider uppercase">
            <span>Dek: {activeDeckData.name}</span>
            <span>•</span>
            <span>{currentEditionData.tag}</span>
          </div>
        </div>
      </main>

      {/* Footer Minimalis */}
      <footer className="w-full max-w-xl mx-auto px-5 py-5 text-center border-t border-[#26282e]/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono-code text-[10px] text-[#6d6c66] tracking-wider uppercase">
          <span>DIRANCANG UNTUK DATE & TONGKRONGAN MALAM</span>
          <span>AFTERHOURS.</span>
        </div>
      </footer>

      {/* Slide-over: Kartu Tersimpan */}
      {showBookmarks && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#181a1f] border border-[#2d3038] rounded-xl max-w-md w-full p-6 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#26282e]">
              <div>
                <span className="font-mono-code text-[10px] text-[#8e8d87] tracking-widest uppercase">CATATAN DATE & NONGKRONG</span>
                <h3 className="font-editorial text-xl text-[#f4f3ee] italic">Topik Yang Disimpan</h3>
              </div>
              <button
                onClick={() => setShowBookmarks(false)}
                className="p-1 rounded text-[#7d7c76] hover:text-[#ecebe4] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto py-4 space-y-3 flex-1 no-scrollbar">
              {savedIds.length === 0 ? (
                <div className="py-12 text-center">
                  <Bookmark className="w-8 h-8 mx-auto mb-2 text-[#3b3d45]" />
                  <p className="font-mono-code text-xs text-[#6d6c66]">
                    Belum ada kartu yang disimpan.<br />Tap ikon bookmark pada kartu yang ingin dibahas lagi nanti.
                  </p>
                </div>
              ) : (
                savedIds.map(id => {
                  const card = PROMPTS.find(p => p.id === id);
                  if (!card) return null;
                  return (
                    <div
                      key={id}
                      className="p-4 rounded-lg bg-[#121316] border border-[#26282e] flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono-code text-[9px] text-[#e07a5f] uppercase tracking-wider">
                            #{card.stamp}
                          </span>
                          <span className="font-mono-code text-[9px] text-[#6d6c66] uppercase">
                            • {card.edition === 'couple' ? 'Pasangan' : 'Teman'}
                          </span>
                        </div>
                        <p className="font-editorial text-base text-[#ecebe4] mt-1 leading-snug">
                          "{card.question}"
                        </p>
                      </div>
                      <button
                        onClick={() => toggleBookmark(id)}
                        className="text-[#5d5c57] hover:text-[#e07a5f] p-1 font-mono-code text-xs"
                        title="Hapus"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-3 border-t border-[#26282e] flex justify-end">
              <button
                onClick={() => setShowBookmarks(false)}
                className="px-4 py-2 rounded-lg bg-[#252830] text-[#ecebe4] font-mono-code text-xs hover:bg-[#323640] transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up Petunjuk Awal (Bisa dibuka ulang via icon help) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#181a1f] border border-[#2d3038] rounded-2xl max-w-md w-full p-6 md:p-7 shadow-2xl flex flex-col relative text-left">
            
            <div className="pb-4 border-b border-[#26282e] flex items-start justify-between">
              <div>
                <span className="font-mono-code text-[10px] text-[#e07a5f] tracking-widest uppercase block mb-1">
                  SELAMAT DATANG DI AFTERHOURS
                </span>
                <h2 className="font-editorial text-2xl md:text-3xl text-[#f4f3ee] italic leading-tight">
                  Petunjuk & 2 Pilihan Edisi.
                </h2>
              </div>
              <div className="p-2 rounded-lg bg-[#121316] border border-[#2b2d35] text-[#e07a5f]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#a8a7a0] leading-relaxed">
              <p className="text-[#ecebe4]">
                Web ini menyediakan <strong className="text-white font-semibold">total 240 kartu percakapan</strong> yang terbagi ke dalam 2 edisi:
              </p>

              <div className="space-y-2 pt-1 font-mono-code text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#121316] border border-[#26282e] flex items-start gap-2.5">
                  <span className="text-[#e07a5f] font-bold">01</span>
                  <div>
                    <span className="text-[#ecebe4] font-semibold block">Edisi Pasangan (120 Pertanyaan)</span>
                    Khusus buat kamu & doi pas ngedate berdua: Spill, Rawmind, Tether, dan Hazard.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#121316] border border-[#26282e] flex items-start gap-2.5">
                  <span className="text-[#81b29a] font-bold">02</span>
                  <div>
                    <span className="text-[#ecebe4] font-semibold block">Edisi Teman Tongkrongan (120 Pertanyaan)</span>
                    Khusus nongkrong rame-rame: Roast aib teman, dinamika circle, karier/quarter-life crisis, dan tantangan absurd.
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#121316] border border-[#26282e] flex items-start gap-2.5">
                  <span className="text-[#f2cc8f] font-bold">03</span>
                  <div>
                    <span className="text-[#ecebe4] font-semibold block">Cara Ganti Edisi & Tarik Kartu</span>
                    Gunakan tombol switch di header atas untuk ganti edisi kapan saja, lalu tap tombol gading untuk acak pertanyaan.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#e07a5f]/10 border border-[#e07a5f]/30 text-[#e07a5f] font-mono-code text-[10px]">
                ☕ <strong>ATURAN TONGKRONGAN:</strong> Jawab jujur, jangan baper, dan siap-siap ketawa bareng!
              </div>
            </div>

            <div className="pt-3 border-t border-[#26282e]">
              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#ecebe4] hover:bg-white text-[#121316] font-semibold text-xs font-mono-code tracking-wider uppercase transition-all shadow-md active:scale-[0.99] cursor-pointer text-center"
              >
                Sudah Ngerti, Mulai Obrolan →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
