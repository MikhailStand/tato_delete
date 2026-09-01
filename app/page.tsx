'use client';

import Image from 'next/image';
import type { SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Award,
  ArrowDown,
  ArrowUpRight,
  BadgePercent,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  Crosshair,
  HeartHandshake,
  Menu,
  MessageCircle,
  Play,
  Plus,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react';

const prices = [
  { size: 'до 2 см', hint: 'мини-тату', price: '1 500 ₽' },
  { size: 'до 5 см', hint: 'небольшая', price: '2 500 ₽' },
  { size: 'до 10 см', hint: 'средняя', price: '3 500 ₽' },
  { size: 'до 15 см', hint: 'крупная', price: '4 500 ₽' },
  { size: 'больше 15 см', hint: 'индивидуальный расчёт', price: 'от 5 500 ₽' },
];

const steps = [
  { title: 'Консультация', text: 'Эксперт оценивает цвет, плотность и глубину пигмента, возраст татуировки и состояние кожи.' },
  { title: 'Точная настройка', text: 'Специалист подбирает индивидуальные параметры лазера под фототип кожи и задачу: удалить или осветлить.' },
  { title: 'Процедура', text: 'Сеанс занимает около 5–10 минут. Используем охлаждение и анестезирующий гель для вашего комфорта.' },
  { title: 'Восстановление', text: 'После процедуры даём понятные рекомендации и остаёмся на связи до следующего визита.' },
];

const reviews = [
  { name: 'Алина', goal: 'полный курс', quote: 'После каждого сеанса мастер был на связи. Видела понятный прогресс и спокойно дошла до чистой кожи.', image: '/expert-portrait.png' },
  { name: 'Михаил', goal: 'осветление под перекрытие', quote: 'За три сеанса старый рисунок стал достаточно светлым, и тату-мастер смог сделать новое перекрытие.', image: '/studio-consultation.png' },
  { name: 'Ксения', goal: 'удаление мини-тату', quote: 'Больше всего боялась боли, но охлаждение действительно помогает. Сама процедура прошла очень быстро.', image: '/studio-equipment.png' },
];

const faq = [
  ['Можно ли удалить тату до чистой кожи?', 'Да. Современная лазерная технология справляется даже со сложными случаями. Итог зависит от состава и глубины пигмента, фототипа кожи и соблюдения интервалов. Точное количество сеансов специалист назовёт после консультации.'],
  ['Сколько нужно сеансов?', 'В среднем для полного удаления требуется 5–10 сеансов, для осветления под перекрытие — 2–4. Калькулятор на странице даст предварительный диапазон.'],
  ['Насколько болезненно удаление?', 'Ощущения сравнимы с короткими горячими щелчками. Анестезирующий гель и криоустановка помогают сделать процедуру значительно комфортнее.'],
  ['Сколько длится сеанс?', 'Обычно 5–10 минут. Для больших работ может потребоваться больше времени или деление зоны на несколько этапов.'],
  ['Какой интервал между сеансами?', 'Чаще всего 6–8 недель. За это время кожа восстанавливается, а организм естественно выводит разрушенный пигмент.'],
  ['Сколько сеансов нужно для осветления под перекрытие?', 'Обычно достаточно 2–4 сеансов. Мастер будущего перекрытия может подсказать необходимую степень осветления, а мы подберём щадящий протокол.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState<'remove' | 'cover'>('remove');
  const [skinType, setSkinType] = useState(3);
  const [tattooAge, setTattooAge] = useState<'new' | 'middle' | 'old'>('middle');
  const [ink, setInk] = useState<'black' | 'color'>('black');
  const [density, setDensity] = useState<'light' | 'dense'>('dense');
  const [videoOpen, setVideoOpen] = useState<number | null>(null);
  const [coupon, setCoupon] = useState(false);

  const sessions = useMemo(() => {
    let center = goal === 'remove' ? 6 : 3;
    center += skinType >= 5 ? 1 : 0;
    center += tattooAge === 'new' ? 1 : tattooAge === 'old' ? -1 : 0;
    center += ink === 'color' ? 2 : 0;
    center += density === 'dense' ? 1 : 0;
    center = Math.max(goal === 'remove' ? 3 : 1, center);
    return [Math.max(1, center - 1), center + 1];
  }, [goal, skinType, tattooAge, ink, density]);

  function submitCoupon(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setCoupon(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="NOIR — на главную">
          <span className="brand-mark">N</span>
          <span>NOIR<br /><small>tattoo studio</small></span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#results">Результаты</a>
          <a href="#price">Стоимость</a>
          <a href="#calculator">Расчёт сеансов</a>
          <a href="#process">Процесс</a>
        </nav>
        <a className="header-cta" href="#booking">Записаться <ArrowUpRight size={17} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Открыть меню"><Menu /></button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => setMenuOpen(false)} aria-label="Закрыть меню"><X /></button>
          {['results', 'price', 'calculator', 'process', 'faq'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item === 'results' ? 'Результаты' : item === 'price' ? 'Стоимость' : item === 'calculator' ? 'Расчёт сеансов' : item === 'process' ? 'Как всё проходит' : 'Вопросы'}</a>
          ))}
          <a className="button button-primary" href="#booking" onClick={() => setMenuOpen(false)}>Записаться</a>
        </div>
      )}

      <a className="floating-booking" href="#booking" aria-label="Перейти к онлайн-записи">
        <span>Запись<br />онлайн</span><ArrowUpRight />
      </a>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <i className="decor-square hero-square-one" />
        <i className="decor-square hero-square-two" />
        <div className="hero-copy">
          <h1>Чистая кожа.<br /><em>Ваше решение.</em></h1>
          <p className="hero-lead">Точная работа с пигментом — от деликатного осветления под перекрытие до полного удаления татуировки.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#booking">Получить скидку 20% <ArrowUpRight size={18} /></a>
            <a className="button button-ghost" href="#calculator">Рассчитать сеансы <ArrowDown size={18} /></a>
          </div>
        </div>
        <div className="hero-visual">
          <Image src="/studio-equipment.png" alt="Лазерная и криоустановка в студии" fill priority sizes="(max-width: 900px) 100vw, 54vw" />
          <div className="image-wash" />
          <div className="equipment-note note-laser"><b>Пикосекундный лазер</b><small>точно воздействует на пигмент</small></div>
          <div className="equipment-note note-cryo"><b>Криоустановка</b><small>комфорт во время процедуры</small></div>
          <div className="status-pill"><Sparkles size={16} /> Современное оборудование</div>
          <div className="orbit-copy">ТОЧНО · БЕРЕЖНО · ДО РЕЗУЛЬТАТА ·</div>
        </div>
      </section>

      <section className="section advantages">
        <div className="advantages-title">
          <h2>МЫ ПРО<span>...</span></h2>
          <p>Технологию, которая бережно работает с кожей и уверенно — с пигментом.</p>
        </div>
        <div className="advantages-mosaic">
          <article className="advantage-feature">
            <Image src="/studio-equipment.png" alt="Лазер и криоустановка NOIR" fill sizes="(max-width: 900px) 100vw, 34vw" />
            <div className="advantage-feature-shade" />
            <div className="advantage-card-content">
              <div className="advantage-icon"><Sparkles /></div>
              <h3>Лазер нового<br />поколения</h3>
              <p>Современная система точно дробит пигмент, а криоустановка помогает сделать процедуру комфортнее.</p>
            </div>
          </article>
          <article className="advantage-card">
            <div className="advantage-icon"><Target /></div>
            <h3>Эффективность</h3>
            <p>Удаляем тату до чистой кожи — без остаточного рисунка. Результат зависит от пигмента и количества сеансов.</p>
          </article>
          <article className="advantage-card">
            <div className="advantage-icon"><ShieldCheck /></div>
            <h3>Безопасность</h3>
            <p>Лазер воздействует точно на пигмент, не повреждая окружающую кожу. Настройки подбираем индивидуально.</p>
          </article>
          <article className="advantage-card advantage-card-accent">
            <div className="advantage-icon"><Zap /></div>
            <h3>Быстрое восстановление</h3>
            <p>Сеанс занимает около 5–10 минут, а кожа восстанавливается быстро и без выраженного дискомфорта.</p>
          </article>
          <article className="advantage-card">
            <div className="advantage-icon"><Crosshair /></div>
            <h3>Точный протокол</h3>
            <p>Учитываем фототип, цвет, плотность и глубину пигмента — один шаблон не применяем ко всем.</p>
          </article>
        </div>
      </section>

      <section className="section results-section" id="results">
        <div className="section-heading split-heading">
          <div><h2>До — и <em>после</em></h2></div>
          <fieldset className="goal-switch"><legend className="sr-only">Цель удаления</legend>
            <button className={goal === 'remove' ? 'active' : ''} onClick={() => setGoal('remove')}>Полное удаление</button>
            <button className={goal === 'cover' ? 'active' : ''} onClick={() => setGoal('cover')}>Под перекрытие</button>
          </fieldset>
        </div>
        <div className={`before-after-grid ${goal === 'cover' ? 'cover-case' : ''}`}>
          <figure className="result-photo result-photo-before">
            <Image src="/before-after.png" alt="Татуировка до начала курса удаления" fill sizes="(max-width: 700px) 100vw, 50vw" style={{ width: '200%', maxWidth: 'none', left: 0 }} />
            <figcaption>До</figcaption>
          </figure>
          <figure className="result-photo result-photo-after">
            <Image src="/before-after.png" alt={goal === 'remove' ? 'Кожа после курса удаления татуировки' : 'Татуировка после осветления под перекрытие'} fill sizes="(max-width: 700px) 100vw, 50vw" style={{ width: '200%', maxWidth: 'none', left: '-100%' }} />
            <figcaption>{goal === 'remove' ? 'После курса' : 'После осветления'}</figcaption>
          </figure>
        </div>
        <div className="result-caption">
          <p><strong>{goal === 'remove' ? 'Полное удаление' : 'Осветление под перекрытие'}</strong><span>{goal === 'remove' ? 'Показываем две фотографии рядом — результат легко оценить без слайдера и скрытых переходов.' : 'Деликатно снижаем плотность старого пигмента, чтобы мастеру было проще создать новое тату.'}</span></p>
          <div><span>одинаковый ракурс</span><span>{goal === 'remove' ? 'результат курса' : '2–4 сеанса'}</span></div>
        </div>
        <p className="medical-note">Результат индивидуален и зависит от состава пигмента, глубины, возраста татуировки и особенностей кожи.</p>
      </section>

      <section className="section price-section" id="price">
        <div className="section-heading split-heading">
          <div><h2>Понятная <em>стоимость</em></h2></div>
          <p>Финальная цена фиксируется после бесплатной консультации. Без скрытых доплат.</p>
        </div>
        <div className="price-layout">
          <div className="price-list">
            {prices.map(item => <div className="price-row" key={item.size}><div><b>{item.size}</b><small>{item.hint}</small></div><strong>{item.price}</strong></div>)}
          </div>
          <aside className="subscription-card">
            <h3>Курс выгоднее<br />одного сеанса</h3>
            <p>Зафиксируйте стоимость и двигайтесь к результату по плану.</p>
            <div className="subscription-options"><span><b>4</b> сеанса <strong>−7%</strong></span><span><b>6</b> сеансов <strong>−12%</strong></span><span><b>8</b> сеансов <strong>−18%</strong></span></div>
            <ul><li><Check /> Персональный график</li><li><Check /> Цена не меняется весь курс</li><li><Check /> Приоритетная запись</li></ul>
            <a className="button button-primary" href="#booking">Подобрать абонемент <ArrowUpRight size={17} /></a>
          </aside>
        </div>
        <div className="split-pay">
          <div className="split-pay-copy"><CreditCard /><span>Рассрочка на курс</span><h3>Делите оплату<br />на части</h3><p>Без переплат и скрытых комиссий. Подберём комфортный график вместе с абонементом.</p></div>
          <div className="split-pay-offer"><strong>БЕЗ<br />ПЕРЕПЛАТ</strong><div><span>от</span><b>1 350 ₽</b><small>в месяц</small></div><a className="button button-primary" href="#booking">Рассчитать курс <ArrowUpRight /></a></div>
          <i className="decor-square split-square" />
        </div>
      </section>

      <section className="section calculator-section" id="calculator">
        <div className="section-heading split-heading">
          <div><h2>Сколько нужно <em>сеансов?</em></h2></div>
          <p>Ответьте на четыре вопроса. Расчёт ориентировочный — точный план составляет специалист после осмотра.</p>
        </div>
        <div className="calculator-shell">
          <div className="calculator-controls">
            <div className="calc-block"><div className="calc-label"><div><b>Ваш фототип кожи</b><small>Шкала Фицпатрика</small></div></div>
              <div className="skin-types">{[1,2,3,4,5,6].map(type => <button key={type} onClick={() => setSkinType(type)} className={skinType === type ? 'active' : ''}><span className="skin-photo"><Image src="/fitzpatrick-types.png" alt={`Фототип кожи ${type}`} fill sizes="120px" style={{ width: '600%', maxWidth: 'none', left: `-${(type - 1) * 100}%` }} /></span><b>{type}</b></button>)}</div>
            </div>
            <div className="calc-block"><div className="calc-label"><b>Возраст татуировки</b></div><div className="choice-row"><button className={tattooAge === 'new' ? 'active' : ''} onClick={() => setTattooAge('new')}>до 2 лет</button><button className={tattooAge === 'middle' ? 'active' : ''} onClick={() => setTattooAge('middle')}>2–7 лет</button><button className={tattooAge === 'old' ? 'active' : ''} onClick={() => setTattooAge('old')}>больше 7 лет</button></div></div>
            <div className="calc-halves">
              <div className="calc-block"><div className="calc-label"><b>Цвет</b></div><div className="choice-row"><button className={ink === 'black' ? 'active' : ''} onClick={() => setInk('black')}>чёрный</button><button className={ink === 'color' ? 'active' : ''} onClick={() => setInk('color')}>цветной</button></div></div>
              <div className="calc-block"><div className="calc-label"><b>Плотность</b></div><div className="choice-row"><button className={density === 'light' ? 'active' : ''} onClick={() => setDensity('light')}>лёгкая</button><button className={density === 'dense' ? 'active' : ''} onClick={() => setDensity('dense')}>плотная</button></div></div>
            </div>
            <div className="calc-block"><div className="calc-label"><b>Цель</b></div><div className="choice-row"><button className={goal === 'remove' ? 'active' : ''} onClick={() => setGoal('remove')}>удалить полностью</button><button className={goal === 'cover' ? 'active' : ''} onClick={() => setGoal('cover')}>осветлить под перекрытие</button></div></div>
          </div>
          <aside className="calc-result"><p>Ваш ориентир</p><div className="session-number">{sessions[0]}–{sessions[1]}</div><h3>сеансов</h3><span>с интервалом 6–8 недель</span><div className="calc-divider" /><p>На консультации эксперт уточнит прогноз и составит индивидуальный план.</p><a className="button button-primary" href="#booking">Получить точный расчёт <ArrowUpRight size={17} /></a></aside>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="section-heading split-heading">
          <div><h2>Спокойно.<br /><em>По шагам.</em></h2></div>
          <p>От первой консультации до рекомендаций после сеанса — понятно, внимательно и с заботой о коже.</p>
        </div>
        <div className="process-story">
          <div className="process-visual"><Image src="/studio-consultation.png" alt="Консультация перед лазерным удалением татуировки" fill sizes="(max-width: 900px) 100vw, 44vw" /><span>Консультация перед первым сеансом</span></div>
          <div className="process-timeline">{steps.map((step, i) => <article key={step.title}><div className="process-mini-icon">{i === 0 ? <MessageCircle /> : i === 1 ? <Crosshair /> : i === 2 ? <Snowflake /> : <Sparkles />}</div><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section prep-section">
        <div className="section-heading"><h2>Перед процедурой</h2></div>
        <div className="prep-grid"><article><span>За 14 дней</span><h3>Без загара</h3><p>Не загорайте и не посещайте солярий, используйте SPF на открытых участках.</p></article><article><span>За 3 дня</span><h3>Бережно к коже</h3><p>Не используйте кислоты, скрабы и раздражающие средства в зоне удаления.</p></article><article><span>В день сеанса</span><h3>Чистая кожа</h3><p>Не наносите кремы и масла. Наденьте одежду, которая легко открывает нужную зону.</p></article><article><span>Важно</span><h3>Расскажите нам</h3><p>Сообщите о лекарствах, хронических заболеваниях и реакции кожи на прошлые процедуры.</p></article></div>
        <p className="prep-contact">Есть сомнения по подготовке? <a href="#booking">Напишите нам до записи — подскажем.</a></p>
      </section>

      <section className="section studio-section">
        <div className="studio-story">
          <div className="studio-copy"><h2>Давайте<br /><em>знакомиться</em></h2><p>NOIR — тёмное, спокойное пространство, где технология не заслоняет заботу. Показываем оборудование, объясняем план и остаёмся рядом между сеансами.</p><div className="studio-tags"><span>Лазер</span><span>Криоустановка</span><span>Кушетка</span><span>Зона ожидания</span></div><a className="button button-ghost" href="#booking">Познакомиться на консультации <ArrowUpRight /></a></div>
          <div className="studio-collage"><div className="studio-main-photo"><Image src="/studio-consultation.png" alt="Консультация в студии NOIR" fill sizes="(max-width: 900px) 100vw, 52vw" /></div><div className="studio-detail-photo"><Image src="/studio-equipment.png" alt="Лазер, криоустановка и кушетка" fill sizes="28vw" /></div><i className="decor-square studio-square" /></div>
        </div>
      </section>

      <section className="section expert-section">
        <div className="expert-photo"><Image src="/expert-portrait.png" alt="Эксперт по лазерному удалению татуировок" fill sizes="(max-width: 900px) 100vw, 42vw" /><span>Временное фото — заменим на специалиста студии</span></div>
        <div className="expert-copy"><h2>Ваш результат<br />ведёт <em>эксперт</em></h2><p className="expert-lead">Специалист оценивает татуировку, подбирает параметры лазера и корректирует протокол по реакции кожи — от первой консультации до финального результата.</p><div className="expert-points"><div><Award /><span><b>Профессиональная подготовка</b><small>Работа с разными фототипами и сложными пигментами</small></span></div><div><HeartHandshake /><span><b>Поддержка между сеансами</b><small>Можно написать и уточнить всё о восстановлении</small></span></div><div><ShieldCheck /><span><b>Без шаблонных настроек</b><small>Параметры подбираются индивидуально перед каждым сеансом</small></span></div></div><blockquote>«Наша задача — не просто воздействовать на пигмент, а провести кожу через весь курс спокойно и предсказуемо».</blockquote><a className="button button-primary" href="#booking">Получить консультацию <ArrowUpRight /></a></div>
      </section>

      <section className="section reviews-section">
        <div className="section-heading split-heading"><div><h2>Говорят <em>клиенты</em></h2></div><p>Реальные видео можно подставить вместо временных карточек без изменения дизайна блока.</p></div>
        <Carousel opts={{ align: 'start', loop: true }} className="reviews-carousel">
          <CarouselContent>
            {reviews.map((review,index) => <CarouselItem className="review-slide" key={review.name}><button className="video-card" onClick={() => setVideoOpen(index)}><Image src={review.image} alt="" fill sizes="(max-width: 900px) 85vw, 42vw" /><span className="play-button"><Play fill="currentColor" /></span><div><p>«{review.quote}»</p><b>{review.name}</b><small>{review.goal} · смотреть видео</small></div></button></CarouselItem>)}
          </CarouselContent>
          <div className="review-controls"><CarouselPrevious /><CarouselNext /></div>
        </Carousel>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading split-heading"><div><h2>Частые <em>вопросы</em></h2></div><p>Если не нашли ответ — напишите нам. Администратор или специалист поможет разобраться.</p></div>
        <div className="faq-list">{faq.map(([question, answer]) => <details key={question}><summary>{question}<Plus /></summary><p>{answer}</p></details>)}</div>
        <div className="faq-contact-strip"><div><MessageCircle /><span><b>Остался свой вопрос?</b><small>Напишите нам — ответит специалист, а не бот.</small></span></div><a className="button" href="#booking">Задать вопрос <ArrowUpRight /></a></div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-copy"><h2>Начните с <em>чистого</em></h2><p>Оставьте контакты — пришлём купон на скидку 20% на первый сеанс и предложим удобное время для бесплатной консультации.</p><div className="booking-perks"><span><BadgePercent /> −20% на первый сеанс</span><span><CalendarDays /> Подберём время</span><span><Clock3 /> Ответим в течение 15 минут</span></div></div>
        <form onSubmit={submitCoupon}><label>Ваше имя<input required name="name" placeholder="Как к вам обращаться?" /></label><label>Телефон или Telegram<input required name="contact" placeholder="+7 999 000-00-00" /></label><label>Что хотите сделать?<select name="goal"><option>Удалить тату полностью</option><option>Осветлить под перекрытие</option><option>Нужна консультация</option></select></label><button className="button button-primary" type="submit">Получить купон <ArrowUpRight /></button><small>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</small></form>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">N</span><span>NOIR<br /><small>tattoo studio</small></span></a><p>Лазерное удаление и осветление татуировок.</p><div><a href="#results">Результаты</a><a href="#price">Прайс</a><a href="#faq">FAQ</a><a href="#booking">Контакты</a></div><span>© 2026 NOIR</span></footer>

      {videoOpen !== null && <div className="modal-backdrop" role="presentation" onKeyDown={event => event.key === 'Escape' && setVideoOpen(null)} onClick={event => event.currentTarget === event.target && setVideoOpen(null)}><dialog open className="video-modal" aria-label="Видеоотзыв клиента"><button onClick={() => setVideoOpen(null)} aria-label="Закрыть"><X /></button><div className="video-placeholder"><Play fill="currentColor" /><p>Видеоотзыв клиента</p><span>Сюда можно добавить реальное видео студии</span></div></dialog></div>}
      {coupon && <div className="modal-backdrop" role="presentation" onKeyDown={event => event.key === 'Escape' && setCoupon(false)} onClick={event => event.currentTarget === event.target && setCoupon(false)}><dialog open className="coupon-modal" aria-label="Купон на скидку"><button onClick={() => setCoupon(false)} aria-label="Закрыть"><X /></button><BadgePercent /><p>Ваш купон</p><strong>FIRST20</strong><h3>Скидка 20% сохранена</h3><span>Покажите код администратору. Мы свяжемся с вами для подтверждения записи.</span><button className="button button-primary" onClick={() => setCoupon(false)}>Готово</button></dialog></div>}
    </main>
  );
}
