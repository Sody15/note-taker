import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from '../notes.service';

import { Note } from './../models/note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  form!: FormGroup;

  editNote?: Note;

  constructor(
    private notesService: NotesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.editNote = this.notesService.selectedNote;
    this.formInit();
  }

  formInit() {
    if (this.editNote) {
      this.form = this.fb.group({
        title: [this.editNote.title, Validators.required],
        text: [this.editNote.text],
      });
    } else {
      this.form = this.fb.group({
        title: ['', Validators.required],
        text: [''],
      });
    }
  }

  save(f: FormGroup) {
    if (f.valid) {
      this.notesService.addNote({
        title: f.value.title,
        text: f.value.text,
        display: true,
      });
      this.router.navigateByUrl('/dashboard');
    }
  }
}
