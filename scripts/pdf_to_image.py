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
            
            # 計算斜對角位置 - 只在對角線上繪製浮水印
            # 計算文字間距，以確保在對角線上有適當數量的文字
            num_watermarks = 1  # 對角線上的浮水印數量
            
            # 計算對角線長度
            diagonal_length = math.sqrt(width**2 + height**2)
            
            # 根據對角線長度和浮水印數量計算間隔
            spacing = diagonal_length / (num_watermarks + 1)
            
            # 計算對角線角度 (從左上到右下)
            angle = math.atan2(height, width)
            
            # 繪製斜對角浮水印
            bright_red = (255, 0, 0)  # 鮮紅色
            
            for j in range(1, num_watermarks + 1):
                # 計算對角線上的位置
                diagonal_pos = j * spacing
                
                # 轉換為x, y坐標
                x = int(diagonal_pos * math.cos(angle)) - textwidth // 2
                y = int(diagonal_pos * math.sin(angle)) - textheight // 2
                
                # 確保坐標在圖片內
                x = max(10, min(x, width - textwidth - 10))
                y = max(10, min(y, height - textheight - 10))
                
                # 調整粗體效果的偏移量根據字體大小按比例縮放
                offset_scale = max(1, best_font_size // 20)  # 根據字體大小調整偏移量
                
                # 增強粗體效果 - 多次疊加相近位置的文字
                for offset in range(offset_scale):
                    draw.text((x-offset, y), watermark_text, font=font, fill=bright_red)
                    draw.text((x+offset, y), watermark_text, font=font, fill=bright_red)
                    draw.text((x, y-offset), watermark_text, font=font, fill=bright_red)
                    draw.text((x, y+offset), watermark_text, font=font, fill=bright_red)
                
                # 最後繪製中心位置的文字
                draw.text((x, y), watermark_text, font=font, fill=bright_red)
        
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
