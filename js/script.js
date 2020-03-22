
function createDivElementWithTagName(tagName) {

    let div = document.createElement('div');
    div.className = tagName
    return div
}

function addTodoItem(data) {

    let todo = createDivElementWidthTagName("todo-item")
    let card = createDivElementWidthTagName("card")
    let cardTitle = createDivElementWidthTagName("title")

    cardTitle.innerHTML = `<h3>${data.title}</h3>  <button type="button" onClick="addNewItem(${data.id})">+</button> `

    card.appendChild(cardTitle)

    data.item.forEach(json => {
        let subItem = createDivElementWidthTagName("sub-item")
        let subTitle = createDivElementWidthTagName("title")
        let desc = createDivElementWidthTagName("desc")

        subTitle.innerHTML = `<h3>${json.order + ". " + json.subTitle}</h3>`
        desc.innerHTML = `<h4>description:</h4><p>${json.desc}</p>`

        subItem.appendChild(subTitle)
        subItem.appendChild(desc)

        card.appendChild(subItem)
    })

    todo.appendChild(card)
    document.getElementsByClassName('content')[0].appendChild(todo);
}

function sortTodoItem(item_list) {

    return item_list.sort(function (a, b) {

        return a.order - b.order
    })
}

async function addNewItem(listId) {
    
    let newData = await fetch(`http://5e5e2557725f320014ed10b3.mockapi.io/lists/${listId}/tasks`, { method: "POST" })
    let json = await newData.json()
    console.log("add new item (",listId,"): ",json.title)
    
    /* reload browser when update data */
    // location.reload(); 

    return json
}

(async function getData() {

    /* get list */
    let res = await fetch("http://5e5e2557725f320014ed10b3.mockapi.io/lists")
    let jsonData = await res.json()

    /* get task */
    jsonData.forEach(async item => {

        let task = await fetch(`http://5e5e2557725f320014ed10b3.mockapi.io/lists/${item.id}/tasks`)

        let itemObj = await task.json()

        /* sort item by order value */
        itemObj = sortTodoItem(itemObj)

        let itemArr = itemObj.map((e) => ({ subTitle: e.title, "desc": e.desc, "order": e.order}))

        /* add item into html code */
        addTodoItem({
            title: item.name,
            "id": item.id,
            item: itemArr
        })
        //console.log(jsonTask)
    })
})()

