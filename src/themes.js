// Card Themes - Phase 2
const THEMES = {
  animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🦋'],
  food:    ['🍕','🍔','🌮','🍣','🍩','🎂','🍦','🍇','🍓','🍌','🥑','🌽','🍜','🥞','🧁','🍭'],
  space:   ['🚀','🌍','🌙','⭐','☄️','🛸','🌌','🔭','🪐','💫','🌠','🛰️','👨‍🚀','🌞','🌟','🌈'],
  sports:  ['⚽','🏀','🎾','🏈','⚾','🏐','🎱','🏓','🥊','🏊','🚴','🤸','⛷️','🎿','🏋️','🤺'],
  tech:    ['💻','📱','🖥️','⌨️','🖱️','📡','🔋','💾','📷','🎮','🕹️','📺','☎️','📻','🔌','💡'],
  custom:  [] // filled by user uploads
};

let activeTheme = 'animals';
let customImages = JSON.parse(localStorage.getItem('memoryCustomImages') || '[]');
if (customImages.length > 0) THEMES.custom = customImages;

function getThemeEmojis(theme, count) {
  const pool = THEMES[theme] || THEMES.animals;
  return pool.slice(0, count);
}

function addCustomImage(dataUrl) {
  if (THEMES.custom.length < 16) {
    THEMES.custom.push(dataUrl);
    customImages = THEMES.custom;
    localStorage.setItem('memoryCustomImages', JSON.stringify(customImages));
  }
}

function clearCustomImages() {
  THEMES.custom = []; customImages = [];
  localStorage.removeItem('memoryCustomImages');
}
