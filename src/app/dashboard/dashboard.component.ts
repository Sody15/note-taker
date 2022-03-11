import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';

import { Note } from './../models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  filterText: string = '';

  notes!: Note[];

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit() {
    this.notes = this.notesService.notes;
  }

  addNote() {
    this.notesService.clearSelected();
    this.router.navigateByUrl('/add');
  }

  editNote(note: Note, index: number) {
    this.notesService.selectedNote = note;
    this.notesService.selectedIndex = index;

    this.router.navigateByUrl('/add');
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note);
    this.notes = [...this.notesService.notes];
  }

  filterNotes() {
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
