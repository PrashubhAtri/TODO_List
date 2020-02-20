let taskList = []

window.onload = function () {

  //Refresh List
  function RefreshList() {
    ulTasks.innerHTML = ''
    for (let task of taskList) {
      let listItem = $('<li>', {
        'class': 'list-group-item',
        text: inpNewTask.val()
      })
      listItem.click(() => {
        listItem.toggleClass('done')
      })
      ulTasks.append(listItem)
      inpNewTask.val('')
      toggleInputButtons()
    }
  }

  //add function
  function addItem(){
    taskList.push(inpNewTask.value)
    RefreshList()
    localStorage.task = taskList.join(',')
  }

  //clearing list
  function deleteAll() {
    taskList.splice(0, taskList.length)
    RefreshList()
    localStorage.removeItem("task")
  }

  //clear function for removing striked data
  function clearDone() {
    $('#ulTasks .done').remove()
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
  let clearall = document.getElementById('clearall')


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
}