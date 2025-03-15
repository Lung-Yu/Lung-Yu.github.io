import os
from pdf2image import convert_from_path
from PIL import Image, ImageDraw, ImageFont
import math

def pdf_to_image(pdf_path, output_folder, output_format='png', watermark_text=None):
    if output_format not in ['png', 'jpg']:
        raise ValueError("Output format must be 'png' or 'jpg'")
    
    # Convert PDF to images
    images = convert_from_path(pdf_path)
    
    # Save images in the specified format
    for i, image in enumerate(images):
        if watermark_text:
            draw = ImageDraw.Draw(image)
            
            # 取得圖片尺寸
            width, height = image.size
            
            # 計算文字大小目標 - 目標是讓文字寬度佔圖片寬度的25%~40%
            target_text_width_percentage = 0.35  # 設定為35% (在25%~40%範圍內)
            target_width = width * target_text_width_percentage
            
            # 使用二分搜尋法找出合適的字體大小
            font_size_min = 10
            font_size_max = 300  # 設定一個較大的上限
            font_size = 50  # 初始猜測值
            font = None
            best_font_size = font_size_min
            best_font = None
            
            # 找到一個可用的中文字體
            chinese_fonts = [
                "Arial Unicode MS", 
                "SimHei", 
                "Microsoft YaHei", 
                "PingFang TC", 
                "PingFang SC",
                "Hiragino Sans GB",
                "Heiti TC", 
                "Heiti SC",
                "STHeiti",
                "WenQuanYi Zen Hei",
                "Noto Sans CJK TC", 
                "Noto Sans CJK SC"
            ]
            
            # 嘗試系統字體路徑
            system_font_paths = [
                "/System/Library/Fonts/PingFang.ttc",
                "/System/Library/Fonts/STHeiti Light.ttc",
                "/Library/Fonts/Arial Unicode.ttf",
                "/System/Library/Fonts/Supplemental/Songti.ttc"
            ]
            
            # 先找到一個可用的字體
            font_name = None
            font_path = None
            
            # 先嘗試字體名稱
            for f_name in chinese_fonts:
                try:
                    temp_font = ImageFont.truetype(f_name, font_size)
                    font_name = f_name
                    break
                except IOError:
                    continue
            
            # 如果按名稱找不到，嘗試路徑
            if font_name is None:
                for f_path in system_font_paths:
                    try:
                        if os.path.exists(f_path):
                            temp_font = ImageFont.truetype(f_path, font_size)
                            font_path = f_path
                            break
                    except IOError:
                        continue
            
            # 使用二分搜尋法找出最適合的字體大小
            if font_name or font_path:
                # 使用找到的字體進行二分搜尋
                while font_size_min <= font_size_max:
                    font_size = (font_size_min + font_size_max) // 2
                    
                    try:
                        if font_name:
                            font = ImageFont.truetype(font_name, font_size)
                        else:
                            font = ImageFont.truetype(font_path, font_size)
                            
                        # 計算該字體大小下文字的實際寬度
                        bbox = draw.textbbox((0, 0), watermark_text, font=font)
                        actual_width = bbox[2] - bbox[0]
                        
                        # 如果文字寬度在目標範圍內 (允許5%誤差)
                        if abs(actual_width - target_width) / width < 0.05:
                            # 找到合適大小
                            best_font_size = font_size
                            best_font = font
                            break
                        
                        # 根據寬度調整搜尋範圍
                        if actual_width < target_width:
                            font_size_min = font_size + 1
                            # 更新目前最佳結果
                            if best_font is None or actual_width > (bbox[2] - bbox[0]):
                                best_font_size = font_size
                                best_font = font
                        else:
                            font_size_max = font_size - 1
                    except Exception as e:
                        print(f"字體大小 {font_size} 發生錯誤: {str(e)}")
                        font_size_max = font_size - 1
                
                # 使用找到的最佳字體
                if best_font:
                    font = best_font
                    print(f"找到最佳字體大小: {best_font_size} (目標文字寬度比例: {target_text_width_percentage*100:.1f}%)")
                elif font_name:
                    font = ImageFont.truetype(font_name, min(80, font_size_max))
                elif font_path:
                    font = ImageFont.truetype(font_path, min(80, font_size_max))
            
            # 如果上述都失敗，使用預設字體
            if font is None:
                print("無法找到支援中文的字型，使用預設字型")
                font = ImageFont.load_default().font_variant(size=max(12, min(80, int(width * 0.1))))
            
            # 取得最終文字尺寸
            bbox = draw.textbbox((0, 0), watermark_text, font=font)
            textwidth = bbox[2] - bbox[0]
            textheight = bbox[3] - bbox[1]
            
            # 報告文字佔圖寬的比例
            text_width_ratio = textwidth / width * 100
            print(f"浮水印文字寬度: {textwidth}px, 佔圖寬比例: {text_width_ratio:.1f}%")
            
            # 創建一個透明圖層用於45度旋轉文字
            txt_layer = Image.new('RGBA', (width, height), (0, 0, 0, 0))
            txt_draw = ImageDraw.Draw(txt_layer)
            
            # 計算圖片中心 - 放置主要浮水印
            center_x = width // 2 - textwidth // 2
            center_y = height // 2 - textheight // 2
            
            # 繪製紅色粗體文字到透明圖層上
            bright_red = (255, 0, 0, 255)  # 鮮紅色，完全不透明
            
            # 調整粗體效果的偏移量根據字體大小按比例縮放
            offset_scale = max(1, best_font_size // 20)
            
            # 在透明圖層上繪製粗體文字
            for offset in range(offset_scale):
                txt_draw.text((center_x-offset, center_y), watermark_text, font=font, fill=bright_red)
                txt_draw.text((center_x+offset, center_y), watermark_text, font=font, fill=bright_red)
                txt_draw.text((center_x, center_y-offset), watermark_text, font=font, fill=bright_red)
                txt_draw.text((center_x, center_y+offset), watermark_text, font=font, fill=bright_red)
            
            # 最後繪製中心位置的文字
            txt_draw.text((center_x, center_y), watermark_text, font=font, fill=bright_red)
            
            # 將文字圖層旋轉45度
            rotated_txt = txt_layer.rotate(45, expand=1, resample=Image.BICUBIC)
            
            # 調整旋轉後圖層大小，以便居中合成到原始圖像
            rotated_width, rotated_height = rotated_txt.size
            paste_x = (width - rotated_width) // 2
            paste_y = (height - rotated_height) // 2
            
            # 創建一個新的圖層用於平鋪旋轉後的浮水印
            pattern_layer = Image.new('RGBA', (width * 3, height * 3), (0, 0, 0, 0))
            
            # 將旋轉的文字在中心位置貼上
            pattern_layer.paste(rotated_txt, (pattern_layer.width // 2 - rotated_width // 2, 
                                             pattern_layer.height // 2 - rotated_height // 2), 
                               rotated_txt)
            
            # 裁剪回原始大小，但保留居中的浮水印
            crop_x = pattern_layer.width // 2 - width // 2
            crop_y = pattern_layer.height // 2 - height // 2
            final_watermark = pattern_layer.crop((crop_x, crop_y, crop_x + width, crop_y + height))
            
            # 將最終的浮水印圖層合成到原始圖像
            image = image.convert('RGBA') if image.mode != 'RGBA' else image.copy()
            image.paste(final_watermark, (0, 0), final_watermark)
        
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
    parser.add_argument('--watermark', help='Text to add as a red watermark on the images')

    args = parser.parse_args()
    
    pdf_to_image(args.pdf_path, args.output_folder, args.format, args.watermark)
