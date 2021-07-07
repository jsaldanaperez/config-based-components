import { AfterViewInit, Component, ContentChildren, DoCheck, EventEmitter, Input, OnInit, Output, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormConfig } from './form-config';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from './form.service';
import { DeepCloneService } from '../deep-clone.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit, DoCheck {
  @ViewChild(NgForm) form: NgForm;
  @ContentChildren(NgModel, { descendants: true}) public models: QueryList<NgModel>;
  @Input() config: FormConfig<any>;
  @Input() title: string;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>()
  valid: boolean;
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  canSave: boolean;
  originalValue: string;

  constructor(
    private router: Router,
    private formService: FormService,
    private deepCloneService: DeepCloneService,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
    if(id){
      this.loading = true;
      this.config.load(id)
      .subscribe((value) => {
        const copy = this.deepCloneService.clone(value);
        this.setValue(copy);
        this.loading = false;
    });
    }
  }

  ngAfterViewInit(): void{
    this.models.forEach(model => this.form.addControl(model));
  }
 
  ngDoCheck(){
    if(this.form && this.value){
      this.setIsDirty();
      let customValidation = true;
      if(this.config.validate){
        this.config.validate(this.form);
        customValidation = this.form.valid ?? true;
      }
      this.valid = (this.form.valid ?? false) && customValidation;
      this.formService.save = this.valid ?  () => this.config.update(this.value) : undefined;
    }
    this.canSave = this.valid && this.dirty && !this.loading;
  }


  onSave(){
    this.saving = true;
    this.config.update(this.value)
      .subscribe(x => {
        this.saving = false;
        this.setValue(x);
        this.navigateBack();
      });
  }

  navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute});
  }

  private setIsDirty(){
    this.dirty = this.originalValue !== JSON.stringify(this.value);
    this.formService.dirty = this.dirty;
  }

  private setValue(value: unknown){
    this.originalValue = JSON.stringify(value);
    this.value = value;
    this.valueChange.next(this.value);
    this.setIsDirty();
  }
}
