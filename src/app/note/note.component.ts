import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface Note {
  title: string;
  text: string;
  display?: boolean;
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: Note | undefined;
  @Output() edit = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<Note>();
  showDelete = false;
}
