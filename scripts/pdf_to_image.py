import os
from pdf2image import convert_from_path
from PIL import Image

def pdf_to_image(pdf_path, output_folder, output_format='png'):
    if output_format not in ['png', 'jpg']:
        raise ValueError("Output format must be 'png' or 'jpg'")
    
    # Convert PDF to images
    images = convert_from_path(pdf_path)
    
    # Save images in the specified format
    for i, image in enumerate(images):
        output_path = os.path.join(output_folder, f'page_{i + 1}.{output_format}')
        if output_format == 'jpg':
            image = image.convert('RGB')
        image.save(output_path, 'JPEG' if output_format == 'jpg' else output_format.upper())
        print(f'Page {i + 1} saved as {output_path}')

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Convert PDF to PNG or JPG images.')
    parser.add_argument('pdf_path', help='Path to the PDF file')
    parser.add_argument('output_folder', help='Folder to save the output images')
    parser.add_argument('--format', choices=['png', 'jpg'], default='png', help='Output image format (default: png)')

    args = parser.parse_args()
    
    pdf_to_image(args.pdf_path, args.output_folder, args.format)
