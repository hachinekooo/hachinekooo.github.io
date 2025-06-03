export default (md) => {
  // 调试输出，验证插件是否被加载
  console.log('Block anchor plugin loaded');
  
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
          console.log('Found block ID:', match[1]);
          
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
            
            console.log('Added ID to', parent.type, ':', blockId);
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
              
              // 转换 #^blockId 为 #block-blockId
              const blockLinkMatch = href.match(/^#\^([a-zA-Z0-9_-]+)$/);
              if (blockLinkMatch) {
                console.log('Converting link:', href, '→', `#block-${blockLinkMatch[1]}`);
                child.attrs[hrefIndex][1] = `#block-${blockLinkMatch[1]}`;
              } 
              // 转换 #blockId (没有^前缀) 为 #block-blockId
              else if (href.startsWith('#') && !href.includes('/')) {
                const plainIdMatch = href.match(/^#([a-zA-Z0-9_-]+)$/);
                if (plainIdMatch && plainIdMatch[1] !== 'block-' + plainIdMatch[1]) {
                  console.log('Converting plain link:', href, '→', `#block-${plainIdMatch[1]}`);
                  child.attrs[hrefIndex][1] = `#block-${plainIdMatch[1]}`;
                }
              }
            }
          }
        }
      }
    }
    
    return true;
  });
};