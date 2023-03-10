import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";

export default function Documentation() {
  
  const [MD, setMD] = useState([]);
  
  useEffect(() => {
    const octokit = new Octokit();
    (async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/PankratzLab/Genvisis-Docs/main/README.md"
      );
      const data = await response.text();
      const githubMD = await octokit.request("POST /markdown", {
        text: data,
      });
      setMD(githubMD.data);
    })();
  }, []);

  return (
    <main className="documentation">
      <div dangerouslySetInnerHTML={{ __html: MD }}></div>
    </main>
  );
}
