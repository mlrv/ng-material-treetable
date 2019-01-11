import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreetableComponent } from './treetable.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { numberTree } from '../mocks/numberTree';
import * as _ from 'lodash';

describe('TreetableComponent', () => {
  let component: TreetableComponent<any>;
  let fixture: ComponentFixture<TreetableComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TreetableComponent
      ],
      imports: [
        MatTableModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreetableComponent);
    component = fixture.componentInstance;
    component.tree = _.cloneDeep(numberTree);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
