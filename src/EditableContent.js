import React, { useState, useEffect } from 'react';  
import './EditableContent.css';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
const EditableContent = () => {
  const [content, setContent] = useState('');
  const handleInput = (event) => {
    setContent(event.target.textContent);
  };
  const parseMarkdown = (content) => {
    content = content.replace(/#{1,6} (.+?)\n/g, (match, p1) => {
      const headerLevel = match.trim().indexOf('#');
      const headerText = p1.trim();
      return `<h${headerLevel + 1}>${headerText}</h${headerLevel + 1}>`;
    });
    content = content.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
    content = content.replace(/\[\s?(\s|x)\s?\]/g, (match, p1, index) => {
      const isChecked = p1.trim().toLowerCase() === 'x';
      return `<input type="checkbox" ${isChecked? 'checked' : ''} onClick="handleCheckboxClick(${index})">`;
    });
    return content;
  };
  const handleCheckboxClick = (index) => {
    const newContent = content.slice(0, index) + (content[index] === 'x'? ' ' : 'x') + content.slice(index + 3);
    setContent(newContent);
    const checkbox = document.querySelector(`input[type="checkbox"]:nth-of-type(${index + 1})`);
    checkbox.classList.add('animate');
    setTimeout(() => {
      checkbox.classList.remove('animate');
    }, 300);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.execCommand('insertText', false, '\n');
    } else if (event.key === 'Tab') {
      event.preventDefault();
      document.execCommand('insertText', false, '  ');
    }
  };
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const renderContent = () => {
    return { __html: marked(parseMarkdown(content)) };
  };
  window.handleCheckboxClick = handleCheckboxClick;
  return (
    <div className="container">
      <div className="halfeditor">
        <h2>Editor</h2>
        <div
          className="editable-content"
          contentEditable={true}
          onInput={handleInput}
          onKeyDown={handleKeyPress}
          style={{ transition: 'all 0.3s ease' }} 
        ></div>
      </div>
      
      <div className="halfconverter">
        <h2>Converter</h2>
        <div 
          className="output" 
          dangerouslySetInnerHTML={renderContent()} 
          style={{ transition: 'opacity 0.3s ease' }}
        ></div>
      </div>
    </div>
  );
};

export default EditableContent;


/*
Hi sir ,
the code may be not be perfect to the level of role requirment,but i have 4 more months internship duration in the company,i need a single chance to work with you all ,please trust me, i will upskill myself and gain hands on experience to the companys requirement level.
*/