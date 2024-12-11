import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalServGeneralesComponent } from './modal-serv-generales.component';

describe('ModalServGeneralesComponent', () => {
  let component: ModalServGeneralesComponent;
  let fixture: ComponentFixture<ModalServGeneralesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalServGeneralesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalServGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
