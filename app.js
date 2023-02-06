class Counter {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }
    inc() {
        this.count++;
        return this.count
    }
    dec() {
        this.count--
        return this.count
    }

}

const container = document.querySelector('.container')

// create a new cell
function createCell(name) {
    const cnt = new Counter(name);
    const cell = document.createElement("div")
    cell.setAttribute("class", `card cell ${name}`)
    const title = document.createElement("h1")
    const counter = document.createElement("h2")
    counter.innerHTML = cnt.count
    title.innerHTML = cnt.name
    const incBtn = document.createElement("button")
    incBtn.setAttribute("class", "btn btn-dark m-1")
    incBtn.innerHTML = "+"
    const decBtn = document.createElement("button")
    decBtn.innerHTML = "-"
    decBtn.setAttribute("class", "btn btn-dark m-1")
    incBtn.addEventListener("click", function() {
        cnt.inc()
        counter.innerHTML = cnt.count

    })
    decBtn.addEventListener("click", function() {
        cnt.dec()
        counter.innerHTML = cnt.count

    })


    cell.appendChild(title)
    cell.appendChild(counter)
    cell.appendChild(incBtn)
    cell.appendChild(decBtn)

    container.appendChild(cell)
    return cnt


}
// sum all the cells in the html files
function sumCells() {
    let cells = Array.from(document.querySelectorAll('.cell h2'))
    let sum = 0
    cells.forEach((c) => {
        sum += parseInt(c.innerHTML)
    })
    const info = new Map()
    for (let i = 0; i < cells.length; i++) {
        info.set(cells[i].parentElement.firstElementChild.textContent, parseInt(cells[i].innerHTML))

    }
    info.set("total", sum)
    const res = Object.fromEntries(info)
    console.log(res)
    localStorage.setItem("info", JSON.stringify(res))
    return res

}

function createNew(name) {
    const c = createCell(name)
    return c

}



const addBtn = document.querySelector('.add')
const cellInput = document.querySelector('input')
addBtn.addEventListener("click", function(e) {
    e.preventDefault()
    createNew(cellInput.value)
    cellInput.value = ""


})


//total related things
const details = document.querySelector('.details')
const total = document.createElement("b")
const close = document.querySelector('.close')
const dialog = document.querySelector('dialog')



close.addEventListener('click', (e) => {
    e.preventDefault()
    dialog.removeAttribute("open")
})

details.addEventListener("click", function(e) {
    e.preventDefault()
    const sums = sumCells()
    console.log(localStorage.getItem("info"))
    dialog.setAttribute("open", "")
    const tmp = `
    <center>
    <ul>
        ${Object.keys(sums).map((k) => "<li>" + k + ": " + sums[k] + "</li>")}
    </ul>
    </center>
    `

    // total.textContent = sumCells()
    dialog.innerHTML = tmp
    document.body.appendChild(total)

})

const cc = ["Monocyte", "Lymphocyte", "Eosinophile", "Promyelocyte", "Pnn", "Monoblaste", "Blaste", "Myelocyte", "Basophile", "Promonocyte", "Myeloblaste", "Erythroblaste", "reticulocyte", "hematie"]
cc.map((c) => {
    createCell(c)
})


