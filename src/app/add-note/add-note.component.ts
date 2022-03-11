import { Note } from './../note/note.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  form!: FormGroup;

  @Input() editNote: Note | undefined;
  @Output() saveNote = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<null>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
      this.saveNote.emit({ title: f.value.title, text: f.value.text });
    }
  }
}
