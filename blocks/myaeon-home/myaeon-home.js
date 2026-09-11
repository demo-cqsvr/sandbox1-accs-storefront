import { homeContent } from '../../scripts/myaeon-content.js';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function control(label, text, className = '') {
  const button = element('button', `myaeon-control ${className}`, text);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  return button;
}

function imageLink(item, eager = false) {
  const link = element('a');
  link.href = item.href;
  const image = element('img');
  image.src = item.image;
  image.alt = item.title || item.name;
  if (item.width) image.width = item.width;
  if (item.height) image.height = item.height;
  image.loading = eager ? 'eager' : 'lazy';
  image.decoding = 'async';
  if (eager) image.fetchPriority = 'high';
  link.append(image);
  return link;
}

function buildHero(promotions) {
  const hero = element('section', 'myaeon-hero');
  hero.setAttribute('aria-label', 'Latest promotions');
  hero.setAttribute('aria-roledescription', 'carousel');
  const slides = promotions.map((promotion, index) => {
    const slide = element('div', 'myaeon-hero-slide');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${index + 1} of ${promotions.length}`);
    slide.append(imageLink(promotion, index === 0));
    hero.append(slide);
    return slide;
  });
  if (slides.length < 2) return hero;

  const previous = control('Previous promotion', '‹', 'myaeon-hero-previous');
  const next = control('Next promotion', '›', 'myaeon-hero-next');
  const dots = element('div', 'myaeon-hero-dots');
  const pause = control('Pause automatic promotions', 'Ⅱ', 'myaeon-hero-pause');
  const status = element('span', 'myaeon-visually-hidden');
  status.setAttribute('aria-live', 'polite');
  status.setAttribute('aria-atomic', 'true');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let paused = reducedMotion.matches;
  let hovering = false;
  let focused = false;
  let timer;
  const dotButtons = promotions.map((promotion, index) => {
    const dot = control(`Show promotion ${index + 1}: ${promotion.title}`, '', 'myaeon-hero-dot');
    dots.append(dot);
    return dot;
  });

  function show(index, announce = false) {
    const moveFocus = announce && slides[active].contains(document.activeElement);
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== active;
      slide.setAttribute('aria-hidden', String(slideIndex !== active));
      slide.querySelector('a').tabIndex = slideIndex === active ? 0 : -1;
      dotButtons[slideIndex].setAttribute('aria-current', String(slideIndex === active));
    });
    if (moveFocus) slides[active].querySelector('a').focus({ preventScroll: true });
    if (announce) status.textContent = `Promotion ${active + 1} of ${slides.length}: ${promotions[active].title}`;
  }

  function schedule() {
    window.clearInterval(timer);
    pause.setAttribute('aria-label', paused ? 'Start automatic promotions' : 'Pause automatic promotions');
    pause.textContent = paused ? '▶' : 'Ⅱ';
    if (!paused && !hovering && !focused && !reducedMotion.matches && !document.hidden) {
      timer = window.setInterval(() => {
        if (!hero.isConnected) window.clearInterval(timer);
        else show(active + 1);
      }, 6000);
    }
  }

  function navigate(index) {
    show(index, true);
    schedule();
  }

  previous.addEventListener('click', () => navigate(active - 1));
  next.addEventListener('click', () => navigate(active + 1));
  dotButtons.forEach((dot, index) => dot.addEventListener('click', () => navigate(index)));
  pause.addEventListener('click', () => {
    paused = !paused;
    schedule();
  });
  hero.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  hero.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  hero.addEventListener('focusin', () => { focused = true; schedule(); });
  hero.addEventListener('focusout', (event) => {
    if (!hero.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  hero.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let index = active + (event.key === 'ArrowLeft' ? -1 : 1);
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = slides.length - 1;
    navigate(index);
  });
  let touchStart;
  hero.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  hero.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const distance = touch.clientX - touchStart.x;
    if (Math.abs(distance) > 40 && Math.abs(distance) > Math.abs(touch.clientY - touchStart.y)) {
      navigate(active + (distance < 0 ? 1 : -1));
    }
    touchStart = null;
  }, { passive: true });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) paused = true;
    schedule();
  });
  document.addEventListener('visibilitychange', schedule);
  hero.append(previous, next, dots, pause, status);
  show(0);
  schedule();
  return hero;
}

function section(title, className) {
  const container = element('section', className);
  container.setAttribute('aria-label', title);
  const heading = element('div', 'myaeon-section-heading');
  heading.append(element('h2', '', title));
  container.append(heading);
  return container;
}

function buildProducts(products) {
  const container = section('Featured products', 'myaeon-products');
  const track = element('ul', 'myaeon-products-track');
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Featured products, scroll to see more');
  products.forEach((product) => {
    const card = element('li', 'myaeon-product-card');
    const link = imageLink(product);
    link.querySelector('img').alt = '';
    link.append(element('h3', '', product.name), element('span', 'myaeon-product-price', product.priceText));
    card.append(link);
    track.append(card);
  });
  const controls = element('div', 'myaeon-products-controls');
  const previous = control('Scroll featured products left', '‹');
  const next = control('Scroll featured products right', '›');
  function scroll(direction) {
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }
  previous.addEventListener('click', () => scroll(-1));
  next.addEventListener('click', () => scroll(1));
  controls.append(previous, next);
  container.firstElementChild.append(controls);
  container.append(track);
  return container;
}

export default function decorate(block) {
  const categories = section('Shop by category', 'myaeon-categories');
  const categoryGrid = element('ul', 'myaeon-category-grid');
  homeContent.categories.forEach((category) => {
    const item = element('li');
    const link = element('a', 'myaeon-category-card', category.name);
    link.href = category.href;
    item.append(link);
    categoryGrid.append(item);
  });
  categories.append(categoryGrid);
  const offers = section('More ways to save', 'myaeon-offers');
  const offerGrid = element('div', 'myaeon-offer-grid');
  homeContent.offers.forEach((offer, index) => {
    const link = imageLink(offer);
    link.className = `myaeon-offer-card${index === 0 ? ' myaeon-offer-wide' : ''}`;
    offerGrid.append(link);
  });
  offers.append(offerGrid);
  block.replaceChildren(
    element('h1', 'myaeon-visually-hidden', 'myAEON2go fresh picks and everyday essentials'),
    buildHero(homeContent.promotions),
    buildProducts(homeContent.products),
    categories,
    offers,
  );
}
