import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrawMatchInterface } from 'src/app/shared/interfaces/draw';

@Component({
    selector: 'app-players-popup',
    templateUrl: './players-popup.component.html',
    styleUrls: ['./players-popup.component.scss']
})
export class PlayersPopupComponent implements OnInit {
    stServe1 = "";
    stServeWon1 = 5;
    player1 = '';
    ndServerWon1 = '';
    bPWon1 = '';
    rPWon1 = '';

    stServe2 = '';
    stServeWon2 = 3;
    player2 = '';
    ndServerWon2 = '';
    bPWon2 = '';
    rPWon2 = '';
    constructor(
        public dialogRef: MatDialogRef<PlayersPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DrawMatchInterface,

        // public stServe: Number,
        // public stServeWon: Number,
        // public player: Number,
        // public ndServerWon: Number,
        // public bPWon: Number,
        // public rPWon: Number,


        // totalPointsWon: boolean,
        // breakPoints: Number,
        // breakPointsof: Number,
        // stServe: Number,
        // stServeof: Number,
        // stServeWon: Number,
        // stServeWonof: Number,
        // ndServeWon: Number,
        // ndServeWonof: Number,
    ) { }

    ngOnInit(): void {
        this.stServe1 = Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) == Infinity ? "" : Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) + "%" + "(" + this.data.player1.stats?.firstServe + " of " + this.data.player1.stats?.firstServeOf + " )";

        this.stServe2 = Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) + "%" + "(" + this.data.player2.stats?.firstServe + " of " + this.data.player2.stats?.firstServeOf + " )");


        // this.stServeWon1 = Math.floor((Number(this.data.player1.stats?.winningOnFirstServe) / Number(this.data.player1.stats?.winningOnFirstServeOf)) * 100);
        // this.stServeWon2 = Math.floor((Number(this.data.player2.stats?.winningOnFirstServe) / Number(this.data.player2.stats?.winningOnFirstServeOf)) * 100);


        this.player1 = Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) + "% " + " ( " + this.data.player1.stats?.firstServe + " of " + this.data.player1.stats?.firstServeOf + " )");

        this.player2 = Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) + "% " + " ( " + this.data.player2.stats?.firstServe + " of " + this.data.player2.stats?.firstServeOf + " )");



        this.ndServerWon1 = Math.floor((Number(this.data.player1.stats?.winningOnFirstServe) / Number(this.data.player1.stats?.winningOnFirstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player1.stats?.winningOnFirstServe) / Number(this.data.player1.stats?.winningOnFirstServeOf)) * 100) + "% " + " ( " + this.data.player1.stats?.winningOnFirstServe + " of " + this.data.player1.stats?.winningOnFirstServeOf + " )");

        this.ndServerWon2 = Math.floor((Number(this.data.player2.stats?.winningOnFirstServe) / Number(this.data.player2.stats?.winningOnFirstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player2.stats?.winningOnFirstServe) / Number(this.data.player2.stats?.winningOnFirstServeOf)) * 100) + "% " + " ( " + this.data.player2.stats?.winningOnFirstServe + " of " + this.data.player2.stats?.winningOnFirstServeOf + " )");



        this.bPWon1 = Math.floor((Number(this.data.player1.stats?.breakPointsConverted) / Number(this.data.player1.stats?.breakPointsConvertedOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player1.stats?.breakPointsConverted) / Number(this.data.player1.stats?.breakPointsConvertedOf)) * 100) + "% " + " ( " + this.data.player1.stats?.breakPointsConverted + " of " + this.data.player1.stats?.breakPointsConvertedOf + " )");

        this.bPWon2 = Math.floor((Number(this.data.player2.stats?.breakPointsConverted) / Number(this.data.player2.stats?.breakPointsConvertedOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player2.stats?.breakPointsConverted) / Number(this.data.player2.stats?.breakPointsConvertedOf)) * 100) + "% " + " ( " + this.data.player2.stats?.breakPointsConverted + " of " + this.data.player2.stats?.breakPointsConvertedOf + " )");



        this.rPWon1 = Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player1.stats?.firstServe) / Number(this.data.player1.stats?.firstServeOf)) * 100) + "% " + " ( " + this.data.player1.stats?.firstServe + " of " + this.data.player1.stats?.firstServeOf + " )");

        this.rPWon2 = Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) == Infinity ? "" : (Math.floor((Number(this.data.player2.stats?.firstServe) / Number(this.data.player2.stats?.firstServeOf)) * 100) + "% " + " ( " + this.data.player2.stats?.firstServe + " of " + this.data.player2.stats?.firstServeOf + " )");

    }


}