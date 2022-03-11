import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Router } from '@angular/router';
import { NotesService } from '../notes.service';

import { Note } from './../models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('popAnimation', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingRight: '*',
            paddingLeft: '*',
          })
        ),
        animate(200),
      ]),
      transition(':leave', [
        animate(50, style({ transform: 'scale(1.05)' })),
        animate(50, style({ tranform: 'scale(1)', opacity: 0.75 })),
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.68)',
            opacity: 0,
          })
        ),
        animate(
          '150ms ease-out',
          style({
            height: 0,
            opacity: 0,
            'margin-bottom': 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),
  ],
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
