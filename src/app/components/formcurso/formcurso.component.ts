import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstructorService } from 'src/app/services/instructor.service';

@Component({
  selector: 'app-formcurso',
  templateUrl: './formcurso.component.html',
  styleUrls: ['./formcurso.component.scss']
})
export class FormcursoComponent implements OnInit {
  cursoForm!: FormGroup;
  subrubros!: any[];
  linkVideo: string = '';
  base64: any = 'https://i.ibb.co/NLs907N/no-image.jpg';
  loading: boolean = false;
  private change: boolean = false;

  constructor(private instructorService: InstructorService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FormcursoComponent>, @Inject(MAT_DIALOG_DATA) private id: number) {
    this.cursoForm = formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      publico_destinado: ['', Validators.required],
      requisitos: ['', Validators.required],
      url_imagen_presentacion: ['', Validators.required],
      url_video_presentacion: ['', Validators.required],
      precio_inscripcion: ['', Validators.required],
      precio_cuota: ['', Validators.required],
      cantidad_cuotas: ['', Validators.required],
      subrubro: [1, Validators.required],
      estado_publicacion: [0, Validators.required],
      habilita_inscripcion: [0, Validators.required]
    });

    instructorService.getSubrubros().subscribe(resp => {
      this.subrubros = resp.rows;
    });

    if (id) {
      instructorService.getCurso(id).subscribe(resp => {
        this.cursoForm.get('nombre')?.setValue(resp[0].nombre);
        this.cursoForm.get('descripcion')?.setValue(resp[0].descripcion);
        this.cursoForm.get('publico_destinado')?.setValue(resp[0].publico_destinado);
        this.cursoForm.get('requisitos')?.setValue(resp[0].requisitos);
        this.base64 = resp[0].url_imagen_presentacion;
        this.cursoForm.get('url_imagen_presentacion')?.setValue(resp[0].url_imagen_presentacion, { emitModelToViewChange: false });
        this.cursoForm.get('url_video_presentacion')?.setValue(resp[0].url_video_presentacion);
        this.cursoForm.get('precio_inscripcion')?.setValue(resp[0].precio_inscripcion);
        this.cursoForm.get('precio_cuota')?.setValue(resp[0].precio_cuota);
        this.cursoForm.get('cantidad_cuotas')?.setValue(resp[0].cantidad_cuotas);
        this.cursoForm.get('subrubro')?.setValue(resp[0].id_subrubros);
        this.cursoForm.get('estado_publicacion')?.setValue(resp[0].estado_publicacion);
        this.cursoForm.get('habilita_inscripcion')?.setValue(resp[0].habilita_inscripcion);
      });
    }
  }

  ngOnInit(): void {
  }

  readThis(event: any) {
    let file: File = event.target.files[0];
    let myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = () => {
      this.base64 = myReader.result;
      this.change = true;
    }
  }

  async isValid() {

    if (this.cursoForm.valid) {

      if (this.id) {

        if (this.change) {
          let contentForm = document.getElementById('contentForm');

          this.loading = true;
          contentForm?.style.setProperty('opacity', '50%');

          await this.instructorService.upload(this.base64.replace('data:image/jpeg;base64,', '')).toPromise().then(resp => {
            this.cursoForm.controls.url_imagen_presentacion.setValue(resp, { emitModelToViewChange: false });
          });
        }

        let curso = {
          nombre: this.cursoForm.get('nombre')?.value,
          descripcion: this.cursoForm.get('descripcion')?.value,
          publico_destinado: this.cursoForm.get('publico_destinado')?.value,
          requisitos: this.cursoForm.get('requisitos')?.value,
          url_imagen_presentacion: this.cursoForm.get('url_imagen_presentacion')?.value,
          url_video_presentacion: this.cursoForm.get('url_video_presentacion')?.value,
          precio_inscripcion: this.cursoForm.get('precio_inscripcion')?.value,
          precio_cuota: this.cursoForm.get('precio_cuota')?.value,
          cantidad_cuotas: this.cursoForm.get('cantidad_cuotas')?.value,
          id_subrubros: this.cursoForm.get('subrubro')?.value,
          estado_publicacion: this.cursoForm.get('estado_publicacion')?.value,
          habilita_inscripcion: this.cursoForm.get('habilita_inscripcion')?.value
        };

        await this.instructorService.putCurso(curso, this.id).toPromise().then();
      } else {
        let contentForm = document.getElementById('contentForm');

        this.loading = true;
        contentForm?.style.setProperty('opacity', '50%');

        await this.instructorService.upload(this.base64.replace('data:image/jpeg;base64,', '')).toPromise().then(resp => {
          this.cursoForm.controls.url_imagen_presentacion.setValue(resp, { emitModelToViewChange: false });
        });

        let curso = {
          nombre: this.cursoForm.get('nombre')?.value,
          descripcion: this.cursoForm.get('descripcion')?.value,
          publico_destinado: this.cursoForm.get('publico_destinado')?.value,
          requisitos: this.cursoForm.get('requisitos')?.value,
          url_imagen_presentacion: this.cursoForm.get('url_imagen_presentacion')?.value,
          url_video_presentacion: this.cursoForm.get('url_video_presentacion')?.value,
          precio_inscripcion: this.cursoForm.get('precio_inscripcion')?.value,
          precio_cuota: this.cursoForm.get('precio_cuota')?.value,
          cantidad_cuotas: this.cursoForm.get('cantidad_cuotas')?.value,
          id_subrubros: this.cursoForm.get('subrubro')?.value,
          estado_publicacion: this.cursoForm.get('estado_publicacion')?.value,
          habilita_inscripcion: this.cursoForm.get('habilita_inscripcion')?.value
        };

        await this.instructorService.postCurso(curso).toPromise().then();
      }

      this.dialogRef.close(this.cursoForm.valid);
    }
  }

  enableIns() {
    (this.cursoForm.get('habilita_inscripcion')?.value) ? this.cursoForm.get('habilita_inscripcion')?.setValue(1) : this.cursoForm.get('habilita_inscripcion')?.setValue(0);
  }

  enableState() {
    (this.cursoForm.get('estado_publicacion')?.value) ? this.cursoForm.get('estado_publicacion')?.setValue(1) : this.cursoForm.get('estado_publicacion')?.setValue(0);
  }

}
