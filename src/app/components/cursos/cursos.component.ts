import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { InstructorService } from 'src/app/services/instructor.service';
import { FormcursoComponent } from '../formcurso/formcurso.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['url_imagen_presentacion', 'nombre', 'habilita_inscripcion', 'estado_publicacion', 'actions'];
  dataSource = new MatTableDataSource();
  myToast!: bootstrap.Toast;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private instructorService: InstructorService, private router: Router, public dialog: MatDialog) {
    instructorService.getCursos().subscribe(resp => {
      this.dataSource.data = resp.rows;
    }, err => {
      console.log(err);
      sessionStorage.removeItem('token');
      router.navigateByUrl('/');
    });
  }

  ngOnInit(): void {
    var myToastEl = document.getElementById('liveToast')!;
    this.myToast = new bootstrap.Toast(myToastEl);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFormNew(): void {
    const dialogRef = this.dialog.open(FormcursoComponent, { width: '100%' });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.myToast.show();
        this.instructorService.getCursos().subscribe(resp => {
          this.dataSource.data = resp.rows;
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }

  openFormEdit(id: number): void {
    const dialogRef = this.dialog.open(FormcursoComponent, { width: '100%', data: id});

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.myToast.show();
        this.instructorService.getCursos().subscribe(resp => {
          this.dataSource.data = resp.rows;
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }
  
  openConfirmDelete(row: any) {
    const dialogRef = this.dialog.open(ConfirmDialog, {data: row.nombre});

    dialogRef.afterClosed().subscribe(async res => {
      if (res) {
        await this.instructorService.deleteCurso(row.id_cursos).toPromise().then();
        this.instructorService.getCursos().subscribe(resp => {
          this.dataSource.data = resp.rows;
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }

}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html'
})
export class ConfirmDialog {
  constructor(@Inject (MAT_DIALOG_DATA) public data: string) {}
}