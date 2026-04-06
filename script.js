const notes = [
  "Ты справляешься, даже если кажется, что нет",
  "Я рядом, даже когда молчу",
  "Тебе не нужно быть сильной всё время",
  "Ты важна для меня просто потому что ты есть",
  "Всё, что ты чувствуешь — нормально",
  "Я ценю тебя сильнее, чем могу нормально сказать",
  "Ты не обязана сейчас быть идеальной",
  "Даже плохие дни не делают тебя хуже",
  "Я не хочу делать тебе тяжелее",
  "Я хочу, чтобы рядом со мной тебе было спокойнее",

  "Ты имеешь право устать",
  "Ты имеешь право не справляться сразу",
  "Ты не одна в этом состоянии",
  "Я вижу, как ты стараешься",
  "Ты сильнее, чем тебе кажется",
  "Я ценю даже твои маленькие шаги",
  "Тебе можно остановиться и выдохнуть",
  "Я хочу поддерживать тебя, а не давить",
  "Ты не обязана всё держать под контролем",
  "Ты заслуживаешь мягкого отношения",

  "Ты важнее любых ситуаций",
  "Ты не «слишком» — ты просто живая",
  "Я уважаю твои чувства",
  "Я хочу, чтобы тебе было легче",
  "Даже если всё запутано — ты не потеряна",
  "Я рядом не из-за идеальности, а из-за тебя",
  "Ты не обязана улыбаться, если не хочется",
  "Тебя можно понимать, а не исправлять",
  "Я хочу быть для тебя безопасным местом",
  "Ты не одна, даже когда кажется наоборот",

  "Ты ценная просто по факту существования",
  "Тебе можно не знать, что делать дальше",
  "Я не обесцениваю то, что ты чувствуешь",
  "Я хочу слушать тебя, а не перебивать",
  "Ты имеешь право на слабость",
  "Ты не обязана быть удобной",
  "Ты уже достаточно хорошая",
  "Я замечаю в тебе больше, чем ты сама",
  "Ты не должна справляться со всем одна",
  "Я рядом, даже если не всё получается идеально",

  "Ты заслуживаешь тепла",
  "Ты заслуживаешь понимания",
  "Я ценю твою искренность",
  "Ты имеешь право на свои границы",
  "Ты не обязана объяснять всё сразу",
  "Я хочу быть аккуратнее с тобой",
  "Ты не проблема, которую нужно решать",
  "Ты человек, которого важно беречь",
  "Я вижу твою ценность",
  "Даже в сложные моменты ты остаёшься важной",

  "Ты не обязана быть в порядке прямо сейчас",
  "Я принимаю тебя не только в хорошие дни",
  "Ты имеешь право чувствовать всё, что чувствуешь",
  "Я хочу быть рядом без давления",
  "Ты не одна, даже если тяжело",
  "Я не хочу тебя терять",
  "Ты для меня значишь больше, чем просто «кто-то»",
  "Я хочу учиться быть для тебя лучше",
  "Ты заслуживаешь заботы, а не напряжения",
  "Я ценю, что ты есть в моей жизни",

  "Ты имеешь право на паузу",
  "Я хочу поддерживать, а не спорить",
  "Ты не обязана быть сильной ради всех",
  "Я рядом, даже если ты молчишь",
  "Ты не должна всё нести одна",
  "Я хочу, чтобы тебе было чуть спокойнее",
  "Ты важна для меня, даже когда тебе тяжело"
];

const pullNoteBtn = document.getElementById('pullNoteBtn');
const shakeBtn = document.getElementById('shakeBtn');
const noteCard = document.getElementById('noteCard');
const noteText = document.getElementById('noteText');
const counter = document.getElementById('counter');
const sparkles = document.getElementById('sparkles');
const finalCard = document.getElementById('finalCard');
const jarWrap = document.querySelector('.jar-wrap');

let openedNotes = [];

function createSparkles(amount = 10) {
  const jarRect = document.querySelector('.jar').getBoundingClientRect();
  const hostRect = sparkles.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const dot = document.createElement('span');
    dot.className = 'sparkle';

    const x = jarRect.left - hostRect.left + 30 + Math.random() * (jarRect.width - 60);
    const y = jarRect.top - hostRect.top + 70 + Math.random() * (jarRect.height - 120);

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.animationDelay = `${Math.random() * 0.25}s`;

    sparkles.appendChild(dot);
    setTimeout(() => dot.remove(), 1700);
  }
}

function updateCounter() {
  counter.textContent = `Открыто записок: ${openedNotes.length} / ${notes.length}`;
}

function getRandomUnopenedNote() {
  const remaining = notes.filter(note => !openedNotes.includes(note));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}

function revealNote() {
  const note = getRandomUnopenedNote();

  if (!note) {
    noteCard.classList.remove('hidden');
    noteText.textContent = 'Все записки уже открыты. Пусть эта баночка всё равно останется маленьким тёплым местом для тебя.';
    finalCard.classList.remove('hidden');
    pullNoteBtn.disabled = true;
    pullNoteBtn.style.opacity = '0.65';
    createSparkles(16);
    return;
  }

  openedNotes.push(note);
  noteText.textContent = note;
  noteCard.classList.remove('hidden');
  updateCounter();
  createSparkles(12);

  if (openedNotes.length === notes.length) {
    finalCard.classList.remove('hidden');
    pullNoteBtn.textContent = 'Все записки открыты';
  }
}

function shakeJar() {
  jarWrap.classList.remove('shake');
  void jarWrap.offsetWidth;
  jarWrap.classList.add('shake');
  createSparkles(8);
}

pullNoteBtn.addEventListener('click', () => {
  shakeJar();
  setTimeout(revealNote, 300);
});

shakeBtn.addEventListener('click', shakeJar);

updateCounter();
