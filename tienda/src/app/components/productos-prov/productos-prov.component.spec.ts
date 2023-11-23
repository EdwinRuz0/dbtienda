import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosProvComponent } from './productos-prov.component';

describe('ProductosProvComponent', () => {
  let component: ProductosProvComponent;
  let fixture: ComponentFixture<ProductosProvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosProvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosProvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
