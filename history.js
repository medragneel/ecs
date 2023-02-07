const tbs=document.querySelector('table');
const btn= document.createElement('a');
btn.setAttribute('id','crx-download-table-btn')
btn.setAttribute('class','m-2 py-4')
btn.innerHTML = 'download'
const body= document.querySelector('body')
body.appendChild(btn)




function download_table_as_csv(table_id, separator = ',') {
    // Select rows from table_id
    var rows = document.querySelectorAll('table tr');
    // Construct csv
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            // Clean innertext to remove multiple spaces and jumpline (break csv)
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
            data = data.replace(/"/g, '""');
            // Push escaped string
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    // Download it
    var filename = 'export_' + table_id + '_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



const history = JSON.parse(localStorage.getItem("info")) ?? {}

const tab = document.createElement("table")
tab.setAttribute("class","history")

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

body.appendChild(tab)


document.querySelector('#crx-download-table-btn').addEventListener('click', e => {
    e.preventDefault()
    download_table_as_csv(".history")
    
})

