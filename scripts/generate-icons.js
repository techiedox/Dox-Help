import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height, isMaskable = false) {
  // RGBA buffer: 4 bytes per pixel + 1 filter byte per scanline
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = isMaskable ? width * 0.45 : width * 0.44;
  const innerRadius = radius * 0.75;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter type None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background
      if (isMaskable) {
        // Full bleed deep dark background #121212
        let r = 18, g = 18, b = 18, a = 255;
        // Inner badge circle or stylish "D" logo
        if (dist <= innerRadius) {
          // White letter shape or emblem
          // Let's draw a bold modern "D" & "+"
          const inDOuter = (x >= cx - innerRadius*0.65 && x <= cx + innerRadius*0.5 && y >= cy - innerRadius*0.7 && y <= cy + innerRadius*0.7);
          const inDInner = (x >= cx - innerRadius*0.25 && x <= cx + innerRadius*0.15 && y >= cy - innerRadius*0.35 && y <= cy + innerRadius*0.35);
          if (inDOuter && !inDInner) {
            r = 255; g = 255; b = 255;
          }
        }
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      } else {
        // Rounded badge on transparent background
        const cornerR = width * 0.22;
        // Check rounded rect
        const rx = Math.max(0, Math.abs(dx) - (cx - cornerR));
        const ry = Math.max(0, Math.abs(dy) - (cy - cornerR));
        const cornerDist = Math.sqrt(rx * rx + ry * ry);

        if (cornerDist <= cornerR) {
          // Inside dark badge
          let r = 16, g = 16, b = 16, a = 255;
          // Border
          if (cornerDist >= cornerR - 4 || Math.abs(dx) > cx - 6 || Math.abs(dy) > cy - 6) {
            r = 255; g = 255; b = 255;
          }
          // Stylized "D+" symbol in white
          const inStem = (x >= cx - radius*0.55 && x <= cx - radius*0.25 && y >= cy - radius*0.55 && y <= cy + radius*0.55);
          const inArcOuter = (dist <= radius * 0.58 && x >= cx - radius*0.35 && y >= cy - radius*0.55 && y <= cy + radius*0.55);
          const inArcInner = (dist <= radius * 0.32 && x >= cx - radius*0.35 && y >= cy - radius*0.32 && y <= cy + radius*0.32);
          
          if (inStem || (inArcOuter && !inArcInner)) {
            r = 255; g = 255; b = 255;
          }
          rawData[pxOffset] = r;
          rawData[pxOffset + 1] = g;
          rawData[pxOffset + 2] = b;
          rawData[pxOffset + 3] = a;
        } else {
          // Transparent
          rawData[pxOffset] = 0;
          rawData[pxOffset + 1] = 0;
          rawData[pxOffset + 2] = 0;
          rawData[pxOffset + 3] = 0;
        }
      }
    }
  }

  // Deflate compressed data
  const compressedData = zlib.deflateSync(rawData);

  // PNG header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // compression
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // interlace 0
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT
  const idatChunk = createChunk('IDAT', compressedData);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(8 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  // Calculate CRC
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeUInt32BE(crc, 8 + length);
  return chunk;
}

// Simple CRC32 table & calculator
let crcTable = null;
function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    crcTable[n] = c;
  }
  return crcTable;
}

function crc32(buf) {
  const table = getCrcTable();
  let c = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    c = (c >>> 8) ^ table[(c ^ buf[i]) & 0xff];
  }
  return (c ^ (-1)) >>> 0;
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write icons
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, false));

// Also write clean SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="120" fill="#000000" />
  <rect x="24" y="24" width="464" height="464" rx="96" fill="none" stroke="#262626" stroke-width="8" />
  <path d="M160 140 H270 C340 140, 390 190, 390 256 C390 322, 340 372, 270 372 H160 Z" fill="none" stroke="#FFFFFF" stroke-width="36" stroke-linejoin="round" />
  <path d="M225 210 V302" stroke="#FFFFFF" stroke-width="32" stroke-linecap="round" />
  <path d="M305 256 H345 M325 236 V276" stroke="#FFFFFF" stroke-width="24" stroke-linecap="round" />
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPNG(64, 64, false));

console.log('Successfully generated PWA icons in /public');
