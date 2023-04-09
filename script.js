
const btnEl = document.querySelector('#btn')
const appEl = document.querySelector('#app')

// 1) when button click, we want it to create new element of the class app and placeholder empty note
// but the new element should come after the parent element app but just before btn > use insertBefore
// save the element to the local storage >
// whenever text is updated in the app, it should also be updated in the local storage
// when dblClick, the click element should get alert msg and if true it should be deleted

getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btnEl)
})

function createNoteEl(id, content) {
    // console.log(id, content);
    const element = document.createElement('textarea')
    element.classList.add('note')
    element.placeholder = 'Empty Note'
    element.value = content

    element.addEventListener('dblclick', () => {
        const warning = confirm('Do you want to delete this note ?')
        if (warning) {
            deleteNote(id, element)
        }
    })

    element.addEventListener('input', () => {
        updateNote(id, element.value)
    })
    return element
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes)
    appEl.removeChild(element)
}

function updateNote(id, content) {
    const notes = getNotes()
    const target = notes.filter((note) => note.id == id)[0]
    target.content = content;
    saveNote(notes)

}

function addNote() {

    const notes = getNotes()

    const noteObj = {
        id: Math.floor(Math.random() * 100000),
        content: '',
    }
    const noteEl = createNoteEl(noteObj.id, noteObj.content)
    appEl.insertBefore(noteEl, btnEl)
    notes.push(noteObj)
    saveNote(notes)
}

function saveNote(note) {
    localStorage.setItem('note-app', JSON.stringify(note))
}

function getNotes() {
    return JSON.parse(localStorage.getItem('note-app') || '[]')
}

btnEl.addEventListener('click', addNote)