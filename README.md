# ENJOY JAPAN

**Your guide to everyday life in Japan.**
日本で暮らす外国人のための生活ガイドサイトです。

東京マルチ・AI専門学校 WEBエンジニア科2年 卒業制作（032 サクリン）

## サイトの目的 / Purpose

日本のマナー、生活のルール、交通ルール、便利な日本語を、外国人にわかりやすく紹介します。
English, বাংলা (Bangla), and 日本語 are supported.

## ページ / Pages

| File | Page | Theme |
|---|---|---|
| `index.html` | Home (top page) | Red · sakura petals |
| `daily.html` | Daily Life & Manners | Sakura pink · 暮 |
| `everyday.html` | Everyday Japan | Indigo · 街 |
| `traffic.html` | Traffic & Getting Around | Navy route line · 道 |
| `culture.html` | Communication & Culture | Red seal · 和 |

## 機能 / Features

- 3つの言語の切り替え（EN / বাংলা / 日本語）。`data-en` `data-bn` `data-ja` 属性を使い、選んだ言語は `localStorage` に保存されます。
- スクロールに合わせたアニメーション（IntersectionObserver）
- 透明 → 白に変わるヘッダー、スクロール進捗バー、トップへ戻るボタン
- スマートフォン用メニュー（Escキーで閉じる）
- 日本語フレーズの「聞く」ボタン（ブラウザの音声読み上げ）
- 桜の花びら、ゆっくり動くグラデーション、青海波（せいがいは）模様
- 交通ページのチェックリスト（端末に保存）、文化ページのクイズ
- `prefers-reduced-motion`（動きを減らす設定）に対応

## 使った技術 / Built with

HTML / CSS / JavaScript（フレームワーク・ライブラリは使っていません）

## フォルダ構成 / Folder structure

```text
Enjoy-Japan/
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── (your original pictures)
│   └── web/            ← smaller copies used by the pages
├── index.html
├── daily.html
├── everyday.html
├── traffic.html
└── culture.html
```

## 画像 / Images

- Photos (hero and category cards): [Unsplash](https://unsplash.com), free Unsplash License
  - Home "Habits" section: Japanese breakfast tray (`photo-1653220329192-ce4d725d352a`)
  - Everyday Japan hero: busy Shibuya crossing (`photo-1569272955884-48ca11e03183`)
  - Culture hero: woman in kimono bowing (ojigi) (`photo-1724240953313-80567f5fa72f`)
- Traffic hero cars: drawn with SVG + CSS (no image)
- Illustrations: `images/` (originals) → `images/web/` (smaller copies the pages use, max 1200px)
- 出典を書いてください / write each image's source:

| File | Used on | Source |
|---|---|---|
| `images/dialy_life_and_manners.jpg` | daily – hero | |
| `images/web/aisatsu.jpg` | daily – greetings | |
| `images/web/gomi.jpg` | daily – garbage | |
| `images/web/shizuka.jpg` | daily – quiet in public | |
| `images/web/itadakimasu.jpg` | daily – eating | |
| `images/onsen-manners.jpg` | home, daily – onsen | |
| `images/web/conbini.jpg` | everyday – konbini | |
| `images/web/atm.jpg` | everyday – ATM | |
| `images/web/restaurant.jpg` | everyday – restaurant | |
| `images/web/pharmacy.jpg` | everyday – pharmacy | |
| `images/emergency-119.jpg` | everyday – emergency | |
| `images/web/train.jpg` | traffic – trains | |
| `images/web/cycle.jpg` | traffic – bicycles | |
| `images/web/road-crossing.jpg` | traffic – walking | |
| `images/web/escalator.jpg` | traffic – escalators | |
| `images/web/sumimasen.jpg` | culture – すみません | |
| `images/web/arigatou.jpg` | culture – ありがとう | |
| `images/web/onegaishimasu.jpg` | culture – お願いします | |
| `images/web/line.jpg` | culture – waiting in line | |
| `images/web/shops.jpg` | culture – shops | |
| `images/web/customs.jpg` | culture – customs | |
