// Pollinations AI Image Integration - API v0.3.0
// Base URL: https://gen.pollinations.ai
// Docs: https://enter.pollinations.ai/api/docs
const POLLINATIONS_TOKEN = 'sk_XAwK4NoIzJVceQNqn1SG22oDgJPkkMYA';
const POLLINATIONS_BASE = 'https://gen.pollinations.ai/image/';

function getPollinationsUrl(prompt, width = 80, height = 80, seed = null) {
  const encoded = encodeURIComponent(prompt);
  let url = `${POLLINATIONS_BASE}${encoded}?width=${width}&height=${height}&nologo=true&key=${POLLINATIONS_TOKEN}`;
  if (seed !== null) url += `&seed=${seed}`;
  return url;
}

// AI image prompts per theme card slot
const aiThemePrompts = {
  animals: [
    'cute cartoon cat face, small icon', 'cute cartoon dog face, small icon', 'cartoon rabbit face, small icon',
    'cartoon fox face, small icon', 'cartoon bear face, small icon', 'cartoon elephant face, small icon',
    'cartoon tiger face, small icon', 'cartoon panda face, small icon'
  ],
  food: [
    'pixel art pizza slice, small icon', 'pixel art burger, small icon', 'pixel art sushi roll, small icon',
    'pixel art taco, small icon', 'pixel art donut, small icon', 'pixel art ramen bowl, small icon',
    'pixel art ice cream, small icon', 'pixel art strawberry cake, small icon'
  ],
  space: [
    'cartoon rocket ship, small icon', 'cartoon planet Saturn, small icon', 'cartoon moon face, small icon',
    'cartoon alien, small icon', 'cartoon meteor, small icon', 'cartoon astronaut helmet, small icon',
    'cartoon galaxy swirl, small icon', 'cartoon star cluster, small icon'
  ],
  sports: [
    'cartoon soccer ball, small icon', 'cartoon basketball, small icon', 'cartoon tennis racket, small icon',
    'cartoon baseball, small icon', 'cartoon football helmet, small icon', 'cartoon swimming, small icon',
    'cartoon bicycle, small icon', 'cartoon boxing gloves, small icon'
  ],
  tech: [
    'cute cartoon laptop, small icon', 'cute cartoon robot face, small icon', 'cute cartoon gamepad, small icon',
    'cute cartoon cpu chip, small icon', 'cute cartoon smartphone, small icon', 'cute cartoon satellite, small icon',
    'cute cartoon drone, small icon', 'cute cartoon VR headset, small icon'
  ]
};

const aiCardImages = {};

async function loadAICardImages(theme, count = 8) {
  const prompts = aiThemePrompts[theme];
  if (!prompts) return;
  aiCardImages[theme] = aiCardImages[theme] || {};
  for (let i = 0; i < Math.min(count, prompts.length); i++) {
    if (aiCardImages[theme][i]) continue;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
      img.src = getPollinationsUrl(prompts[i], 80, 80, i * 13 + theme.length);
    });
    aiCardImages[theme][i] = img;
    console.log(`[Pollinations] Loaded card image ${theme}[${i}]`);
  }
  window.aiCardImages = aiCardImages;
}

window.loadAICardImages = loadAICardImages;
window.getPollinationsUrl = getPollinationsUrl;
window.aiThemePrompts = aiThemePrompts;

// Preload default theme on load
loadAICardImages('animals');
