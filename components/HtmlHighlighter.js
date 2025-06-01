'use client';

import React from 'react';
// 1) Імпортуємо рендерер із dist/index.js (CJS-бандл з усіма мовами)
import SyntaxHighlighter from 'react-syntax-highlighter';
// 2) Імпортуємо стиль із dist/styles/dark.js
import darkCustom from 'react-syntax-highlighter/dist/styles/darkCustom';

export default function HtmlHighlighter({ codeString }) {
  return (
    <SyntaxHighlighter
      language="html"
      style={darkCustom}
      showLineNumbers={true}
      wrapLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
