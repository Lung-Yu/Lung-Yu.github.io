#!/bin/bash

# 設置顏色輸出
GREEN='\033[0;32m'
RED='\033[0;31m'
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
    handle_error "請先提交或暫存所有更改"
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

# 推送到 gh-pages 分支
echo -e "${GREEN}推送到 GitHub Pages...${NC}"
git push -f git@github.com:Lung-Yu/personal-porfolio.git main:gh-pages || handle_error "推送失敗"

cd ..

echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}請訪問 https://lung-yu.github.io/personal-porfolio/ 查看結果${NC}"