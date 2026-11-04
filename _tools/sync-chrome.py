#!/usr/bin/env python3
"""Chép header + footer dùng chung (_partials/) vào mọi trang.

Chạy từ thư mục gốc repo:  python3 _tools/sync-chrome.py
Mỗi trang đánh dấu chỗ chèn bằng cặp comment:
  <!-- octix:header -->...<!-- /octix:header -->
  <!-- octix:footer -->...<!-- /octix:footer -->
Link của trang hiện tại được gắn aria-current="page".
(Thư mục bắt đầu bằng "_" không được GitHub Pages đăng lên web.)
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = {  # file -> đường dẫn trên web
    "index.html": "/",
    "nguoi-sang-lap/index.html": "/nguoi-sang-lap/",
    "tuyen-dung/index.html": "/tuyen-dung/",
    "khoa-hoc/scratch/index.html": "/khoa-hoc/scratch/",
    "chinh-sach-bao-mat/index.html": "/chinh-sach-bao-mat/",
}

def part(name):
    return (ROOT / "_partials" / f"{name}.html").read_text(encoding="utf-8").strip()

def mark_current(html, url):
    if url == "/":
        return html
    return html.replace(f'href="{url}"', f'href="{url}" aria-current="page"')

for rel, url in PAGES.items():
    f = ROOT / rel
    s = f.read_text(encoding="utf-8")
    for name in ("header", "footer"):
        pat = re.compile(rf"(<!-- octix:{name} -->).*?(<!-- /octix:{name} -->)", re.S)
        if not pat.search(s):
            raise SystemExit(f"{rel}: thiếu dấu <!-- octix:{name} -->")
        s = pat.sub(lambda m: m.group(1) + "\n" + mark_current(part(name), url) + "\n" + m.group(2), s)
    f.write_text(s, encoding="utf-8")
    print("đã cập nhật", rel)
