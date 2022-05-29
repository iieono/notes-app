const addBtn = document.getElementById("add");
notes = JSON.parse(localStorage.getItem('notes'))

if(notes && notes != ""){
    notes.forEach(note => {
        addNewNote(note)
    })
}

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
    const noteEL = document.createElement("div");
    noteEL.classList.add("note");
    noteEL.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    const editBtn = noteEL.querySelector('.edit')
    const deleteBtn = noteEL.querySelector('.delete')
    const main = noteEL.querySelector('.main')
    const textArea = noteEL.querySelector('textarea')
    
    textArea.value = text
    // main.innerHTML = text
    main.innerHTML = marked(text)
    
    deleteBtn.addEventListener('click', () => {
        noteEL.remove()
        updateLs()
    })
    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })
    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        // main.innerHTML = value
        main.innerHTML = marked(value)

        updateLs(value)
    })

    document.body.appendChild(noteEL)
}

function updateLs(){
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    notesText.forEach(note => notes.push(note.value))

    localStorage.setItem('notes', JSON.stringify(notes))

}
