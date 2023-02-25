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

const cells = []

// create a new cell
function createCell(name) {
    const cnt = new Counter(name);
    const cell = document.createElement("div")
    cell.setAttribute("class", `card cell ${name}`)
    cell.setAttribute("draggable", true)
    const title = document.createElement("h3")
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

    cells.push(cnt.name)
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
        if (parseInt(cells[i].innerHTML) != 0) {

            info.set(cells[i].parentElement.firstElementChild.textContent, parseInt(cells[i].innerHTML))
        }

    }
    info.set("total", sum)
    const res = Object.fromEntries(info)
    console.log(res)

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
    if (cellInput.value.trim()) {
        createNew(cellInput.value)
    }
    cellInput.value = ""
    localStorage.setItem("cells", JSON.stringify(cells))


})


//total related things
const details = document.querySelector('.details')
const total = document.createElement("b")
const close = document.querySelector('.close_new')
const dialog = document.querySelector('dialog')
const new_D = document.querySelector('.new')
const new_cell = document.querySelector('.new-cell')

new_cell.addEventListener("click", function() {
    new_D.setAttribute("open", true)
})


close.addEventListener('click', (e) => {
    e.preventDefault()
    new_D.removeAttribute("open")
})

details.addEventListener("click", function(e) {
    e.preventDefault()
    const sums = sumCells()

    dialog.setAttribute("open", "")
    const tmp = `
    <center>
    <ul>
        ${Object.keys(sums).map((k) => "<li>" + k + ": " + sums[k] + "</li>")}
    </ul>
    </center>
    `

    // total.textContent = sumCells()
    localStorage.setItem("info", JSON.stringify(sums))
    dialog.innerHTML = tmp
    document.body.appendChild(total)

})


// const cc = ["Monocyte", "Lymphocyte", "Eosinophile", "Promyelocyte", "Pnn", "Monoblaste", "Blaste", "Myelocyte", "Basophile", "Promonocyte", "Myeloblaste", "Erythroblaste", "reticulocyte", "hematie"]
JSON.parse(localStorage.getItem("cells"))?.map((c) => {
    createCell(c)
})


// drag and drop
const dragabble = document.querySelectorAll('.cell')
dragabble.forEach(element => {

    element.addEventListener("dragstart", (e) => {
        console.log("dragging")
        dragged = e.target

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);

    })


    element.addEventListener("dragover", (e) => {
        e.preventDefault()
        return
    })

    element.addEventListener('drop', (e) => {
        e.preventDefault()
        if (dragged !== e.currentTarget) {
            dragged.innerHTML = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = e.dataTransfer.getData('text/html');
        }

    });
    element.addEventListener("dragend", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id)

    })
})








const logo = "___  ___           _             _     \n|  \\/  |          | |           | |    \n| .  . |  ___   __| | _ __ ___  | |__  \n| |\\/| | / _ \\ / _` || '_ ` _ \\ | '_ \\ \n| |  | ||  __/| (_| || | | | | || | | |\n\\_|  |_/ \\___| \\__,_||_| |_| |_||_| |_|\n                                       \n                                       "
console.log("%c" + logo, "color: #f3bd5a;")
