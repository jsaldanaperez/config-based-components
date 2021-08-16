import { Component, Input, OnInit } from '@angular/core';
import { FormControlDirective, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormConfig } from './form-config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from './form.service';
import { DeepCloneService } from '../deep-clone.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormGroupDirective, FormControlDirective]
})
export class FormComponent implements OnInit {
  @Input() config: FormConfig<any>;
  @Input() title: string;
  value: any;
  valid: boolean;
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  canSave: boolean;
  originalValue: string;
  formGroup = new FormGroup({ });

  constructor(
    formGroupDirective: FormGroupDirective,
    private router: Router,
    private formService: FormService,
    private deepCloneService: DeepCloneService,
    private activatedRoute: ActivatedRoute){
      formGroupDirective.form = this.formGroup;
    }

  ngOnInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;

    Object.keys(this.config.controls).forEach(key => {
      this.formGroup.addControl(key, this.config.controls[key])
    })
    if(id){
      this.loading = true;
      this.config.load(id)
      .subscribe((value) => {
        const copy = this.deepCloneService.clone(value);
        this.setValue(copy);
        this.loading = false
        this.formGroup.valueChanges
          .subscribe(() =>{
            this.updateState();
          })
    });
    }
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

  private updateState(): void{
    if(this.formGroup && this.value){
      this.updateValue();
      this.setIsDirty(); 
      this.valid = this.formGroup.valid ?? false
      this.formService.save = this.valid ?  () => this.config.update(this.formGroup.value) : undefined;
    }
    this.canSave = this.valid && this.dirty && !this.loading;
  }

  private updateValue(): void{
    const controls = this.config.controls;
    Object.keys(controls).forEach(key =>{
      this.value[key] = controls[key].value;
    })
  }

  private setIsDirty(): void{
    this.dirty = this.originalValue !== JSON.stringify(this.value);
    this.formService.dirty = this.dirty;
  }

  private setValue(value: any): void{
    this.value = value;
    const controls = this.config.controls;
    Object.keys(controls).forEach(key => { 
      controls[key].setValue(this.value[key]);
    });
    
    this.originalValue = JSON.stringify(this.value)
    this.setIsDirty();
  }
}
