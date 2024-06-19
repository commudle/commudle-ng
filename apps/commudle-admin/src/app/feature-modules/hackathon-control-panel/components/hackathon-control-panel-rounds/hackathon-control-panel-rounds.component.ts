import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IRound, EDbModels } from '@commudle/shared-models';
import { RoundService, ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-hackathon-control-panel-rounds',
  templateUrl: './hackathon-control-panel-rounds.component.html',
  styleUrls: ['./hackathon-control-panel-rounds.component.scss'],
})
export class HackathonControlPanelRoundsComponent implements OnInit {
  roundForm: FormGroup;
  rounds: IRound[];
  icons = {
    faPlus,
    faFileImage,
    faXmark,
  };
  hackathonSlug = '';
  constructor(
    private roundService: RoundService,
    private activatedRoute: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
  ) {
    this.roundForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      order: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.indexRounds(params.get('hackathon_id'));
    });
  }

  indexRounds(hackathonId) {
    this.roundService.indexRounds(hackathonId, EDbModels.HACKATHON).subscribe((data: IRound[]) => {
      this.rounds = data;
    });
  }

  openRoundDialogBox(dialog, round?: IRound, index?) {
    if (round) {
      this.roundForm = this.fb.group({
        name: round.name,
        description: round.description,
        date: this.datePipe.transform(round.date, 'yyyy-MM-dd'),
        order: round.order,
      });
    }

    this.nbDialogService.open(dialog, {
      context: { index: index, round: round },
    });
  }

  openConfirmDeleteDialogBox(dialog, roundId, index) {
    this.nbDialogService.open(dialog, {
      context: { index: index, roundId: roundId },
    });
  }

  createRound() {
    this.roundService
      .createRound(this.roundForm.value, EDbModels.HACKATHON, this.hackathonSlug)
      .subscribe((data: IRound) => {
        if (data) {
          this.rounds.unshift(data);
          this.toastrService.successDialog('Round Created');
          this.roundForm.reset();
        }
      });
  }

  updateRound(round, index) {
    this.roundService.updateRound(this.roundForm.value, round.id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Round was updated');
        this.rounds[index] = data;
      }
    });
  }

  destroyRound(roundId, index) {
    this.roundService.destroyRound(roundId).subscribe((data) => {
      if (data) this.rounds.splice(index, 1);
    });
  }
}
