# Learn Planning - 開発用コマンド

.PHONY: help install dev build start clean setup db-start db-reset

help: ## このヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## 依存関係をインストール
	pnpm install

setup: ## プロジェクトの初期セットアップ
	pnpm setup

dev: ## 開発サーバーを起動（Next.js + JSON Server）
	pnpm dev:full

dev-next: ## Next.jsのみ起動
	pnpm dev

db-start: ## JSON Serverのみ起動
	pnpm db:start

db-reset: ## データベースを初期状態にリセット
	pnpm db:reset

build: ## プロダクションビルド
	pnpm build

start: ## プロダクションサーバー起動
	pnpm start

clean: ## キャッシュとnode_modulesを削除
	rm -rf .next
	rm -rf node_modules
	rm -rf .pnpm-store
	pnpm store prune

type-check: ## TypeScriptの型チェック
	pnpm type-check

lint: ## ESLintでコードチェック
	pnpm lint

images: ## 画像セットアップ
	pnpm setup:images
