import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { v4 as uuidv4 } from 'uuid';
import { Galeria } from '../interfaces/galeria.interface';
import { GaleriaService } from 'src/app/services/galeria.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  file: File | undefined
  image: string | undefined
  imageDefault: string = "assets/images/default.jpg"
  photos: Galeria[] = []
  isLoading = false

  constructor(private fileUploadService: FileUploadService, private galeriaService: GaleriaService) {

  }

  ngOnInit(): void {
    this.getGaleria()
  }

  getGaleria() {
    this.isLoading = true
    this.galeriaService.getPhotos().then((response)=> {
      this.photos = response
      this.isLoading = false
    })
    .catch((error) => {
      console.log(error)
      this.isLoading = false
    })
  }

  getSelectedFile(event: any) {
    this.file= event.target.files[0]
    console.log(this.file);
  }

  subirArchivo() {
    this.isLoading = true
    let fileName=`${uuidv4()}.${this.file?.name.split('.').pop()}`
    console.log(fileName);
    console.log(this.file?.name);


    this.fileUploadService.uploadFile(this.file!, `galeria/${fileName}`).then((url) => {
      console.log(url);

      let newPhoto: Galeria = {
        fileName: fileName,
        OriginalFileName: this.file!.name,
        url: url
      }
      this.galeriaService.addPhoto(newPhoto).then((doc)=>{
        console.log("Foto guardada con id: " + doc);
        this.getGaleria()
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  }

  elimiarArchivo(photo: Galeria) {
    this.isLoading = true
    this.fileUploadService.deleteFile(photo.url).then((response) => {
      this.galeriaService.deletePhoto(photo.id!).then((resp) => {
        console.log("Foto " + photo.OriginalFileName + " eliminada satisfactoriamente");
        this.getGaleria()
      }).catch(error=> console.log(error))
    }).catch(error=> console.log(error))
  }

}
