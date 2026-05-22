from PIL import Image, ImageDraw, ImageFont
import os

# Icon sizes needed for PWA
sizes = [72, 96, 128, 144, 152, 192, 384, 512]

def create_icon(size):
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='white')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background (purple gradient)
    for y in range(size):
        # Calculate color for this row
        ratio = y / size
        r = int(102 + (118 - 102) * ratio)
        g = int(126 + (75 - 126) * ratio)
        b = int(234 + (162 - 234) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Draw a simple food icon (circle with fork)
    center_x, center_y = size // 2, size // 2
    
    # Draw plate (circle)
    plate_radius = int(size * 0.35)
    draw.ellipse(
        [center_x - plate_radius, center_y - plate_radius,
         center_x + plate_radius, center_y + plate_radius],
        fill=(16, 185, 129),  # Green color
        outline=(255, 255, 255),
        width=max(2, size // 64)
    )
    
    # Draw fork (simplified)
    fork_width = max(2, size // 32)
    fork_height = int(size * 0.4)
    fork_x = center_x
    fork_y_start = center_y - fork_height // 2
    
    # Fork handle
    draw.rectangle(
        [fork_x - fork_width, fork_y_start + fork_height // 2,
         fork_x + fork_width, fork_y_start + fork_height],
        fill=(255, 255, 255)
    )
    
    # Fork prongs (3 prongs)
    prong_spacing = int(size * 0.08)
    prong_width = max(2, size // 48)
    prong_height = fork_height // 2
    
    for i in [-1, 0, 1]:
        prong_x = fork_x + (i * prong_spacing)
        draw.rectangle(
            [prong_x - prong_width, fork_y_start,
             prong_x + prong_width, fork_y_start + prong_height],
            fill=(255, 255, 255)
        )
    
    # Add text "Cal" at bottom
    try:
        font_size = int(size * 0.15)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    text = "Cal"
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    text_x = center_x - text_width // 2
    text_y = int(size * 0.75)
    
    draw.text((text_x, text_y), text, fill=(255, 255, 255), font=font)
    
    # Save the image
    filename = f'icon-{size}x{size}.png'
    img.save(filename, 'PNG')
    print(f'✓ Generated {filename}')

# Generate all icons
print('Generating PWA icons...\n')
for size in sizes:
    create_icon(size)

print('\n✅ All icons generated successfully!')
print('📤 Now run: git add icon-*.png && git commit -m "Add PWA icons" && git push')
