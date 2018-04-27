import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

const components = [MatInputModule, MatButtonModule, MatCheckboxModule];

@NgModule({
	imports: [components],
	exports: [components]
})
export class MaterialModule { }
