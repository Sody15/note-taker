import { Note } from './note/note.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { notesData } from './notes.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  displayMode: 'show' | 'add' = 'show';
  filterText: string = '';

  notes: Note[];
  selectedNote: Note | undefined;
  selectedIndex: number | undefined;

  constructor() {
    this.notes = notesData;
    this.notes = this.notes.map((n) => {
      return { ...n, display: true };
    });
  }

  showAdd() {
    // Set display mode
    this.displayMode = 'add';
    this.selectedNote = undefined;
    this.selectedIndex = undefined;
  }

  addNote(note: Note) {
    // Set display mode
    this.displayMode = 'show';

    // If editing a note
    if (this.selectedNote) {
      this.notes.forEach((n, i) => {
        if (i === this.selectedIndex) {
          this.notes[this.selectedIndex] = { ...note, display: true };
          return;
        }
      });
    } else {
      // Adding a new note
      this.notes = [...this.notes, { ...note, display: true }];
    }

    this.selectedNote = undefined;
    this.selectedIndex = undefined;
  }

  editNote(note: Note, index: number) {
    this.displayMode = 'add';
    this.selectedIndex = index;
    this.selectedNote = note;
  }

  deleteNote(note: Note) {
    this.notes = this.notes.filter((n) => note !== n);
  }

  filter() {
    if (this.filterText.length > 0) {
      let filterText = this.filterText.toUpperCase();
      this.notes = this.notes.map((n) => {
        if (
          n.title.toUpperCase().indexOf(filterText) !== -1 ||
          n.text.toUpperCase().indexOf(filterText) !== -1
        ) {
          return { ...n, display: true };
        }
        return { ...n, display: false };
      });
    } else {
      this.notes = this.notes.map((n) => {
        return { ...n, display: true };
      });
    }
  }
}
