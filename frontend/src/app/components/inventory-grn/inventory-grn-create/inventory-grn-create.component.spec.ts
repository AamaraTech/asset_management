import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGrnCreateComponent } from './inventory-grn-create.component';

describe('InventoryGrnCreateComponent', () => {
  let component: InventoryGrnCreateComponent;
  let fixture: ComponentFixture<InventoryGrnCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryGrnCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryGrnCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
