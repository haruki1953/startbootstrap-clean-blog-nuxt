#!/bin/bash

# 设置源文件
src_file="content/post.md"

# 循环创建新的文件
for i in {1..20}
do
  cp "$src_file" "content/post$i.md"
done

echo "已成功生成！"