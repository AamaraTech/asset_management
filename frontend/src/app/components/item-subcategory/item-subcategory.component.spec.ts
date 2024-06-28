import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSubcategoryComponent } from './item-subcategory.component';

describe('ItemSubcategoryComponent', () => {
  let component: ItemSubcategoryComponent;
  let fixture: ComponentFixture<ItemSubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSubcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemSubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
