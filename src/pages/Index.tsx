import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/494c0bec-8a7d-4adc-bbc8-542ec59cb4a1/files/d178fde8-3396-401f-bc10-8c9ef4909a9c.jpg";

const MERCH = [
  { name: "Худи SEMSTRAIK", price: "3 990 ₽", tag: "BESTSELLER", color: "Чёрный / Зелёный" },
  { name: "Футболка STRIKER", price: "1 990 ₽", tag: "NEW", color: "Чёрный" },
  { name: "Кепка SEMSTRAIK", price: "1 490 ₽", tag: null, color: "Чёрный" },
  { name: "Носки SET x3", price: "790 ₽", tag: "ХИТ", color: "Чёрный" },
];

const DISCOUNTS = [
  { title: "NEWPLAYER", desc: "Скидка 20% для новичков", code: "NEW20", expires: "Бессрочно" },
  { title: "SQUAD5", desc: "Зови 5 друзей и получи месяц бесплатно", code: "SQUAD5", expires: "До 31 марта" },
  { title: "STREAMER", desc: "Стримерская скидка 30%", code: "STREAM30", expires: "По запросу" },
];

const STEPS = [
  { num: "01", title: "Регистрация", desc: "Создай аккаунт на сайте за 2 минуты. Нужен только email или Telegram." },
  { num: "02", title: "Выбери сервер", desc: "Подбери сервер по режиму игры: Deathmatch, Competitive, Casual." },
  { num: "03", title: "Подключись", desc: "Скопируй IP сервера и введи его в игре через консоль или браузер серверов." },
  { num: "04", title: "Играй!", desc: "Общайся в Discord, участвуй в турнирах, качай статистику." },
];

const DONATE_TIERS = [
  { name: "RECRUIT", price: "199 ₽ / мес", perks: ["Кастомный никнейм", "Доступ к VIP серверу", "5 000 игровых монет"], color: "#aaa", hot: false },
  { name: "SOLDIER", price: "499 ₽ / мес", perks: ["Всё из Recruit", "Приоритетный слот", "Эксклюзивный скин", "Без рекламы"], color: "#00ff88", hot: true },
  { name: "GENERAL", price: "999 ₽ / мес", perks: ["Всё из Soldier", "Личный сервер", "Голос в управлении", "Мерч со скидкой 40%"], color: "#ff2244", hot: false },
];

type Section = "home" | "merch" | "donate" | "discounts" | "guide";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "merch", label: "Мерч" },
    { id: "donate", label: "Донат" },
    { id: "discounts", label: "Скидки" },
    { id: "guide", label: "Как начать" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => setActiveSection("home")} className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#00ff88] flex items-center justify-center" style={{ boxShadow: '0 0 10px rgba(0,255,136,0.4)' }}>
              <span className="text-[#00ff88] font-bold text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>S</span>
            </div>
            <span className="font-bold text-white tracking-widest" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem', letterSpacing: '0.2em' }}>
              SEMSTRAIK
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'text-[#00ff88]' : ''}`}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setProfileOpen(true)} className="flex items-center gap-2 px-4 py-2 neon-btn text-sm">
              <Icon name="User" size={14} />
              <span className="hidden sm:inline">Кабинет</span>
            </button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-white/70" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-4 flex flex-col gap-4" style={{ background: 'rgba(10,10,10,0.98)' }}>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`nav-link text-left ${activeSection === item.id ? 'text-[#00ff88]' : ''}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ============ HOME ============ */}
      {activeSection === "home" && (
        <div className="pt-16">
          <div className="relative min-h-screen flex items-center overflow-hidden scanline">
            <div className="absolute inset-0">
              <img src={HERO_IMG} alt="Hero" className="w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 100%)' }} />
              <div className="absolute inset-0 grid-bg opacity-50" />
            </div>
            <div className="absolute top-1/3 right-0 w-64 h-px bg-gradient-to-l from-transparent via-[#00ff88] to-transparent opacity-30" />
            <div className="absolute top-2/3 left-0 w-48 h-px bg-gradient-to-r from-transparent via-[#ff2244] to-transparent opacity-30" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-32">
              <div className="max-w-3xl">
                <p className="section-num fade-up-delay-1">// ИГРОВОЙ ШУТОР</p>
                <h1 className="glitch text-6xl sm:text-8xl font-black uppercase leading-none mb-6 fade-up-delay-2"
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '-0.02em' }}>
                  SEM<span className="neon-text">STRAIK</span>
                </h1>
                <p className="text-white/60 text-lg sm:text-xl mb-10 leading-relaxed max-w-xl fade-up-delay-3">
                  Лучший шутор для настоящих игроков. Турниры, мерч, сообщество — всё здесь.
                </p>
                <div className="flex flex-wrap gap-4 fade-up-delay-4">
                  <button onClick={() => setActiveSection("guide")} className="red-btn px-8 py-4 text-base font-semibold uppercase tracking-widest">
                    Начать играть
                  </button>
                  <button onClick={() => setActiveSection("donate")} className="neon-btn px-8 py-4 text-base uppercase">
                    Поддержать
                  </button>
                </div>
              </div>

              <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px border border-white/5">
                {[
                  { val: "12K+", label: "Игроков" },
                  { val: "99.9%", label: "Аптайм" },
                  { val: "50+", label: "Серверов" },
                  { val: "3 года", label: "На рынке" },
                ].map((s, i) => (
                  <div key={i} className="p-6 dark-card text-center">
                    <div className="text-3xl font-black neon-text mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{s.val}</div>
                    <div className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
            <div className="section-num text-center mb-4">// ПОЧЕМУ МЫ</div>
            <h2 className="text-4xl sm:text-5xl font-black text-center uppercase mb-16" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Шутор нового <span className="neon-text">уровня</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: "Zap", title: "Низкий пинг", desc: "Серверы по всей России. Пинг до 10ms для большинства регионов." },
                { icon: "Shield", title: "Античит", desc: "Продвинутая защита от читеров. Честная игра — наш приоритет." },
                { icon: "Users", title: "Сообщество", desc: "12 000+ активных игроков, Discord, турниры каждую неделю." },
                { icon: "Trophy", title: "Турниры", desc: "Еженедельные турниры с реальными призами и медиа-покрытием." },
                { icon: "Headphones", title: "Поддержка 24/7", desc: "Отвечаем в течение 15 минут. Никаких ботов — только живые люди." },
                { icon: "TrendingUp", title: "Статистика", desc: "Детальная аналитика каждого матча. Расти как профессионал." },
              ].map((f, i) => (
                <div key={i} className="dark-card merch-card p-6 relative overflow-hidden">
                  <div className="w-10 h-10 border border-[#00ff88]/30 flex items-center justify-center mb-4" style={{ boxShadow: '0 0 15px rgba(0,255,136,0.1)' }}>
                    <Icon name={f.icon} size={18} className="text-[#00ff88]" />
                  </div>
                  <h3 className="font-bold text-white mb-2 uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ MERCH ============ */}
      {activeSection === "merch" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="section-num mb-4">// ОФИЦИАЛЬНЫЙ МЕРЧ</div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Носи <span className="neon-text">SEMSTRAIK</span>
            </h2>
            <p className="text-white/50 mb-16 max-w-lg">Качественная одежда для геймеров. Каждая вещь — ограниченный тираж.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {MERCH.map((item, i) => (
                <div key={i} className="dark-card merch-card group cursor-pointer overflow-hidden">
                  <div className="relative h-56 stripe-decor overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="ShoppingBag" size={40} className="text-white/10 mx-auto mb-2" />
                        <span className="text-white/20 text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{item.color}</span>
                      </div>
                    </div>
                    {item.tag && (
                      <div className="absolute top-3 left-3 px-2 py-1 text-xs font-bold" style={{ fontFamily: 'IBM Plex Mono, monospace', background: item.tag === "NEW" ? '#00ff88' : '#ff2244', color: '#000' }}>
                        {item.tag}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00ff88]/30" />
                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00ff88]/30" />
                  </div>
                  <div className="p-5">
                    <div className="font-bold uppercase tracking-wide mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>{item.name}</div>
                    <div className="text-white/40 text-xs mb-4" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{item.color}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black neon-text" style={{ fontFamily: 'Oswald, sans-serif' }}>{item.price}</span>
                      <button className="px-4 py-2 text-xs neon-btn">В КОРЗИНУ</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 p-8 dark-card border border-[#00ff88]/10 text-center">
              <Icon name="Package" size={32} className="text-[#00ff88] mx-auto mb-4" />
              <h3 className="text-2xl font-bold uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>Доставка по всей России</h3>
              <p className="text-white/40 text-sm">СДЭК, Почта России, Boxberry. Бесплатная доставка от 5 000 ₽</p>
            </div>
          </div>
        </div>
      )}

      {/* ============ DONATE ============ */}
      {activeSection === "donate" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="section-num mb-4">// ПОДДЕРЖКА СЕРВЕРА</div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Стань <span className="neon-text">донатером</span>
            </h2>
            <p className="text-white/50 mb-16 max-w-lg">Поддержи сервер и получи уникальные привилегии. Каждый взнос делает SEMSTRAIK лучше.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DONATE_TIERS.map((tier, i) => (
                <div key={i} className={`dark-card relative overflow-hidden ${tier.hot ? 'ring-1 ring-[#00ff88]' : ''}`}
                  style={{ boxShadow: tier.hot ? '0 0 40px rgba(0,255,136,0.15)' : 'none' }}>
                  {tier.hot && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />}
                  {tier.hot && (
                    <div className="absolute top-4 right-4 px-2 py-0.5 text-xs font-bold" style={{ fontFamily: 'IBM Plex Mono, monospace', background: '#00ff88', color: '#000' }}>TOP</div>
                  )}
                  <div className="p-8">
                    <div className="text-xs text-white/30 mb-3 tracking-widest" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>УРОВЕНЬ</div>
                    <h3 className="text-3xl font-black mb-1 uppercase" style={{ fontFamily: 'Oswald, sans-serif', color: tier.color }}>{tier.name}</h3>
                    <div className="text-2xl font-black text-white mb-8" style={{ fontFamily: 'Oswald, sans-serif' }}>{tier.price}</div>
                    <div className="space-y-3 mb-8">
                      {tier.perks.map((p, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <Icon name="Check" size={12} className="text-[#00ff88] flex-shrink-0" />
                          <span className="text-white/70 text-sm">{p}</span>
                        </div>
                      ))}
                    </div>
                    <button className={tier.hot ? "red-btn w-full py-3 text-sm font-bold uppercase tracking-widest" : "neon-btn w-full py-3 text-sm uppercase"}>
                      Выбрать план
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 p-6 dark-card flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <Icon name="Heart" size={32} className="text-[#ff2244] flex-shrink-0" />
              <div>
                <div className="font-bold uppercase mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>Разовое пожертвование</div>
                <p className="text-white/40 text-sm">Хочешь поддержать без подписки? Напиши нам в Discord — мы примем любую сумму.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ DISCOUNTS ============ */}
      {activeSection === "discounts" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="section-num mb-4">// ПРОМОКОДЫ И АКЦИИ</div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              <span className="neon-text">Скидки</span> для своих
            </h2>
            <p className="text-white/50 mb-16 max-w-lg">Копируй промокод и применяй при оплате. Некоторые акции работают ограниченное время.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {DISCOUNTS.map((d, i) => (
                <div key={i} className="dark-card p-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00ff88]/50 to-transparent" />
                  <div className="text-xs text-white/30 mb-4 tracking-widest uppercase" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{d.expires}</div>
                  <h3 className="text-2xl font-black uppercase mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>{d.title}</h3>
                  <p className="text-white/50 text-sm mb-6">{d.desc}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-[#00ff88] text-sm font-bold tracking-widest" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>
                      {d.code}
                    </div>
                    <button onClick={() => copyCode(d.code)} className="p-3 neon-btn" title="Скопировать">
                      <Icon name={copiedCode === d.code ? "Check" : "Copy"} size={16} />
                    </button>
                  </div>
                  {copiedCode === d.code && (
                    <p className="text-[#00ff88] text-xs mt-2" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>✓ Скопировано!</p>
                  )}
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden dark-card p-8 sm:p-12" style={{ border: '1px solid rgba(255,34,68,0.2)', boxShadow: '0 0 40px rgba(255,34,68,0.05)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: '#ff2244' }} />
              <div className="relative">
                <div className="text-xs text-[#ff2244] mb-3 tracking-widest" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>// ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ</div>
                <h3 className="text-3xl sm:text-4xl font-black uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Приведи друга — получи 2 недели бесплатно
                </h3>
                <p className="text-white/50 mb-6">Реферальная программа действует для всех подписчиков SOLDIER и GENERAL</p>
                <button className="red-btn px-8 py-3 text-sm uppercase tracking-widest">Узнать подробнее</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ GUIDE ============ */}
      {activeSection === "guide" && (
        <div className="pt-24 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="section-num mb-4">// РУКОВОДСТВО</div>
            <h2 className="text-5xl sm:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Как начать <span className="neon-text">играть</span>
            </h2>
            <p className="text-white/50 mb-16 max-w-lg">4 простых шага и ты уже в бою. Никаких сложностей.</p>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88] via-[#00ff88]/30 to-transparent hidden md:block" />
              <div className="space-y-6">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 flex items-center justify-center border border-[#00ff88] bg-[#0a0a0a]"
                        style={{ boxShadow: '0 0 20px rgba(0,255,136,0.2)' }}>
                        <span className="neon-text font-black text-lg" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{step.num}</span>
                      </div>
                    </div>
                    <div className="dark-card flex-1 p-6 merch-card">
                      <h3 className="text-2xl font-black uppercase mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>{step.title}</h3>
                      <p className="text-white/60">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 text-center">
              <div className="inline-block dark-card p-10 border border-[#00ff88]/15" style={{ boxShadow: '0 0 60px rgba(0,255,136,0.08)' }}>
                <Icon name="Gamepad2" size={40} className="text-[#00ff88] mx-auto mb-4" />
                <h3 className="text-3xl font-black uppercase mb-3" style={{ fontFamily: 'Oswald, sans-serif' }}>Готов к бою?</h3>
                <p className="text-white/40 mb-6 text-sm">Регистрация занимает меньше 2 минут</p>
                <button className="red-btn px-10 py-4 text-sm font-bold uppercase tracking-widest">
                  Зарегистрироваться
                </button>
              </div>
            </div>
            <div className="mt-16">
              <div className="section-num mb-6">// ЧАСТО СПРАШИВАЮТ</div>
              <div className="space-y-3">
                {[
                  { q: "Нужно ли платить для игры?", a: "Нет! Базовый доступ к серверам бесплатный. Донат даёт дополнительные привилегии." },
                  { q: "Какие игры поддерживаются?", a: "CS2, Valorant-like режимы. Следи за новостями — расширяем список." },
                  { q: "Как попасть в турнир?", a: "Запись открывается в Discord каждую пятницу. Нужен аккаунт на сайте." },
                ].map((faq, i) => (
                  <div key={i} className="dark-card p-6">
                    <div className="font-bold uppercase mb-2 text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>{faq.q}</div>
                    <div className="text-white/50 text-sm">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ PROFILE MODAL ============ */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop" onClick={() => setProfileOpen(false)}>
          <div className="dark-card w-full max-w-md mx-4 relative overflow-hidden" onClick={e => e.stopPropagation()}
            style={{ border: '1px solid rgba(0,255,136,0.2)', boxShadow: '0 0 60px rgba(0,255,136,0.1)' }}>
            <div className="h-0.5 bg-gradient-to-r from-[#00ff88] via-[#00ff88]/50 to-transparent" />
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="section-num mb-1">// ПРОФИЛЬ</div>
                  <h3 className="text-2xl font-black uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>Личный кабинет</h3>
                </div>
                <button onClick={() => setProfileOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <Icon name="X" size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4 mb-8 p-4 bg-white/3 border border-white/5">
                <div className="w-14 h-14 border border-[#00ff88]/50 flex items-center justify-center" style={{ boxShadow: '0 0 15px rgba(0,255,136,0.2)' }}>
                  <Icon name="User" size={24} className="text-[#00ff88]" />
                </div>
                <div>
                  <div className="font-bold uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>STRIKER_007</div>
                  <div className="text-xs text-white/40" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>Уровень: RECRUIT</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: "Settings", label: "Настройки профиля" },
                  { icon: "CreditCard", label: "Управление подпиской" },
                  { icon: "Trophy", label: "Моя статистика" },
                  { icon: "Package", label: "Мои заказы (мерч)" },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center gap-4 p-4 bg-white/3 border border-white/5 hover:border-[#00ff88]/30 hover:bg-white/5 transition-all text-left group">
                    <Icon name={item.icon} size={16} className="text-white/40 group-hover:text-[#00ff88] transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                    <Icon name="ChevronRight" size={14} className="text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex gap-3">
                <button className="flex-1 neon-btn py-3 text-sm uppercase">Войти</button>
                <button className="flex-1 red-btn py-3 text-sm uppercase">Регистрация</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-16 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border border-[#00ff88]/50 flex items-center justify-center">
              <span className="text-[#00ff88] text-xs font-bold">S</span>
            </div>
            <span className="text-white/30 text-sm" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>SEMSTRAIK © 2024</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: "MessageCircle", label: "Discord" },
              { icon: "Youtube", label: "YouTube" },
              { icon: "Send", label: "Telegram" },
            ].map((s, i) => (
              <button key={i} className="flex items-center gap-2 text-white/30 hover:text-[#00ff88] transition-colors text-sm">
                <Icon name={s.icon} size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
          <div className="text-white/20 text-xs" style={{ fontFamily: 'IBM Plex Mono, monospace' }}>ping: 5ms ■ online: 847</div>
        </div>
      </footer>
    </div>
  );
}