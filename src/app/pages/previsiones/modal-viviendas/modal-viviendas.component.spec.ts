import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalViviendasComponent } from './modal-viviendas.component';

describe('ModalViviendasComponent', () => {
  let component: ModalViviendasComponent;
  let fixture: ComponentFixture<ModalViviendasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalViviendasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViviendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
