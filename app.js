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
function sumCells() {
    let cells = Array.from(document.querySelectorAll('.cell h2'))
    let sum = 0
    let info = Object.create({})
    cells.forEach((c) => {
        sum += parseInt(c.innerHTML)
        info.c = parseInt(c.innerHTML)
        info.total = sum
    })
    console.log(info)
    return sum

}



const c1 = createCell("cell-1")
const c2 = createCell("cell-2")
const c3 = createCell("cell-3")
const c4 = createCell("cell-4")
const c5 = createCell("cell-5")
const c6 = createCell("cell-6")
const c7 = createCell("cell-7")
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
    dialog.setAttribute("open", "")
    const tmp=`
    <center>
    <p>total: ${sumCells()}</p>
    </center>
    `

    // total.textContent = sumCells()
    dialog.innerHTML = tmp
    document.body.appendChild(total)
    console.log(total.outerHTML)

})


