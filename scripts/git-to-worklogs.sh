#!/bin/bash

# 設定輸出檔案
OUTPUT_FILE="work_log_$(date +%Y%m%d).md"

# 清空輸出檔案（如果已存在）
echo "# 工作日誌 - 從 Git 提交記錄生成" > "$OUTPUT_FILE"
echo "生成日期：$(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 依據日期分組獲取 Git 提交記錄
echo "## 正在收集 Git 提交記錄..."

# 獲取不同的日期
DATES=$(git log --format="%ad" --date=short | sort -u)

# 為每個日期獲取提交記錄
for DATE in $DATES; do
    echo "### $DATE" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # 獲取特定日期的提交
    COMMITS=$(git log --after="$DATE 00:00:00" --before="$DATE 23:59:59" --format="* **%H** - %s%n  %an <%ae>%n  %b%n")
    
    if [ -n "$COMMITS" ]; then
        echo "$COMMITS" >> "$OUTPUT_FILE"
    else
        echo "* 無提交記錄" >> "$OUTPUT_FILE"
    fi
    
    echo "" >> "$OUTPUT_FILE"
done

echo "## 工作摘要" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "* 總提交次數：$(git log --oneline | wc -l)" >> "$OUTPUT_FILE"
echo "* 涉及文件數：$(git log --name-only --pretty=format: | sort -u | wc -l)" >> "$OUTPUT_FILE"
echo "* 提交作者：$(git log --format="%an" | sort -u | tr '\n' ', ' | sed 's/,$//')" >> "$OUTPUT_FILE"

echo "工作日誌已生成！文件名：$OUTPUT_FILE"
echo "可通過以下命令查看："
echo "cat $OUTPUT_FILE"
