import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreetableComponent } from './treetable.component';
import { MatTableModule } from '@angular/material/table';

describe('TreetableComponent', () => {
  let component: TreetableComponent;
  let fixture: ComponentFixture<TreetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreetableComponent
      ],
      imports: [
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
