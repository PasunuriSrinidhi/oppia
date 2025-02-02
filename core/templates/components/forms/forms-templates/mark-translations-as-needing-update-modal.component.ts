// Copyright 2022 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Modal component asking user whether to select appropriate
 * changes for the translation.
 */

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmOrCancelModal } from 'components/common-layout-directives/common-elements/confirm-or-cancel-modal.component';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'oppia-mark-translations-as-needing-update-modal',
  templateUrl: './mark-translations-as-needing-update-modal.component.html'
})
export class MarkTranslationsAsNeedingUpdateModalComponent
  extends ConfirmOrCancelModal {
  @Input() contentId!: string;
  @Input() markNeedsUpdateHandler!: (contentId: string) => void;
  @Input() removeHandler!: (contentId: string) => void;
  @ViewChild('updateForm', { static: false }) updateForm!: NgForm;

  updateReasons: string[] = [
    'Spelling/grammar mistake',
    'Missing/incorrect translation',
    'Outdated information',
    'Other'
  ];

  selectedReason: string = '';
  constructor(
    private ngbActiveModal: NgbActiveModal
  ) {
    super(ngbActiveModal);
  }
markNeedsUpdate(): void {
    if (this.selectedReason === '') {
      // Show an error message if no reason is selected.
      this.updateForm.controls['reason'].setErrors({ required: true });
      return;
    }

    this.markNeedsUpdateHandler(this.contentId);
    this.ngbActiveModal.close();
  }


  removeTranslations(): void {
    this.removeHandler(this.contentId);
    this.ngbActiveModal.close();
  }

  cancel(): void {
    this.ngbActiveModal.dismiss();
  }
}
