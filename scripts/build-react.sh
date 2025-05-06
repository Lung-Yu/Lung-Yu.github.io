#!/bin/bash

# 設置變數
PROJECT_DIR="."
BUILD_DIR="dist"  # 改為 dist，因為 Vite 預設使用 dist
ENV_FILE=".env.production"

# 顏色設置
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

# 清理函數
cleanup() {
    echo -e "${GREEN}清理暫存檔...${NC}"
    rm -rf ./node_modules/.vite
    rm -rf ./node_modules/.tmp
}

# 錯誤處理
handle_error() {
    echo -e "${RED}錯誤: $1${NC}"
    cleanup
    exit 1
}

# 顯示執行步驟
echo -e "${GREEN}開始建置專案...${NC}"

# 清理之前的建置
rm -rf $BUILD_DIR
cleanup

# 安裝依賴
echo -e "${GREEN}安裝依賴...${NC}"
npm install || handle_error "安裝依賴失敗"

# TypeScript 型別檢查
echo -e "${GREEN}執行型別檢查...${NC}"
npx tsc --noEmit || handle_error "TypeScript 型別檢查失敗"

# 執行測試
echo -e "${GREEN}執行測試...${NC}"
npm run test || echo -e "${YELLOW}警告: 測試未通過，但繼續建置流程${NC}"

# 建置專案
echo -e "${GREEN}建置專案...${NC}"
npm run build || handle_error "建置失敗"

# 檢查建置結果
if [ ! -d "$BUILD_DIR" ]; then
    handle_error "建置目錄不存在"
fi

# 建置成功
echo -e "${GREEN}專案建置完成! 建置檔案位於: $(pwd)/$BUILD_DIR${NC}"

# 最後清理
cleanup

exit 0