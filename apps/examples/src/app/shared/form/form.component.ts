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
  dirty: boolean;
  loading: boolean;
  saving: boolean;
  canSave: boolean;
  originalValue: string;
  formGroup: FormGroup;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private router: Router,
    private formService: FormService,
    private deepCloneService: DeepCloneService,
    private activatedRoute: ActivatedRoute){

    }

  ngOnInit(): void{
    this.formGroup = this.config.formGroup;
    this.formGroupDirective.form = this.formGroup;
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
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
    if(this.formGroup.valid){
          this.saving = true;
    this.config.update(this.formGroup.value)
      .subscribe(x => {
        this.saving = false;
        this.setValue(x);
        this.navigateBack();
      });
    }
  }

  navigateBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute});
  }

  private updateState(): void{
    if(this.formGroup){
      this.setIsDirty(); 
      const valid = this.formGroup.valid ?? false
      this.formService.save = valid ?  () => this.config.update(this.formGroup.value) : undefined;
    }
    this.canSave = this.formGroup.valid && this.dirty && !this.loading;
  }

  private setIsDirty(): void{
    this.dirty = this.originalValue !== JSON.stringify(this.formGroup.value);
    this.formService.dirty = this.dirty;
  }

  private setValue(value: any): void{
    this.formGroup.patchValue(value);
    this.originalValue = JSON.stringify(this.formGroup.value)
    this.setIsDirty();
  }
}
