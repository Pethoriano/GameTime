import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaGame } from './edita-game';

describe('EditaGame', () => {
  let component: EditaGame;
  let fixture: ComponentFixture<EditaGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
