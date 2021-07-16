import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainpanelComponent } from './components/mainpanel/mainpanel.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ConfirmDialog, CursosComponent } from './components/cursos/cursos.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormcursoComponent } from './components/formcurso/formcurso.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainpanelComponent,
    CursosComponent,
    AlumnosComponent,
    FormcursoComponent,
    ConfirmDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
