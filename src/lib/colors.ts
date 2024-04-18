type RGBA = [number, number, number, number]

function randomNumber(min: number = 0, max: number = 255) {
  if (min > max) throw new Error('Invalid range: min must be less than or equal to max');
  const range = max - min
  return Math.floor(min + (Math.random() * range))
}

export function generateRGB(): RGBA {
  const r = randomNumber(10, 50)
  const g = randomNumber(90, 180)
  const b = randomNumber(180, 205)
  const a = randomNumber(60, 90) / 100
  return [r < 256 ? r : 255, g < 256 ? g : 255, b < 256 ? b : 255, a]
}

function getMiddleColor(color1: RGBA, color2: RGBA): RGBA {
  const [r1, g1, b1, a1] = color1
  const [r2, g2, b2, a2] = color2

  const color3: RGBA = [Math.floor((r1 * r2) / 2), Math.floor((g1 * g2) / 2), Math.floor((b1 * b2) / 2), Math.floor((a1 * a2) / 2)]

  return color3
}

export function generateGradient() {
  const color1 = generateRGB()
  const color3 = generateRGB()
  const color2 = getMiddleColor(color1, color3)
  const degree = randomNumber(0, 180)
  return `linear-gradient(${degree}deg, rgba(${color1.join(",")}) 0%, rgba(${color3.join(",")}) 50%, rgba(${color2.join(",")}) 100%)`
}


function getComplementaryColor(rgbaColor: RGBA): RGBA {
  // Convert RGB to HSL
  const [r, g, b, a = 1] = rgbaColor;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const ch = (max - min) / 2;
  let h = Math.atan2(g - b, r - g) / (2 * Math.PI) * 360;
  if (h < 0) {
    h += 360;
  }

  // Adjust hue for complementary color
  h = (h + 180) % 360;

  // Convert HSL back to RGB
  const s = (ch === 0) ? 0 : (max - min) / ch;
  const l = (max + min) / 2;
  const hslToRGB = (h: number, s: number, l: number): number[] => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    const r1 = m + x;
    const g1 = m + (x * (1 - 2 / 3));
    const b1 = m - x;
    return [r1 * 255, g1 * 255, b1 * 255];
  };
  const [newR, newG, newB] = hslToRGB(h, s, l);

  // Retain alpha value
  const newAlpha = a;

  return [newR, newG, newB, newAlpha]
}