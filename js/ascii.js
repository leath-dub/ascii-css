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
  const ctx = document.createElement('canvas').getContext("2d");
  ctx.font = window.getComputedStyle(element, null).getPropertyValue('font');
  return ctx.measureText('a').width;
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
    const fill = pre[i].offsetWidth;
    const fsz = fontSize(pre[i]);
    const charWidth = fill / fsz;

    markUpText(pre[i], charWidth);
  }
}

hrBlock = function() {
  let hr = document.getElementsByTagName("hr");
  for (let i = 0; i < hr.length; i++) {
    let fill = hr[i].offsetWidth;
    let fsz = fontSize(hr[i]);
    let charWidth = fill / fsz;

    hr[i].innerHTML = "_".repeat(charWidth);
  }
}

convertA = function (a) {
  const fmt = document.createElement('a');
  console.log(a.href);
  fmt.innerHTML = a.href.split('#')[1]; // href="#001" -> 001
  fmt.role = "button";
  fmt.href = a.href;
  return fmt;
}

linkDots = function () {
  const sections = document.querySelectorAll("section");
  sections.forEach(section => {
    const as = section.querySelectorAll('a');
    as.forEach(a => {
      const fill = a.parentNode.offsetWidth;
      const fsz = fontSize(a);
      const charWidth = fill / fsz;

      console.log(charWidth - a.innerHTML.length - 3);
      const append = convertA(a); // new a tag with content based on href
      const store = a.innerHTML;
      const parent = a.parentNode;

      a.remove(); // remove old a tag
      parent.innerHTML += store + " " + ".".repeat(charWidth - store.length - 3 - append.innerHTML.length - 3) + " ";
      parent.append(append);
    });
  });
}

window.onload = () => {
  codeBlock();
  hrBlock();
  linkDots();
}
