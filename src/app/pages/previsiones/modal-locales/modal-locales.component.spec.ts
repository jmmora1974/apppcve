import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalLocalesComponent } from './modal-locales.component';

describe('ModalLocalesComponent', () => {
  let component: ModalLocalesComponent;
  let fixture: ComponentFixture<ModalLocalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalLocalesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
