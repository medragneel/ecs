
const history = JSON.parse(localStorage.getItem("info")) ?? {}

const tab = document.createElement("table")

const tr1 = document.createElement("tr")
const th1 = document.createElement("th")
th1.textContent = "cells"
const th2 = document.createElement("th")
th2.textContent = "count"
tr1.appendChild(th1)
tr1.appendChild(th2)
function createTable(k, v) {
    const tr2 = document.createElement("tr")
    const td1 = document.createElement("td")
    td1.textContent = k
    const td2 = document.createElement("td")
    td2.textContent = v
    tr2.appendChild(td1)
    tr2.appendChild(td2)
    tab.appendChild(tr1)
    tab.appendChild(tr2)

}

for (const [key, value] of Object.entries(history)) {
    createTable(key, value)

}

document.body.appendChild(tab)


