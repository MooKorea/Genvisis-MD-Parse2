import React, { useState, useEffect, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import { Octokit } from "@octokit/core";

export default function Documentation() {
  const [MD, setMD] = useState([]);
  const parsedHTML = useRef();

  useEffect(() => {
    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB,
    });
    (async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/PankratzLab/Genvisis-Docs/main/README.md"
      );
      const data = await response.text();
      const githubMD = await octokit.request("POST /markdown", {
        text: data,
      });
      const blockQuoteRegexStart = /(<blockquote[^>]+>|<blockquote>)/g;
      const blockQuoteRegexEnd = /(<\/blockquote>)/g;
      const newDataStart = githubMD.data.replace(
        blockQuoteRegexStart,
        '<div class="block">'
      );
      const newData = newDataStart.replace(blockQuoteRegexEnd, "</div>");
      setMD(newData);

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
    })();
  }, []);

  return (
    <main className="documentation">
      <div dangerouslySetInnerHTML={{ __html: MD }} ref={parsedHTML}></div>
    </main>
  );
}
