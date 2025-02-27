from PIL import Image
import os

def resize_images(input_folder, output_folder, sizes):
    # 如果輸出資料夾不存在，則創建
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 讀取資料夾中的所有圖片
    for filename in os.listdir(input_folder):
        file_path = os.path.join(input_folder, filename)

        # 只處理圖片檔案
        if os.path.isfile(file_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            try:
                # 打開圖片
                with Image.open(file_path) as img:
                    # 為每個尺寸進行處理
                    for size in sizes:
                        resized_img = img.resize(size)
                        # 根據尺寸在檔名後面加上相應標註
                        output_filename = f"{os.path.splitext(filename)[0]}_{size[0]}px_{size[1]}px{os.path.splitext(filename)[1]}"
                        output_path = os.path.join(output_folder, output_filename)
                        resized_img.save(output_path)
                        print(f"已儲存圖片: {output_path}")
            except Exception as e:
                print(f"無法處理圖片 {filename}: {e}")

# 設定來源資料夾與目標資料夾
input_folder = r'D:\Users\Y09704\Desktop\img'  # 請更改為你的圖片資料夾路徑
output_folder = r'D:\Users\Y09704\Desktop\img'  # 請更改為儲存調整後圖片的資料夾路徑

# 設定要調整的尺寸
sizes = [(800, 800), (375, 375)]

# 執行圖片大小調整
resize_images(input_folder, output_folder, sizes)
