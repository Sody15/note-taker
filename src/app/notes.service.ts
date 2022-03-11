import { notesData } from './notes.data';
import { Note } from './models/note';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = [];

  selectedNote: Note | undefined;
  selectedIndex: number | undefined;

  constructor() {
    this.notes = notesData;

    this.notes = this.notes.map((n) => {
      return { ...n, display: true };
    });
  }

  addNote(note: Note) {
    // If Edit
    if (this.selectedIndex !== undefined && this.selectedNote) {
      this.notes[this.selectedIndex] = { ...note };
    } else {
      // Add new note
      this.notes = [...this.notes, { ...note }];
    }
    this.clearSelected();
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter((n) => note !== n);
  }

  clearSelected() {
    this.selectedNote = undefined;
    this.selectedIndex = undefined;
  }
}
