import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdProductoPage } from './id-producto.page';

describe('IdProductoPage', () => {
  let component: IdProductoPage;
  let fixture: ComponentFixture<IdProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IdProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
