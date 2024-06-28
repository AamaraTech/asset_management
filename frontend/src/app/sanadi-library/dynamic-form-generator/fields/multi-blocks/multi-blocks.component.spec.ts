import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiBlocksComponent } from './multi-blocks.component';

describe('MultiBlocksComponent', () => {
  let component: MultiBlocksComponent;
  let fixture: ComponentFixture<MultiBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
