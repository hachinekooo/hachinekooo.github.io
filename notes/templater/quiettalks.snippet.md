---
title: 
icon: pen-nib
order: 
date: <% tp.date.now("YYYY-MM-DD") %>
category:
  - 日记
tags:
---
<%*
let today = tp.date.now("YYYY-MM-DD")
let momentDate = window.moment(today, "YYYY-MM-DD", true)
let titleName = momentDate.format("YYYY-MM-DD")
let year = momentDate.format("YYYY")
let month = momentDate.format("MM")
-%>
---

## 3 things worth it

 
 

---

## One thing you could do better next week




## Thinking what

<%*
let destDir = "docs/quiettalks/" + year + "/" + month
await tp.file.move(destDir + "/" + titleName)
tp.file.cursor()
-%>
