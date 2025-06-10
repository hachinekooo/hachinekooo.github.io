import os
import json
import re
from pathlib import Path

def extract_frontmatter(content):
    """提取Markdown文件的frontmatter属性"""
    # 匹配YAML frontmatter格式 (--- 开头和结尾)
    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    match = re.match(frontmatter_pattern, content, re.DOTALL)
    
    if not match:
        return {}
    
    frontmatter_text = match.group(1)
    properties = {}
    
    # 简单解析YAML属性 (支持基本的key: value格式)
    for line in frontmatter_text.split('\n'):
        line = line.strip()
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"\'')  # 去除引号
            properties[key] = value
    
    return properties

def count_words_and_code(content):
    """分别计算Markdown内容的文字数和代码行数"""
    # 移除frontmatter
    frontmatter_pattern = r'^---\s*\n.*?\n---\s*\n'
    content_without_frontmatter = re.sub(frontmatter_pattern, '', content, flags=re.DOTALL)
    
    # 提取代码块 (```语言 到 ``` 的内容)，捕获语言类型
    code_blocks = []
    # 改进正则表达式，捕获代码块的语言类型
    code_pattern = r'```([\w]*)\n(.*?)\n```'
    
    # 需要排除的特殊代码块类型列表
    excluded_code_types = ['mermaid', 'plantuml', 'graphviz', 'chart']
    
    for match in re.finditer(code_pattern, content_without_frontmatter, re.DOTALL):
        code_type = match.group(1).strip().lower()  # 获取代码块类型并转为小写
        code_content = match.group(2)
        
        # 记录代码类型和内容
        code_blocks.append((code_type, code_content))
    
    # 移除代码块，只保留文字内容
    text_content = re.sub(code_pattern, '', content_without_frontmatter, flags=re.DOTALL)
    
    # 计算代码行数，排除特殊类型的代码块
    total_code_lines = 0
    for code_type, code_block in code_blocks:
        # 如果代码块类型在排除列表中，则跳过
        if code_type in excluded_code_types:
            continue
            
        # 统计非空行数
        lines = [line.strip() for line in code_block.split('\n') if line.strip()]
        total_code_lines += len(lines)
    
    # 计算文字数 (清理文字内容)
    text_clean = re.sub(r'[#*`\[\]()_~]', '', text_content)  # 移除Markdown标记
    text_clean = re.sub(r'https?://\S+', '', text_clean)     # 移除链接
    text_clean = re.sub(r'\s+', ' ', text_clean).strip()     # 移除多余空白
    
    # 计算中英文字数
    chinese_chars = len(re.findall(r'[\u4e00-\u9fff]', text_clean))
    english_words = len(re.findall(r'\b[a-zA-Z]+\b', text_clean))
    total_words = chinese_chars + english_words
    
    return total_words, total_code_lines

def generate_link_path(file_path, base_dir):
    """根据文件路径生成链接路径"""
    # 获取相对于base_dir的路径
    relative_path = os.path.relpath(file_path, base_dir)
    # 替换.md为.html
    html_path = relative_path.replace('.md', '.html')
    # 确保以/docs开头
    html_path = '/docs/' + html_path
    return html_path

def scan_markdown_files(directory):
    """扫描指定目录下的所有Markdown文件"""
    posts = []
    base_dir = os.path.abspath(directory)
    
    print(f"正在扫描目录: {base_dir}")
    
    # 递归遍历目录
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                print(f"处理文件: {file_path}")
                
                try:
                    # 读取文件内容
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # 提取frontmatter属性
                    properties = extract_frontmatter(content)
                    
                    # 获取必要信息
                    date = properties.get('date', '')
                    title = properties.get('title', os.path.splitext(file)[0])  # 如果没有title，使用文件名
                    
                    # 计算文字数和代码行数
                    word_count, code_lines = count_words_and_code(content)
                    
                    # 生成链接路径
                    path = generate_link_path(file_path, base_dir)
                    
                    # 验证date格式 (YYYY-MM-DD)
                    date_pattern = r'^\d{4}-\d{2}-\d{2}$'
                    if not re.match(date_pattern, date):
                        print(f"警告: 文件 {file} 的日期格式不正确: {date}")
                        continue
                    
                    post = {
                        "date": date,
                        "wordCount": word_count,
                        "codeLines": code_lines,
                        "path": path,
                        "title": title
                    }
                    
                    posts.append(post)
                    print(f"✓ 提取成功: {title} ({date}) - {word_count}字, {code_lines}行代码")
                    
                except Exception as e:
                    print(f"错误: 处理文件 {file_path} 时出错: {e}")
    
    return posts

def save_to_json(posts, output_file):
    """保存数据到JSON文件"""
    # 按日期排序
    posts.sort(key=lambda x: x['date'])
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    print(f"数据已保存到: {output_file}")

def main():
    # 配置参数
    docs_directory = "docs"  # 要扫描的目录
    output_file = "heatmap_data.json"  # 输出文件名
    
    # 检查目录是否存在
    if not os.path.exists(docs_directory):
        print(f"错误: 目录 '{docs_directory}' 不存在")
        print("请确保目录存在，或修改脚本中的 docs_directory 变量")
        return
    
    # 扫描Markdown文件
    posts = scan_markdown_files(docs_directory)
    
    if not posts:
        print("未找到任何有效的Markdown文件")
        return
    
    # 保存结果
    save_to_json(posts, output_file)
    
    print(f"\n完成! 共处理了 {len(posts)} 个文件")
    print(f"数据格式预览:")
    for post in posts[:2]:  # 显示前两条数据
        print(f"  {post}")

if __name__ == "__main__":
    main()