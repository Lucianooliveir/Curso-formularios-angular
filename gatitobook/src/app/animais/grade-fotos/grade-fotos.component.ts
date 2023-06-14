import { Component, Input, OnInit } from '@angular/core';
import { Animais } from '../animais';

@Component({
  selector: 'app-grade-fotos',
  templateUrl: './grade-fotos.component.html',
  styleUrls: ['./grade-fotos.component.css']
})
export class GradeFotosComponent implements OnInit {
  @Input() animais !: Animais
  constructor() { }

  ngOnInit(): void {
  }

}
