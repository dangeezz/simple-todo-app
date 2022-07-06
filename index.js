const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const $app = document.getElementById('todoapp')
const $title = document.getElementById('title')
const $description = document.getElementById('description')
const $addTask = document.getElementById('addTask')


function getTaskId(target) {
  const $taskContainer = target.closest('.task')
  const id = $taskContainer.dataset.id
  return id
}

// controllers - get data from view, update view and manipulate model
// function handleCreateTask() {
//   const title = $title.value
//   const description = $description.value

//   const clearInput = () => {
//     $title.value = $description.value = ''
//   }

//   if (title.trim() !== '') {
//     clearInput()
//     todoapp.addTask(new Task(title, description))
//     renderTaskList()
//     console.log('add: ', todoapp.taskList)
//   }
// }

// function handleCompleteTask(evt) {
//   const id = getTaskId(evt.target)

//   if (!id) return

//   const task = todoapp.taskList.find(task => task.id === id)
//   task && todoapp.toggleTaskCompletion(task)
//   renderTaskList()
//   console.log('complete: ', todoapp.taskList)
// }

// function handleDeleteTask(evt) {
//   const id = getTaskId(evt.target)

//   if (!id) return

//   todoapp.deleteTask(id)
//   renderTaskList()
//   console.log('delete: ', todoapp.taskList)
// }

// let taskList = [];

// Functionality
// function addTask(task) {
//   taskList = [task, ...taskList];
// }

// function completeTask(task, completeTask = true) {
//   task.isCompleted = completeTask
// }

// function deleteTask(id) {
//   taskList = taskList.filter(task => task.id !== id);
// }

// function updateTask(id, taskToUpdate) {
//   taskList = taskList.map(task => {
//     if (task.id === id) {
//       const newTask = { ...task, ...taskToUpdate }
//       return newTask;
//     }

//     return task;
//   })
// }

// View
function renderTaskList() {
  if (!$app) return
  $app.innerHTML = todoapp.taskList
    .map(task => {
      return /*html*/ `
      <div class="task" data-id="${task.id}">
        <input
          onchange="controllers.handleCompleteTask(event)"
          type="checkbox"
          ${task.isCompleted && 'checked'}
        />
        <div>
          <div>${task.title}</div>
          <div>${task.description}</div>
        </div>
        <button onclick="">Edit</button>
        <button onclick="controllers.handleDeleteTask(event)">delete</button>
      </div>
    `
    })
    .join('')
}

// Model
function Task(title, description) {
  this.id = generateId()
  this.title = title
  this.description = description
  this.isCompleted = false
}

Task.prototype.toggleCompletion = function () {
  this.isCompleted = !this.isCompleted
}

// Domain Functionality
const todoapp = {
  taskList: [],

  addTask(task) {
    this.taskList = [task, ...this.taskList]
  },

  toggleTaskCompletion(task) {
    task.toggleCompletion()
  },

  deleteTask(id) {
    this.taskList = this.taskList.filter(task => task.id !== id)
  },

  updateTask(id, taskToUpdate) {
    this.taskList = this.taskList.map(task => {
      if (task.id === id) {
        const newTask = { ...task, ...taskToUpdate }
        return newTask
      }

      return task
    })
  },
}

// controllers
const controllers = {
  handleCreateTask() {
    const title = $title.value
    const description = $description.value

    const clearInput = () => {
      $title.value = $description.value = ''
    }

    if (title.trim() !== '') {
      clearInput()
      todoapp.addTask(new Task(title, description))
      renderTaskList()
      console.log('add: ', todoapp.taskList)
    }
  },

  handleCompleteTask(evt) {
    const id = getTaskId(evt.target)

    if (!id) return

    const task = todoapp.taskList.find(task => task.id === id)
    task && todoapp.toggleTaskCompletion(task)
    renderTaskList()
    console.log('complete: ', todoapp.taskList)
  },

  handleDeleteTask(evt) {
    const id = getTaskId(evt.target)

    if (!id) return

    todoapp.deleteTask(id)
    renderTaskList()
    console.log('delete: ', todoapp.taskList)
  },
}


$addTask.addEventListener('click', controllers.handleCreateTask);
renderTaskList()
