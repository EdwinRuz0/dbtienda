import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosALLComponent } from './productos-all.component';

describe('ProductosALLComponent', () => {
  let component: ProductosALLComponent;
  let fixture: ComponentFixture<ProductosALLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosALLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosALLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
