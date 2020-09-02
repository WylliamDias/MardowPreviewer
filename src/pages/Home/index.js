import React, { useState, useEffect } from 'react';

import ReactMarkDown from 'react-markdown';

import './styles.css';

function Home() {
  const [
    markValue,
    setMarkValue
  ] = useState(localStorage.getItem('markdownValueInput') || '');
  const [ showMarkDown, setShowMarkDown ] = useState(false);

  function copyToClipboard() {
    var textAreaValue = document.querySelector("textarea");

    textAreaValue.select();
    textAreaValue.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert('Text copied to the clipboard');
  }

  useEffect(() => {
    const allLis = document.querySelectorAll('li');
    localStorage.setItem('markdownValueInput', markValue);
    if (allLis.length) {
      allLis.forEach(li => {
        let ul = li.parentElement;

        if (li?.firstChild.localName === 'input') {
          if (li.className !== 'task-list') {
            li.classList.add('task-list');
            ul.classList.add('task-list-container');
          }

        } else {
          if (li.className === 'task-list') {
            let countOfTaskLists = 0;

            li.classList.toggle('task-list');

            li.parentElement.childNodes.forEach(li => {
              if (li.className === 'task-list')
                countOfTaskLists++;
            });

            if (!countOfTaskLists) {
              ul.classList.toggle('task-list-container');
            }
          }
        }
      });
    }

  }, [ markValue ]);

  return (
    <>
      <main id="home-main">
        <div className="main-content">
          <button onClick={() => setShowMarkDown(!showMarkDown)}>
            {showMarkDown ? 'Show textarea' : 'Show markdown'}
          </button>
          <section className="text-area" style={{ display: !showMarkDown ? 'grid' : 'none' }}>
            <h3 className="section-title" style={{ position: 'relative' }}>
              Digite seu texto
              <button
                onClick={copyToClipboard}
                style={{ display: showMarkDown ? 'none' : 'block' }}
              >
                Copy to clipboard
              </button>
            </h3>
            <textarea
              id="input-area"
              cols="30"
              rows="10"
              value={markValue}
              onChange={event => setMarkValue(event.target.value)}
            >
            </textarea>
          </section>

          <section className="mark-container" style={{ display: showMarkDown ? 'grid' : 'none' }}>
            <h3 className="section-title">Markdown Previewer</h3>
            <div className="mark-prev">
              <ReactMarkDown source={markValue} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
