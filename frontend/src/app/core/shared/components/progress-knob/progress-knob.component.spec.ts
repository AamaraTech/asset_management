import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressKnobComponent } from './progress-knob.component';

describe('ProgressKnobComponent', () => {
  let component: ProgressKnobComponent;
  let fixture: ComponentFixture<ProgressKnobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressKnobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressKnobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
