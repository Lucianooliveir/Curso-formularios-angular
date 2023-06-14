import { ComentariosService } from './comentarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentarios } from './comentarios';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id!: number
  comentarios$!: Observable<Comentarios>
  comentarioForm!:FormGroup


  constructor(private ComentariosService: ComentariosService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.comentarios$ = this.ComentariosService.buscaComentario(this.id)
    this.comentarioForm = this.formBuilder.group({
      comentario:['',Validators.maxLength(300)]
    })
  }

  gravar():void{
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.ComentariosService.incluiCOmentario(this.id,comentario).pipe(switchMap(() => this.ComentariosService.buscaComentario(this.id)),
    tap(()=>{
      this.comentarioForm.reset()
      alert('Comentario Salvo')
    })
    ) 
  }
}
