#!/bin/bash

# 設置顏色輸出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m'

# 錯誤處理函數
handle_error() {
    echo -e "${RED}錯誤: $1${NC}"
    exit 1
}

# 確保在專案根目錄
if [ ! -f "package.json" ]; then
    handle_error "請在專案根目錄執行此腳本"
fi

echo -e "${GREEN}開始部署到 GitHub Pages...${NC}"

# 確保 git 狀態是乾淨的
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}警告: 您有未提交的更改。建議先提交或暫存更改。${NC}"
    read -p "是否繼續部署? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        handle_error "部署已取消"
    fi
fi

# 使用 build-react.sh 建置專案
echo -e "${GREEN}建置專案...${NC}"
./scripts/build-react.sh || handle_error "專案建置失敗"

# 進入建置目錄
cd dist || handle_error "找不到 dist 目錄"

# 初始化 git 並提交
git init
git add -A
git commit -m "deploy: 更新 GitHub Pages"

# 設定遠端倉庫
# 獲取主倉庫的遠端 URL
REPO_URL=$(cd .. && git remote get-url origin)
git remote add origin "$REPO_URL"

# 直接推送到 gh-pages 分支
echo -e "${GREEN}推送到 GitHub Pages...${NC}"
git push -f origin HEAD:gh-pages || handle_error "推送失敗"

cd ..

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}請訪問 https://lung-yu.github.io/ 查看結果${NC}"
