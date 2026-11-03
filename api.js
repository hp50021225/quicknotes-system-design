const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const loadBtn = document.getElementById('load-btn');
const statusEl = document.getElementById('status');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const submitBtn = document.getElementById('submit-btn');
const notesList = document.getElementById('notes-list');

async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
}

function showStatus(message, type = 'success') {
    statusEl.textContent = message;
    statusEl.className = `status-message ${type}`;
}

async function loadNotes() {
    loadBtn.disabled = true;
    showStatus('Loading notes...', 'loading');
    notesList.innerHTML = '';

    try {
        const notes = await request(`${API_URL}?_limit=10`);
        
        if (!notes || notes.length === 0) {
            showStatus('No notes found.', 'error');
            notesList.innerHTML = '<li>No notes available.</li>';
            return;
        }

        showStatus('Loaded 10 notes from the server.', 'success');
        renderNotes(notes);
    } catch (error) {
        showStatus('Failed to load notes. Please try again later.', 'error');
    } finally {
        loadBtn.disabled = false;
    }
}

function renderNotes(notes) {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.setAttribute('data-id', note.id);

        const h3 = document.createElement('h3');
        h3.textContent = note.title;

        const p = document.createElement('p');
        p.textContent = note.body;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteNote(note.id, li));

        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

async function createNote(event) {
    event.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title) {
        showStatus('Title is required.', 'error');
        return;
    }
    if (title.length > 100) {
        showStatus('Title must be under 100 characters.', 'error');
        return;
    }

    submitBtn.disabled = true;
    showStatus('Creating note...', 'loading');

    try {
        const newNoteData = { title, body, userId: 1 };
        const createdNote = await request(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNoteData)
        });

        showStatus(`Note created (status 201, id ${createdNote.id || 101}).`, 'success');
        
        const li = document.createElement('li');
        li.setAttribute('data-id', createdNote.id || 101);

        const h3 = document.createElement('h3');
        h3.textContent = title;

        const p = document.createElement('p');
        p.textContent = body;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteNote(createdNote.id || 101, li));

        li.appendChild(h3);
        li.appendChild(p);
        li.appendChild(deleteBtn);
        notesList.prepend(li);

        noteForm.reset();
    } catch (error) {
        showStatus('Failed to create note.', 'error');
    } finally {
        submitBtn.disabled = false;
    }
}

async function deleteNote(id, listItem) {
    // Note: JSONPlaceholder simulates DELETE successfully but does not permanently mutate server data. 
    // We handle local item removal to preserve a smooth client-side reactive experience.
    try {
        await request(`${API_URL}/${id}`, { method: 'DELETE' });
        listItem.remove();
        showStatus(`Note ${id} deleted successfully.`, 'success');
        
        if (notesList.children.length === 0) {
            showStatus('No notes remaining.', 'error');
        }
    } catch (error) {
        showStatus(`Failed to delete note ${id}.`, 'error');
    }
}

loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);