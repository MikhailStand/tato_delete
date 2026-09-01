'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Crosshair,
  Menu,
  MessageCircle,
  Play,
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
  { number: '01', title: 'Консультация', text: 'Эксперт оценивает цвет, плотность и глубину пигмента, возраст татуировки и состояние кожи.' },
  { number: '02', title: 'Точная настройка', text: 'Специалист подбирает индивидуальные параметры лазера под фототип кожи и задачу: удалить или осветлить.' },
  { number: '03', title: 'Процедура', text: 'Сеанс занимает около 5–10 минут. Используем охлаждение и анестезирующий гель для вашего комфорта.' },
  { number: '04', title: 'Восстановление', text: 'После процедуры даём понятные рекомендации и остаёмся на связи до следующего визита.' },
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

  function submitCoupon(event: FormEvent<HTMLFormElement>) {
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

      <section className="hero" id="top">
        <div className="hero-glow" />
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
          <div className="equipment-note note-laser"><span>01</span><b>Пикосекундный лазер</b><small>точно воздействует на пигмент</small></div>
          <div className="equipment-note note-cryo"><span>02</span><b>Криоустановка</b><small>комфорт во время процедуры</small></div>
          <div className="status-pill"><Sparkles size={16} /> Современное оборудование</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Преимущества">
        <p>Удаляем лишнее.<br /><strong>Сохраняем главное — вас.</strong></p>
        <div><span>Эффективно</span><span>Безопасно</span><span>Быстро</span></div>
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
          <div className="goal-switch" role="group" aria-label="Цель удаления">
            <button className={goal === 'remove' ? 'active' : ''} onClick={() => setGoal('remove')}>Полное удаление</button>
            <button className={goal === 'cover' ? 'active' : ''} onClick={() => setGoal('cover')}>Под перекрытие</button>
          </div>
        </div>
        <div className="comparison-card">
          <div className="comparison-image before-image"><span>До</span></div>
          <div className={`comparison-image after-image ${goal === 'cover' ? 'cover-result' : ''}`}><span>{goal === 'remove' ? 'После курса' : 'Осветление'}</span></div>
        </div>
        <div className="result-caption">
          <p><strong>{goal === 'remove' ? 'Полное удаление' : 'Подготовка под новую работу'}</strong><span>{goal === 'remove' ? 'Кожа после завершённого курса процедур.' : 'Деликатно снижаем плотность старого пигмента за 2–4 сеанса, чтобы мастеру было проще создать новое тату.'}</span></p>
          <div><span>Чёрный пигмент</span><span>Средняя плотность</span><span>{goal === 'remove' ? '7 сеансов' : '3 сеанса'}</span></div>
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
            {prices.map((item, index) => <div className="price-row" key={item.size}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{item.size}</b><small>{item.hint}</small></div><strong>{item.price}</strong></div>)}
          </div>
          <aside className="subscription-card">
            <h3>Курс выгоднее<br />одного сеанса</h3>
            <p>Зафиксируйте стоимость и двигайтесь к результату по плану.</p>
            <div className="subscription-options"><span><b>4</b> сеанса <strong>−7%</strong></span><span><b>6</b> сеансов <strong>−12%</strong></span><span><b>8</b> сеансов <strong>−18%</strong></span></div>
            <ul><li><Check /> Персональный график</li><li><Check /> Цена не меняется весь курс</li><li><Check /> Приоритетная запись</li></ul>
            <a className="button button-primary" href="#booking">Подобрать абонемент <ArrowUpRight size={17} /></a>
          </aside>
        </div>
        <div className="payment-banner"><CreditCard /><div><strong>Можно в рассрочку</strong><span>Разделите оплату курса на комфортные платежи без переплаты. Условия уточняйте у администратора.</span></div><a href="#booking">Узнать условия <ArrowRight /></a></div>
      </section>

      <section className="section calculator-section" id="calculator">
        <div className="section-heading split-heading">
          <div><h2>Сколько нужно <em>сеансов?</em></h2></div>
          <p>Ответьте на четыре вопроса. Расчёт ориентировочный — точный план составляет специалист после осмотра.</p>
        </div>
        <div className="calculator-shell">
          <div className="calculator-controls">
            <div className="calc-block"><div className="calc-label"><span>01</span><div><b>Ваш фототип кожи</b><small>Шкала Фицпатрика</small></div></div>
              <div className="skin-types">{[1,2,3,4,5,6].map(type => <button key={type} onClick={() => setSkinType(type)} className={skinType === type ? 'active' : ''}><span className={`skin-photo photo-${type}`} /><b>{type}</b></button>)}</div>
            </div>
            <div className="calc-block"><div className="calc-label"><span>02</span><b>Возраст татуировки</b></div><div className="choice-row"><button className={tattooAge === 'new' ? 'active' : ''} onClick={() => setTattooAge('new')}>до 2 лет</button><button className={tattooAge === 'middle' ? 'active' : ''} onClick={() => setTattooAge('middle')}>2–7 лет</button><button className={tattooAge === 'old' ? 'active' : ''} onClick={() => setTattooAge('old')}>больше 7 лет</button></div></div>
            <div className="calc-halves">
              <div className="calc-block"><div className="calc-label"><span>03</span><b>Цвет</b></div><div className="choice-row"><button className={ink === 'black' ? 'active' : ''} onClick={() => setInk('black')}>чёрный</button><button className={ink === 'color' ? 'active' : ''} onClick={() => setInk('color')}>цветной</button></div></div>
              <div className="calc-block"><div className="calc-label"><span>04</span><b>Плотность</b></div><div className="choice-row"><button className={density === 'light' ? 'active' : ''} onClick={() => setDensity('light')}>лёгкая</button><button className={density === 'dense' ? 'active' : ''} onClick={() => setDensity('dense')}>плотная</button></div></div>
            </div>
            <div className="calc-block"><div className="calc-label"><span>05</span><b>Цель</b></div><div className="choice-row"><button className={goal === 'remove' ? 'active' : ''} onClick={() => setGoal('remove')}>удалить полностью</button><button className={goal === 'cover' ? 'active' : ''} onClick={() => setGoal('cover')}>осветлить под перекрытие</button></div></div>
          </div>
          <aside className="calc-result"><p>Ваш ориентир</p><div className="session-number">{sessions[0]}–{sessions[1]}</div><h3>сеансов</h3><span>с интервалом 6–8 недель</span><div className="calc-divider" /><p>На консультации эксперт уточнит прогноз и составит индивидуальный план.</p><a className="button button-primary" href="#booking">Получить точный расчёт <ArrowUpRight size={17} /></a></aside>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="section-heading split-heading">
          <div><h2>Спокойно.<br /><em>По шагам.</em></h2></div>
          <p>От первой консультации до рекомендаций после сеанса — понятно, внимательно и с заботой о коже.</p>
        </div>
        <div className="process-grid">{steps.map((step, i) => <article key={step.number}><span>{step.number}</span><div className="process-icon">{i === 0 ? <MessageCircle /> : i === 1 ? <Crosshair /> : i === 2 ? <Snowflake /> : <Sparkles />}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="section prep-section">
        <div className="section-heading"><h2>Перед процедурой</h2></div>
        <div className="prep-grid"><article><span>За 14 дней</span><h3>Без загара</h3><p>Не загорайте и не посещайте солярий, используйте SPF на открытых участках.</p></article><article><span>За 3 дня</span><h3>Бережно к коже</h3><p>Не используйте кислоты, скрабы и раздражающие средства в зоне удаления.</p></article><article><span>В день сеанса</span><h3>Чистая кожа</h3><p>Не наносите кремы и масла. Наденьте одежду, которая легко открывает нужную зону.</p></article><article><span>Важно</span><h3>Расскажите нам</h3><p>Сообщите о лекарствах, хронических заболеваниях и реакции кожи на прошлые процедуры.</p></article></div>
        <p className="prep-contact">Есть сомнения по подготовке? <a href="#booking">Напишите нам до записи — подскажем.</a></p>
      </section>

      <section className="section studio-section">
        <div className="studio-photo"><Image src="/studio-equipment.png" alt="Кабинет лазерного удаления, кушетка и зона ожидания" fill sizes="100vw" /><div className="studio-overlay"><h2>Здесь всё настроено<br />на ваш <em>комфорт</em></h2><div className="studio-tags"><span>Лазер</span><span>Криоустановка</span><span>Кушетка</span><span>Зона ожидания</span></div></div></div>
      </section>

      <section className="section reviews-section">
        <div className="section-heading split-heading"><div><h2>Говорят <em>клиенты</em></h2></div><div className="review-arrows"><button onClick={() => setVideoOpen(0)} aria-label="Посмотреть первый отзыв"><ArrowLeft /></button><button onClick={() => setVideoOpen(2)} aria-label="Посмотреть следующий отзыв"><ArrowRight /></button></div></div>
        <div className="review-grid">{['Алина · полный курс','Михаил · под перекрытие','Ксения · удаление тату'].map((name,index) => <button className="video-card" key={name} onClick={() => setVideoOpen(index)}><Image src={index === 1 ? '/before-after.png' : '/studio-equipment.png'} alt="" fill sizes="33vw" /><span className="play-button"><Play fill="currentColor" /></span><div><b>{name}</b><small>Смотреть видео · 0:{32 + index * 9}</small></div></button>)}</div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading split-heading"><div><h2>Частые <em>вопросы</em></h2></div><p>Если не нашли ответ — напишите нам. Администратор или специалист поможет разобраться.</p></div>
        <div className="faq-list">{faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2,'0')}</span>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-copy"><h2>Начните с <em>чистого</em></h2><p>Оставьте контакты — пришлём купон на скидку 20% на первый сеанс и предложим удобное время для бесплатной консультации.</p><div className="booking-perks"><span><BadgePercent /> −20% на первый сеанс</span><span><CalendarDays /> Подберём время</span><span><Clock3 /> Ответим в течение 15 минут</span></div></div>
        <form onSubmit={submitCoupon}><label>Ваше имя<input required name="name" placeholder="Как к вам обращаться?" /></label><label>Телефон или Telegram<input required name="contact" placeholder="+7 999 000-00-00" /></label><label>Что хотите сделать?<select name="goal"><option>Удалить тату полностью</option><option>Осветлить под перекрытие</option><option>Нужна консультация</option></select></label><button className="button button-primary" type="submit">Получить купон <ArrowUpRight /></button><small>Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</small></form>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">N</span><span>NOIR<br /><small>tattoo studio</small></span></a><p>Лазерное удаление и осветление татуировок.</p><div><a href="#results">Результаты</a><a href="#price">Прайс</a><a href="#faq">FAQ</a><a href="#booking">Контакты</a></div><span>© 2026 NOIR</span></footer>

      {videoOpen !== null && <div className="modal-backdrop" onClick={() => setVideoOpen(null)}><div className="video-modal" onClick={event => event.stopPropagation()}><button onClick={() => setVideoOpen(null)} aria-label="Закрыть"><X /></button><div className="video-placeholder"><Play fill="currentColor" /><p>Видеоотзыв клиента</p><span>Сюда можно добавить реальное видео студии</span></div></div></div>}
      {coupon && <div className="modal-backdrop" onClick={() => setCoupon(false)}><div className="coupon-modal" onClick={event => event.stopPropagation()}><button onClick={() => setCoupon(false)} aria-label="Закрыть"><X /></button><BadgePercent /><p>Ваш купон</p><strong>FIRST20</strong><h3>Скидка 20% сохранена</h3><span>Покажите код администратору. Мы свяжемся с вами для подтверждения записи.</span><button className="button button-primary" onClick={() => setCoupon(false)}>Готово</button></div></div>}
    </main>
  );
}
