from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Create a new image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Define colors
    purple = (102, 126, 234)
    deep_purple = (118, 75, 162)
    white = (255, 255, 255)
    
    # Draw gradient background circle
    center = size // 2
    radius = int(size * 0.47)
    
    # Create gradient effect with multiple circles
    for i in range(radius, 0, -1):
        ratio = i / radius
        r = int(purple[0] * (1 - ratio) + deep_purple[0] * ratio)
        g = int(purple[1] * (1 - ratio) + deep_purple[1] * ratio)
        b = int(purple[2] * (1 - ratio) + deep_purple[2] * ratio)
        draw.ellipse([center - i, center - i, center + i, center + i], fill=(r, g, b))
    
    # Draw document shape
    doc_width = int(size * 0.45)
    doc_height = int(size * 0.61)
    doc_x = center - doc_width // 2
    doc_y = int(size * 0.195)
    
    # Document background
    draw.rounded_rectangle([doc_x, doc_y, doc_x + doc_width, doc_y + doc_height], 
                          radius=int(size * 0.03), fill=white)
    
    # Document lines
    line_height = int(size * 0.016)
    line_spacing = int(size * 0.055)
    line_width = int(doc_width * 0.83)
    line_x = doc_x + int(doc_width * 0.083)
    
    for i in range(3):
        y = doc_y + int(size * 0.156) + (i * line_spacing)
        draw.rectangle([line_x, y, line_x + line_width, y + line_height], 
                      fill=(102, 126, 234, 153))
    
    # Draw quote marks
    quote_size = int(size * 0.22)
    quote_y = center + int(size * 0.086)
    
    # Try to use a nice font, fallback to default if not available
    try:
        font = ImageFont.truetype("arial.ttf", quote_size)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", quote_size)
        except:
            font = ImageFont.load_default()
    
    # Draw quote marks
    draw.text((center, quote_y), '""', fill=(102, 126, 234), 
             font=font, anchor="mm")
    
    # Add decorative dots
    dot_radius = int(size * 0.016)
    dot_y = doc_y + doc_height - int(size * 0.078)
    
    draw.ellipse([doc_x + int(size * 0.078), dot_y - dot_radius, 
                 doc_x + int(size * 0.078) + dot_radius * 2, dot_y + dot_radius], 
                fill=deep_purple)
    draw.ellipse([doc_x + doc_width - int(size * 0.078) - dot_radius * 2, dot_y - dot_radius, 
                 doc_x + doc_width - int(size * 0.078), dot_y + dot_radius], 
                fill=deep_purple)
    
    # Save the image
    img.save(filename, 'PNG')
    print(f"Created {filename} ({size}x{size})")

if __name__ == "__main__":
    # Create icons in different sizes
    sizes = [
        (16, "icon16.png"),
        (48, "icon48.png"),
        (128, "icon128.png")
    ]
    
    for size, filename in sizes:
        create_icon(size, filename)
    
    print("\nAll icons created successfully!")
    print("Make sure to update your manifest.json to include:")
    print('"icons": {')
    print('  "16": "icon16.png",')
    print('  "48": "icon48.png",')
    print('  "128": "icon128.png"')
    print('}')
