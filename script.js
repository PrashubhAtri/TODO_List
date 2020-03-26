let taskList = []
let Removed = []

$(() => {

  //Refresh List
  function RefreshList() {
    ulTasks.html("");
    for (let task of taskList) {
      // console.log(task)
      let listItem = $('<li>', {
        'class': 'list-group-item',
        text: task
      })
      // console.log((listItem.text()))
      listItem.click(() => {
        listItem.toggleClass('done')
        Removed.push(listItem.text())
        let idx =taskList.indexOf(listItem.text())
        taskList.splice(idx,1)
      })
      ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()
    }
  }

  //add function
  function addItem(){
    taskList.push(inpNewTask.val())
    RefreshList()
    localStorage.task = taskList.join(',')
  }

  //clearing list
  function deleteAll() {
    taskList.splice(0, taskList.length)
    Removed.splice(0, Removed.length)
    RefreshList()
    localStorage.removeItem("task")
  }

  //clear function for removing striked data
  function clearDone() {
    $('#ulTasks .done').remove()
    Removed.splice(0, Removed.length)
    localStorage.task = taskList.join(',')
    RefreshList()
    toggleInputButtons()
  }

  //sepreting done and not done task
  function sortTasks() {
    $('#ulTasks .done').appendTo(ulTasks)
  }


  //designing btns
  function toggleInputButtons() {
    btnReset.prop('disabled', inpNewTask.val() == '')
    btnAdd.prop('disabled', inpNewTask.val() == '')
    btnSort.prop('disabled', ulTasks.children().length < 1)
    btnCleanup.prop('disabled', ulTasks.children().length < 1)
  }

  //getting elements
  let ulTasks = $('#ulTasks')
  let btnAdd = $('#btnAdd')
  let btnReset = $('#btnReset')
  let btnSort = $('#btnSort')
  let btnCleanup = $('#btnCleanup')
  let inpNewTask = $('#inpNewTask')
  let clearall = $('#clearall')


  //handling enter key
  inpNewTask.keypress((e) => {
    if (e.which == 13) addItem()
  })
  inpNewTask.on('input', toggleInputButtons)

  //handling already existing elments
  if (localStorage.task) {
    taskList = localStorage.task.split(',')
  }
  RefreshList()

  //handling clicks on custom btns
  btnAdd.click(addItem)
  btnReset.click(() => {
    inpNewTask.val('')
    toggleInputButtons()
  })
  btnCleanup.click(clearDone)
  btnSort.click(sortTasks)
  clearall.click (deleteAll)
})