// Script untuk generate icon PWA
// Jalankan dengan: node generate-icons.js

const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

function drawIcon(canvas, size) {
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Fork and food icon
    const centerX = size / 2;
    const centerY = size / 2;
    const scale = size / 512;

    ctx.fillStyle = 'white';
    
    // Fork handle
    ctx.fillRect(centerX - 15 * scale, centerY + 60 * scale, 30 * scale, 120 * scale);

    // Fork prongs
    const prongWidth = 25 * scale;
    const prongHeight = 170 * scale;
    const prongY = centerY - 100 * scale;

    ctx.fillRect(centerX - 60 * scale, prongY, prongWidth, prongHeight);
    ctx.fillRect(centerX - 15 * scale, prongY, prongWidth, prongHeight);
    ctx.fillRect(centerX + 30 * scale, prongY, prongWidth, prongHeight);

    // Food on fork
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 140 * scale, 45 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${80 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Cal', centerX, centerY + 164 * scale);
}

sizes.forEach(size => {
    const canvas = createCanvas(size, size);
    drawIcon(canvas, size);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icon-${size}x${size}.png`, buffer);
    console.log(`Generated icon-${size}x${size}.png`);
});

console.log('All icons generated successfully!');
