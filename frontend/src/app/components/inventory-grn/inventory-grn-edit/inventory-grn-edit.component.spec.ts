import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGrnEditComponent } from './inventory-grn-edit.component';

describe('InventoryGrnEditComponent', () => {
  let component: InventoryGrnEditComponent;
  let fixture: ComponentFixture<InventoryGrnEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryGrnEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryGrnEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
