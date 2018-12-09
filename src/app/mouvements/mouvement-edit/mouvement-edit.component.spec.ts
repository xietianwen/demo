import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementEditComponent } from './mouvement-edit.component';

describe('MouvementEditComponent', () => {
  let component: MouvementEditComponent;
  let fixture: ComponentFixture<MouvementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
