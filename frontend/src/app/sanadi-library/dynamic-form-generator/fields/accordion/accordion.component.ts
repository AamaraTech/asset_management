import { Component, Input, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'sanadi-accordion',
  // standalone: true,
  // imports: [AccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent implements OnInit {
  @Input() fields: any;
  @Input() form: any;

  ngOnInit(){
  }
}
