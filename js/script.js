
function createDivElementWidthTagName(tagName) {
    
    let div = document.createElement('div');
    div.className = tagName
    return div
}

function addTodoItem(data) {
    
    let todo = createDivElementWidthTagName("todo-item")
    let card = createDivElementWidthTagName("card")
    let cardTitle = createDivElementWidthTagName("title")

    cardTitle.innerHTML = `<h3>${data.title}</h3>`

    card.appendChild(cardTitle)

    data.item.forEach(json => {
        let subItem = createDivElementWidthTagName("sub-item")
        let subTitle = createDivElementWidthTagName("title")
        let desc = createDivElementWidthTagName("desc")

        subTitle.innerHTML = `<h3>${json.subTitle}</h3>`
        desc.innerHTML = `<h4>description:</h4><p>${json.desc}</p>`
        
        subItem.appendChild(subTitle)
        subItem.appendChild(desc)

        card.appendChild(subItem)
    })

    todo.appendChild(card)
    document.getElementsByClassName('content')[0].appendChild(todo);
}



(async function getData() {

    /* get list */
    let res = await fetch("http://5e5e2557725f320014ed10b3.mockapi.io/lists")
    let jsonData = await res.json()

    /* get task */
    jsonData.forEach(async item => {
        console.log(item.name)
        let task = await fetch(`http://5e5e2557725f320014ed10b3.mockapi.io/lists/${item.id}/tasks`)

        let jsonTask = await task.json()

        console.log(jsonTask)

        let itemArr = jsonTask.map((e) => ({subTitle: e.title, "desc": e.desc}))

        addTodoItem({
            title: item.name, 
            item: itemArr
        })
        //console.log(jsonTask)
    })
})()