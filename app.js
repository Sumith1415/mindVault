const dialogBox = document.getElementById('dialogBox');
let notes = [];

loadNotes();
renderNotes();

document.getElementById('toggleBtn').addEventListener('click', () => {
    document.body.classList.toggle('.dark-theme');
});


function save() {
    const title = document.getElementById('titleInput').value.trim();
    const content = document.getElementById('contentInput').value.trim();

    if (!(title && content)) return;

    notes.unshift({
        'id': Date.now().toString(),
        'title': title,
        'content': content
    });

    saveNotes();
    clear();
    renderNotes();
}

function saveNotes() {
    return localStorage.setItem('mindVault', JSON.stringify(notes));
}

function loadNotes() {
    return notes = JSON.parse(localStorage.getItem('mindVault')) || [];
}

function renderNotes() {
    const notesContainer = document.getElementById('notesContainer');

    if (notes.length === 0) {
        notesContainer.innerHTML = `
            <div id="emptyNote">
                <header>No Notes Yet</header>
                <div>
                    Start capturing your thoughts, ideas or reminders instantly. Your notes will appear here as soon as you create one.
                </div>
                <button type="button" onclick="openDialogBox()">
                    New Note
                </button>
            </div>
        `;
    }
    else {
        notesContainer.classList.add('notesContainerFlex');
        notesContainer.innerHTML = notes.map(note =>
            `
                <div class="note-card">
                    <div class="note-card-btn">
                        <button class="view-card" onclick="openCardDialog('${note.id}')">
                            <svg id="edit" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm263-224 37-39-37-37-38 38 38 38Z"/></svg>
                        </button>
                        <button class="delete-card" onclick="deleteNoteCardBtn('${note.id}')">
                            <svg id="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
                        </button>
                    </div>
                    <header>${note.title}</header>
                    <hr />
                    <div class="content">
                        ${note.content}
                    </div>
                </div>
            `
        ).join('');
    }

}

function clear() {
    document.getElementById('titleInput').value = '';
    document.getElementById('contentInput').value = '';
}

function deleteNoteCardBtn(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    renderNotes();
}

function openDialogBox() {
    dialogBox.showModal();
    const title = document.getElementById('titleInput');
    dialogBox.classList.add('flex');
    title.focus();
}

function closeDialogBox() {
    const formTitle = document.getElementById('formTitle');
    const title = document.getElementById('titleInput');
    const content = document.getElementById('contentInput');
    const saveBtn = document.getElementById('saveBtn');

    title.value = "";
    content.value = "";
    formTitle.innerHTML = 'Add Note';
    saveBtn.innerHTML = 'Add';
    dialogBox.classList.remove('flex');
    dialogBox.close();
}

function openCardDialog(id) {
    openDialogBox();

    const formTitle = document.getElementById('formTitle');
    const title = document.getElementById('titleInput');
    const content = document.getElementById('contentInput');
    const saveBtn = document.getElementById('saveBtn');
    let card = notes.filter(note => note.id === id);

    formTitle.innerHTML = 'Edit Note';
    title.value = card[0].title;
    content.value = card[0].content;
    saveBtn.innerHTML = 'Save';

    document.getElementById('saveBtn').addEventListener('click', () => {
        deleteNoteCardBtn(card[0].id);
        save();
        closeDialogBox();
    });

    renderNotes();
}

const adjustTextContent = () => {
    let screenwidth = window.innerWidth;
    let addNote = document.getElementById('addNote');

    if (screenwidth <= 800) {
        addNote.innerHTML = '+';
        addNote.style.fontSize = '1.4rem';
        addNote.style.padding = '.5rem .8rem';
    }
    else {
        addNote.innerHTML = '+ Add Note';
        addNote.style.fontSize = '1rem';
        addNote.style.padding = '1rem .8rem';
    }
}

window.addEventListener('load', adjustTextContent);
window.addEventListener('resize', adjustTextContent);
