import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AnimaisService } from '../animais.service';
import { Animais } from '../animais';

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService, private usuarioService: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(switchMap((usuario)=>{const username = usuario.name ?? ''; return this.animaisService.listaDoUsuario(username) }),
    take(1)
    )
  }
}
