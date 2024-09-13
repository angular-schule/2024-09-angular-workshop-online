import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    // Ersatz für den BookRatingService
    const ratingMock = {
      rateUp: (b: Book) => b,
      // rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer wenn jemand BRS anfordert,
        // wird stattdessen unser ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    // Zugriff auf TS-Klasseninstanz
    component = fixture.componentInstance;

    // Zugriff auf DOM-Element
    // fixture.nativeElement.querySelector('p')

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp()', () => {
    // Arrange
    // Service anfordern: das ist eigentlich unser ratingMock
    const rs = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '111' } as Book; // Type Assertion, bitte vorsichtig verwenden!

    // Objekt überwachen mit Spion
    // spyOn(rs, 'rateUp').and.returnValue(testBook);
    // spyOn(rs, 'rateUp').and.callFake(b => b);
    // callThrough: originale Methode nicht wegwerfen, sondern
    // verwenden, um den Wert zu erzeugen
    spyOn(rs, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook);

    // Assert
    // prüfen, ob service.rateUp aufgerufen wurde
    // expect(rs.rateUp).toHaveBeenCalled();
    expect(rs.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
