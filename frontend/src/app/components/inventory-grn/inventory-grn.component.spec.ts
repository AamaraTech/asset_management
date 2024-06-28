import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGrnComponent } from './inventory-grn.component';

describe('InventoryGrnComponent', () => {
  let component: InventoryGrnComponent;
  let fixture: ComponentFixture<InventoryGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryGrnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
