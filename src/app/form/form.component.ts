import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Project } from '../modal/modal.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  employeeForm!: FormGroup;
  nombre = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  apellidos = new FormControl('', [Validators.required, Validators.pattern('^(?! )[A-Za-z\\s]+$')]);
  estado = new FormControl('', [Validators.required]);
  practice = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  saga = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]);
  grado = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  city = new FormControl('', [Validators.required, Validators.pattern('^(?! )[A-Za-z\\s]+$')]);
  office = new FormControl('', [Validators.required]);
  areaLeader = new FormControl('', [Validators.required, Validators.pattern('^(?! )[A-Za-z\\s]+$')]);
  keyPeople = new FormControl('', [Validators.required]);
  cod = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  division = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
  leader = new FormControl('', [Validators.required, Validators.pattern('^(?! )[A-Za-z\\s,]+$')]);
  bill = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  rol = new FormControl('', [Validators.required, Validators.pattern('^(?! )[A-Za-z\\s,]+$')]);
  work = new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]);
  id = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]);

  displayedColumns: string[] = ['cod', 'division', 'leader', 'bill', 'rol', 'createdAt', 'work'];
  projectList!: MatTableDataSource<Project>;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      nombre: this.nombre,
      apellidos: this.apellidos,
      estado: this.estado,
      practice: this.practice,
      saga: this.saga,
      grado: this.grado,
      email: this.email,
      city: this.city,
      office: this.office,
      areaLeader: this.areaLeader,
      keyPeople: this.keyPeople,
      cod: this.cod,
      division: this.division,
      leader: this.leader,
      bill: this.bill,
      rol: this.rol,
      work: this.work,
      id: this.id
    });
  }  

  save(data: any) {
    this.usersService.addUser(data).subscribe({
      error: err => {
        alert('Error!');
      },
      complete: () => {
        confirm('Usuario creado!');
        this.router.navigate(['/employeeList/' + data.id]);
      }
    });
  }

  getErrorMessage(err: any): string {
    if (err.required !== undefined) {
      return 'Compo obligatorio'
    } else if (err.pattern !== undefined || err.email !== undefined) {
      return 'Formato incorrecto'
    }
    return ''
  }
}
