import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementPeseeComponent } from './mouvement-pesee.component';

describe('MouvementPeseeComponent', () => {
  let component: MouvementPeseeComponent;
  let fixture: ComponentFixture<MouvementPeseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementPeseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementPeseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
