// ==UserScript==
// @name        changeStyle
// @namespace   Violentmonkey Scripts
// @match       https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag/related
// @grant       none
// @version     1.0
// @author      -
// @include *
// @domain google.com
// @description 2023/2/21 17:27:19
// ==/UserScript==

function loadCSS(){
    console.log("loadCSS begin");
    fetch(`http://127.0.0.1:9000/main.css`).then(res=>res.text())
      .then((text)=>{
        const mainCssNode=document.getElementById("main-css")
        if(mainCssNode) mainCssNode.remove()
        const mainCss=document.createElement("style");
        mainCss.innerHTML = text;
        mainCss.setAttribute("id", "main-css");
        document.body.append(mainCss);
        console.log("loadCSS end");
      })
  }
  
  let latestModified = ""
  function checkHead(){
    console.log("checkHead",latestModified)
    fetch(`http://127.0.0.1:9000/main.css`,{
      method: 'HEAD'
    }).then(res=>{
        const curModified = res.headers.get("last-modified");
        console.log("HEAD end: ",curModified,latestModified!=curModified)
        if(latestModified!=curModified)
          loadCSS();
        latestModified = curModified;
        setTimeout(()=>checkHead(),300);
    })
  }
  checkHead();