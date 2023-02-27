truncate = function (str, length) {
  if (str.length > length) {
    return str.slice(0, length);
  } else return str;
}

drawBox = function (rawText, maxChars) {
  let lines = rawText.split('\n');
  let result = [];
  border = "+" + "-".repeat(maxChars - 2) + "+";
  result.push(border);
  for ([i, line] of lines.entries()) {
    line = truncate(line, maxChars - 4);
    line = "| " + line + " ".repeat(maxChars - 4 - line.length) + " |";
    result.push(line);
  }
  result.push(border + "\n");
  return result.join('\n');
}


fontSize = function (element) {
  let ctx = document.createElement('canvas').getContext("2d");
  ctx.font = window.getComputedStyle(element, null).getPropertyValue('font');
  console.log(ctx.measureText('a').width);
  return Math.round(ctx.measureText('a').width);
}

fillRight = function (text, totalCharWidth, char) {
  if (totalCharWidth - text.length < 0) {
    return text;
  }
  return text + char.repeat(totalCharWidth - text.length);
}

markUpText = function(node, text) {
  if (node.nodeType === 3) {
    node.parentNode.innerHTML = drawBox(node.nodeValue, text);
  } else {
    for (let child of node.childNodes) {
      markUpText(child, text);
    }
  }
}

codeBlock = function () {
  let pre = document.getElementsByTagName("pre");
  for (let i = 0; i < pre.length; i++) {
    let raw = pre[i].innerHTML;
    let fill = pre[i].offsetWidth;
    let fsz = fontSize(pre[i]);
    let charWidth = Math.round(fill / fsz);

    markUpText(pre[i], charWidth);
  }
}

hrBlock = function() {
  let hr = document.getElementsByTagName("hr");
  for (let i = 0; i < hr.length; i++) {
    let fill = hr[i].offsetWidth;
    let fsz = fontSize(hr[i]);
    let charWidth = Math.round(fill / fsz);

    hr[i].innerHTML = "_".repeat(charWidth);
  }
}

window.onload = () => {
  codeBlock();
  hrBlock();
}
