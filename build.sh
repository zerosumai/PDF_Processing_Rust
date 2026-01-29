#!/bin/bash

# PDF Toolkit 构建脚本

set -e

echo "开始构建 PDF Toolkit..."

# 构建 macOS 版本
echo ""
echo "=========================================="
echo "构建 macOS 版本 (ARM64)"
echo "=========================================="
npm run tauri build -- --target aarch64-apple-darwin

echo ""
echo "=========================================="
echo "构建完成！"
echo "=========================================="
echo ""
echo "构建产物位置："
echo "  macOS: src-tauri/target/aarch64-apple-darwin/release/bundle/"
echo ""
echo "注意：PDF 转图片功能需要用户安装 Poppler："
echo "  brew install poppler"
echo ""
