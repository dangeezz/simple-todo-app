// UI or VIEW
const ui = {
  renderTaskList() {
    if (!app.$app) return
    app.$app.innerHTML = todoapp.taskList
      .map(task => {
        return /*html*/ `
            <div class="task" data-id="${task.id}">
              <input
                onchange="app.handleCompleteTask(event)"
                type="checkbox"
                ${task.isCompleted && 'checked'}
              />
              <div>
                <div>${task.title}</div>
                <div>${task.description}</div>
              </div>
              <button onclick="">Edit</button>
              <button onclick="app.handleDeleteTask(event)">delete</button>
            </div>
          `
      })
      .join('')
  },
}

// Model
class Task {
  constructor(title, description) {
    this.id = helpers.generateId()
    this.title = title
    this.description = description
    this.isCompleted = false
  }

  toggleCompletion() {
    this.isCompleted = !this.isCompleted
  }
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

const app = {
  init() {
    this.$app = document.getElementById('todoapp')
    this.$title = document.getElementById('title')
    this.$description = document.getElementById('description')
    this.$addTask = document.getElementById('addTask')

    this.$addTask.addEventListener('click', () => this.handleCreateTask())
  },

  clearInput() {
    this.$title.value = ''
    this.$description.value = ''
  },

  getInput() {
    return {
      title: this.$title.value,
      description: this.$description.value,
    }
  },

  getTaskId(target) {
    const $taskContainer = target.closest('.task')
    const id = $taskContainer.dataset.id
    return id
  },

  handleCreateTask() {
    const { title, description } = this.getInput()

    if (title.trim() !== '') {
      this.clearInput()
      todoapp.addTask(new Task(title, description))
      ui.renderTaskList()
      console.log('add: ', todoapp.taskList)
    }
  },

  handleCompleteTask(evt) {
    const id = this.getTaskId(evt.target)

    if (!id) return

    const task = todoapp.taskList.find(task => task.id === id)
    task && todoapp.toggleTaskCompletion(task)
    ui.renderTaskList()
    console.log('complete: ', todoapp.taskList)
  },

  handleDeleteTask(evt) {
    const id = this.getTaskId(evt.target)

    if (!id) return

    todoapp.deleteTask(id)
    ui.renderTaskList()
    console.log('delete: ', todoapp.taskList)
  },
}

const helpers = {
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2)
  },
}

app.init()
