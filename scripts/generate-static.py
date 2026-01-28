#!/usr/bin/env python3
"""
Generate static HTML files for Bluehost deployment
"""

import os
import shutil
import json
from pathlib import Path

# Project paths
project_root = Path(__file__).parent.parent
app_root = project_root / "app"
data_dir = project_root / "data" / "quizzes"
out_dir = project_root / "out"
public_dir = project_root / "public"

# Pages to generate
pages = {
    "index.html": "Home",
    "about/index.html": "About",
    "sources/index.html": "Sources",
    "bg/index.html": "Bhagavad Gita",
    "sb/index.html": "Srimad Bhagavatam",
}

def create_out_directory():
    """Create the out directory structure"""
    if out_dir.exists():
        shutil.rmtree(out_dir)
    
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"✅ Created out directory: {out_dir}")

def copy_static_assets():
    """Copy public assets to out folder"""
    if public_dir.exists():
        for item in public_dir.iterdir():
            if item.is_file():
                shutil.copy2(item, out_dir / item.name)
    print(f"✅ Copied static assets")

def generate_html_placeholder(page_name):
    """Generate a simple HTML placeholder"""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{page_name} - Vedabase Quiz</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }}
        .container {{
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #333;
            margin-bottom: 20px;
        }}
        .info {{
            background: #e3f2fd;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #2196F3;
            margin: 20px 0;
        }}
        a {{
            color: #2196F3;
            text-decoration: none;
        }}
        a:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{page_name}</h1>
        <div class="info">
            <p>This is a static version of the Vedabase Quiz application deployed on Bluehost.</p>
            <p>The full interactive version requires Node.js hosting.</p>
        </div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about/">About</a></li>
                <li><a href="/sources/">Sources</a></li>
                <li><a href="/bg/">Bhagavad Gita Quizzes</a></li>
                <li><a href="/sb/">Srimad Bhagavatam Quizzes</a></li>
            </ul>
        </nav>
    </div>
</body>
</html>"""

def create_pages():
    """Create HTML pages"""
    for page_path, page_name in pages.items():
        full_path = out_dir / page_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        
        html_content = generate_html_placeholder(page_name)
        full_path.write_text(html_content)
        print(f"✅ Generated {page_path}")

def create_404():
    """Create a 404 page"""
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f5f5f5;
            text-align: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 48px;
            color: #d32f2f;
            margin: 0;
        }
        p {
            color: #666;
            margin: 20px 0;
        }
        a {
            color: #2196F3;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Page Not Found</p>
        <p>The page you're looking for doesn't exist.</p>
        <p><a href="/">Back to Home</a></p>
    </div>
</body>
</html>"""
    
    (out_dir / "404.html").write_text(html_content)
    print(f"✅ Generated 404.html")

def main():
    print("🚀 Generating static HTML for Bluehost\n")
    
    create_out_directory()
    copy_static_assets()
    create_pages()
    create_404()
    
    print(f"\n✅ Static site generated successfully!")
    print(f"📁 Output directory: {out_dir}")
    print(f"📦 Ready to deploy to Bluehost!")
    print(f"\nUpload contents of the 'out' folder to your Bluehost public_html directory.")

if __name__ == "__main__":
    main()
