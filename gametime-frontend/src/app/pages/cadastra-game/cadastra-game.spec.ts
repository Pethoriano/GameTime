import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraGame } from './cadastra-game';

describe('CadastraGame', () => {
  let component: CadastraGame;
  let fixture: ComponentFixture<CadastraGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastraGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
