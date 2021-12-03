"use strict";

const ul = document.getElementById("js-list");
const li = document.createElement("li");
const a = document.createElement("a");
const img = document.createElement("img");

a.textContent = "これです。";
a.setAttribute("href", "1.html");
img.setAttribute("src", "bookmark.png");
img.setAttribute("alt", "ブックマーク");

ul.appendChild(li).appendChild(a).prepend(img);
