import { AfterViewInit, Component, ContentChildren, DoCheck, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormConfig } from './form-config';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit, DoCheck {
  @ViewChild(NgForm) form: NgForm;
  @ContentChildren(NgModel) public models: QueryList<NgModel>;
  @Input() config: FormConfig<any>;
  @Input() title: string;
  value: any;
  valid: boolean;
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  canSave: boolean;
  originalValue: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void{
    this.loading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
    if(id){
      this.config.load(id)
      .subscribe((value) => {
        this.originalValue = JSON.stringify(value);
        this.value = value;
        this.config.value(this.value);
        this.loading = false;
    });
    }else{
      this.value = this.config.newValue();
      this.config.value(this.value);
    }
  }

  ngAfterViewInit(): void{
    this.models.forEach(model => this.form.addControl(model));
  }
 
  ngDoCheck(){
    if(this.form && this.value){
      this.dirty = this.originalValue !== JSON.stringify(this.value);
      let customValidation = true;
      if(this.config.validate){
        customValidation = this.config.validate(this.value);
      }
      this.valid = (this.form.valid ?? false) && customValidation;
    }
    this.canSave = this.valid && this.dirty && !this.loading;
  }

  onSave(){
    this.saving = true;
    this.config.update(this.value)
      .subscribe(x => {
        this.saving = false;
        this.value = x;
        this.config.value = this.value;
        this.navigateBack();
      });
  }

  navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute});
  }
}
