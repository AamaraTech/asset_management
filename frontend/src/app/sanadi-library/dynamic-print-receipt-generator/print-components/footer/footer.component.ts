import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() field:any = {};
  addressEnglish: any = sessionStorage.getItem('registeredAddress');
  addressGeorgia: any = sessionStorage.getItem('corporateAddress');

  constructor() { }

  ngOnInit(): void {
  }

}
