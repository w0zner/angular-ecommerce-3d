import { Component, OnInit } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';
import { Note } from '../interfaces/note.interface';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  nota: string = ""
  notes: Note[] = []
  isSaving=false
  isLoading=false
  isEditing=false
  notaEditar: Note | undefined

  constructor(private notasService: NotasService) {
  }

  ngOnInit(): void {
    this.obtenerNotas()
  }

  agregar() {
    if(this.nota !== "") {
      this.isSaving = true
      if(this.isEditing) {
        if(this.notaEditar!==undefined) {
          this.notaEditar.description = this.nota
          this.notasService.updateNote(this.notaEditar).then((response) => {
            this.isSaving = false
            this.isEditing=false
            this.nota = ""
            console.log("Nota actualizada con exito!");
            this.obtenerNotas()
          })
          .catch((error) => {
            this.isSaving = false
            console.log(error);
          })
        }
      } else {
        let newNota: Note = {
          description: this.nota
        }

        this.notasService.addNote(newNota).then((response) => {
          this.isSaving = false
          newNota.id = response

          this.notes.push(newNota)
          this.nota = ""
        })
        .catch((error) => {
          this.isSaving = false
          console.log(error);
        })
      }
    }
  }

  obtenerNotas() {
    this.isLoading=true
    this.notasService.getNotes().then((_notes) => {
      this.isLoading=false
      this.notes = _notes
    })
    .catch((error)=>{
      this.isLoading=false
      console.log(error);

    })
  }

  eliminarNota(id: string) {
    this.isLoading=true
    this.notasService.deleteNote(id).then((response)=>{
      console.log("Nota eliminada con exito!");
      this.obtenerNotas()
    })
    .catch((error)=>{
      console.log(error)
      this.isLoading=false
    });
  }

  editar(notaEdit: Note) {
    this.isEditing=true
    this.nota = notaEdit.description
    this.notaEditar = notaEdit
  }
}
