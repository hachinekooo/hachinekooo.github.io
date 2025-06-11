export default (md) => {
  
  // 块标识符正则表达式 - 捕获行尾的块标识
  const blockIdRegex = /\s+\^([a-zA-Z0-9_-]+)$/;

  // 为块标识符添加处理规则
  md.core.ruler.after('inline', 'block_anchors', state => {
    const tokens = state.tokens;
    
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'inline' && tokens[i].content) {
        const content = tokens[i].content;
        const match = content.match(blockIdRegex);
        
        if (match) {
          
          // 移除块标识符
          tokens[i].content = content.replace(blockIdRegex, '');
          
          // 查找父容器
          let parentIdx = i;
          while (parentIdx >= 0 && 
                !['paragraph_open', 'heading_open', 'blockquote_open', 'list_item_open'].includes(tokens[parentIdx].type)) {
            parentIdx--;
          }
          
          if (parentIdx >= 0) {
            const blockId = `block-${match[1]}`;
            const parent = tokens[parentIdx];
            
            // 添加ID属性到父元素
            const idIdx = parent.attrIndex('id');
            if (idIdx < 0) {
              parent.attrPush(['id', blockId]);
            } else {
              parent.attrs[idIdx][1] = blockId;
            }
          }
        }
      }
    }
    
    return true;
  });

  // 处理所有可能包含链接的token类型
  md.core.ruler.after('block_anchors', 'fix_block_links', state => {
    const tokens = state.tokens;
    
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'inline') {
        // 查找该inline token的所有子token
        const children = tokens[i].children || [];
        
        for (let j = 0; j < children.length; j++) {
          const child = children[j];
          
          // 检查链接token
          if (child.type === 'link_open') {
            const hrefIndex = child.attrIndex('href');
            
            if (hrefIndex >= 0) {
              const href = child.attrs[hrefIndex][1];
              
              // 处理 #^blockId 格式 (^ 字符可能已编码为 %5E)
              if (href.startsWith('#^')) {
                const blockId = href.substring(2); // 移除 #^ 前缀
                console.log('Converting link:', href, '→', `#block-${blockId}`);
                child.attrs[hrefIndex][1] = `#block-${blockId}`;
              } 
              // 处理 #%5EblockId 格式 (^ 被编码为 %5E)
              else if (href.startsWith('#%5E')) {
                const blockId = href.substring(4); // 移除 #%5E 前缀
                child.attrs[hrefIndex][1] = `#block-${blockId}`;
              }
              // 处理跨文档链接中的块标识 (包括编码和非编码版本)
              else if (href.includes('#^') || href.includes('#%5E')) {
                let parts;
                if (href.includes('#^')) {
                  parts = href.split('#^');
                } else {
                  parts = href.split('#%5E');
                }
                const path = parts[0];
                const blockId = parts[1];
                child.attrs[hrefIndex][1] = `${path}#block-${blockId}`;
              }
              // 转换 #blockId (没有^前缀) 为 #block-blockId
              else if (href.startsWith('#') && !href.includes('/') && !href.startsWith('#block-')) {
                const blockId = href.substring(1); // 移除 # 前缀
                child.attrs[hrefIndex][1] = `#block-${blockId}`;
              }
            }
          }
        }
      }
    }
    
    return true;
  });
};