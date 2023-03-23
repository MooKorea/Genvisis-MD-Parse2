const fs = require("node:fs");

const MDMainFolder = fs.readdirSync("./markdown-content");
MDMainFolder.forEach(e => {
    const contents = fs.readdirSync(`./markdown-content/${e}`)
    contents.forEach(r => {
        console.log(fs.readFileSync(`./markdown-content/${e}/${r}`,"utf-8"))
    })
})