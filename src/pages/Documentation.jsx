import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import { Octokit } from "@octokit/core";

export default function Documentation() {
  const [MD, setMD] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "/documentation.html"
      );
      const data = await response.text();
      const blockQuoteRegexStart = /(<blockquote[^>]+>|<blockquote>)/g;
      const blockQuoteRegexEnd = /(<\/blockquote>)/g;
      const newDataStart = data.replace(
        blockQuoteRegexStart,
        '<div class="block">'
      );
      const newData = newDataStart.replace(blockQuoteRegexEnd, "</div>");
      setMD(newData);
    })();
  }, []);

  const parsedHTML = useRef();
  useEffect(() => {
    function insertBlock(text, type) {
      const html = ReactDOMServer.renderToStaticMarkup(
        <div className="block">
          <div className={`${type.replace(/\s/g, '')}Header`}>{type}</div>
          <p>{text}</p>
        </div>
      )
      return html
    }

    const dataHTML = parsedHTML.current.querySelectorAll("div.block");
    for (let i = 0; i < dataHTML.length; i++) {
      if (dataHTML[i].innerText.slice(0, 4) === "NOTE") {
        dataHTML[i].insertAdjacentHTML('beforebegin', insertBlock(dataHTML[i].innerText.slice(4), 'Note'))
        dataHTML[i].remove()
      } else if (dataHTML[i].innerText.slice(0, 7) === "SEEALSO") {
        dataHTML[i].insertAdjacentHTML('beforebegin', insertBlock(dataHTML[i].innerText.slice(7), 'See Also'))
        dataHTML[i].remove()
      } else if (dataHTML[i].innerText.slice(0, 7) === "WARNING") {
        dataHTML[i].insertAdjacentHTML('beforebegin', insertBlock(dataHTML[i].innerText.slice(7), 'Warning'))
        dataHTML[i].remove()
      }
    }
  }, [MD])

  return (
    <main className="documentation">
      <div dangerouslySetInnerHTML={{ __html: MD }} ref={parsedHTML}></div>
    </main>
  );
}
