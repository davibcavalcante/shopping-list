// SELECT ELEMENTS ADD-FORM
const containerForm = document.querySelector('.container-form')
const inputItem = document.querySelector('#input-item')
const inputAmount = document.querySelector('#input-amount')
const form = document.querySelector('#form')

//SELECT ELEMENTS EDIT-FORM
const containerEdit = document.querySelector('.container-edit')
const inputEditName = document.querySelector('#input-edit-name')
const inputEditAmount = document.querySelector('#input-edit-amount')
const cancelEditButton = document.querySelector('.cancel-edit-btn')
const formEdit = document.querySelector('#form-edit')

//SELECT ELEMENTS ITEMS
const containerItems = document.querySelector('.container-items')
const items = JSON.parse(localStorage.getItem('item')) || []

items.forEach((item) => {
    createNewItem(item)
})

// EVENTS

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newItem = {
        itemName: inputItem.value,
        itemAmount: inputAmount.value,
        done: false
    }

    createNewItem(newItem)
    items.push(newItem)
    updateLocalStorage()
})

containerItems.addEventListener('click', (e) => {
    const targetClick = e.target
    const targetParent = targetClick.closest('div').parentNode
    const amount = targetParent.querySelector('.amount-item')
    const name = targetParent.querySelector('.name-item')
    
    if (targetClick.classList.contains('done-btn') || targetClick.classList.contains('fa-check')) {
        targetParent.classList.toggle('done')
        const indexDone = getIndex(name)
        items[indexDone].done = targetParent.classList.contains('done')
        updateLocalStorage()
    }

    if (targetClick.classList.contains('edit-btn') || targetClick.classList.contains('fa-pen')) {
        editItem(amount, name)
    }

    if (targetClick.classList.contains('remove-btn') || targetClick.classList.contains('fa-xmark')) {
        const indexRemove = getIndex(name)
        items.splice(indexRemove, 1)
        updateLocalStorage()
        targetParent.remove()
    }
})

// FUNCTIONS

function createNewItem(item) {
    const divItem = document.createElement('div')
    divItem.classList.add('item')

    if (item.itemName != '' && item.itemAmount != '') {
        divItem.appendChild(createDivInfo(item))
        divItem.appendChild(createDivTools())
        if (item.done) {
            divItem.classList.add('done')
        }
        containerItems.appendChild(divItem)
        form.reset()
        inputItem.focus()
    }
}

function createDivInfo(item) {
    const divItemInfo = document.createElement('div')
    divItemInfo.classList.add('item-info')

    divItemInfo.appendChild(createNewItemInfo(item, 'amount-item'))
    divItemInfo.appendChild(createNewItemInfo(item, 'name-item'))

    return divItemInfo
}

function createNewItemInfo(item, classAdd) {
    const createElement = document.createElement('p')
    createElement.classList.add(classAdd)

    if (classAdd === 'amount-item') {
        createElement.innerText = item.itemAmount
    } else {
        createElement.innerText = item.itemName
    }

    return createElement
}

function createDivTools() {
    const divTools = document.createElement('div')
    divTools.classList.add('tools')

    divTools.appendChild(createButtons('done-btn'))
    divTools.appendChild(createButtons('edit-btn'))
    divTools.appendChild(createButtons('remove-btn'))

    return divTools
}


function createButtons(classAdd) {
    const button = document.createElement('button')
    if (classAdd === 'done-btn') {
        button.classList.add(classAdd)
        button.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>'
    } else if (classAdd === 'edit-btn') {
        button.classList.add(classAdd)
        button.innerHTML = '<i class="fa-sharp fa-solid fa-pen"></i>'
    } else {
        button.classList.add(classAdd)
        button.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>'
    }

    return button
}

function editItem(amount, name) {
    editModeOn()
    inputEditName.value = name.innerText
    inputEditAmount.value = amount.innerText

    cancelEditButton.addEventListener('click', (e) => {
        e.preventDefault()
        editModeOff()
    })

    formEdit.addEventListener('submit', (e) => {
        e.preventDefault()
        const indexEdit = getIndex(name)
        items[indexEdit].itemName = inputEditName.value
        items[indexEdit].itemAmount = inputEditAmount.value
        updateLocalStorage()

        name.innerText = inputEditName.value
        amount.innerText = inputEditAmount.value
        amount = ''
        name = ''
        editModeOff()
    })
}

function editModeOn() {
    containerForm.classList.add('hide')
    containerItems.classList.add('hide')
    containerEdit.classList.remove('hide')
}

function editModeOff() {
    containerEdit.classList.add('hide')
    containerForm.classList.remove('hide')
    containerItems.classList.remove('hide')
}

function getIndex(name) {
    const index = items.findIndex((item) => item.itemName === name.innerText)
    return index
}

function updateLocalStorage() {
    localStorage.setItem('item', JSON.stringify(items))
}