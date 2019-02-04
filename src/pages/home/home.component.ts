import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import 'rxjs/add/operator/map';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home-comp',
    templateUrl: 'home.html'
})

export class HomeComponent implements OnInit {
    public previewImg; // = "https://www.google.cl/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
    public previewImgLoading = false;
    public previewCode: number;
    public previewMessage: string;
    public picUrl: string;
    public trustedUrl: SafeUrl;
    public captureErrorMessage: string;
    public toGs = true;
    public downloadSub: Subscription;

    public url: Blob;

    // variables comunes
    public repeticiones = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7'];
    public estructuras = ['racimo', 'bayas', 'raquis', 'raquis_principal'];
    public harvest = ['cosecha', 'postcosecha'];

    // variables de variedades
    public variedades = [
        { variedad: 'Agourane' },
        { variedad: 'Alburla' },
        { variedad: 'Arna.Guirna' },
        { variedad: 'Assyl.Kara' },
        { variedad: 'Autumn.Royal' },
        { variedad: 'Autumn.Seedless' },
        { variedad: 'Beauty' },
        { variedad: 'Big.Red' },
        { variedad: 'Black' },
        { variedad: 'Blush' },
        { variedad: 'Bogazkere' },
        { variedad: 'Calmeria' },
        { variedad: 'Canner' },
        { variedad: 'Cardinal' },
        { variedad: 'Centennial' },
        { variedad: 'Cesar' },
        { variedad: 'Chaselas.Musque' },
        { variedad: 'Chirai.Obak' },
        { variedad: 'Chouchillon' },
        { variedad: 'Crimson' },
        { variedad: 'Csaba.Gyangye' },
        { variedad: 'Dawn' },
        { variedad: 'Delizia.di.Vaprio' },
        { variedad: 'Duc.Magenta' },
        { variedad: 'Emperor' },
        { variedad: 'Espadeiro.Tinto' },
        { variedad: 'Exotic' },
        { variedad: 'Frankentaler' },
        { variedad: 'Fue.Fuki' },
        { variedad: 'Gros.Colman' },
        { variedad: 'Ilusion' },
        { variedad: 'Iniagrape.one' },
        { variedad: 'Italia' },
        { variedad: 'Italia.Pirovano' },
        { variedad: 'July.Muscat' },
        { variedad: 'K.Belyi' },
        { variedad: 'Kapistroni.tetri' },
        { variedad: 'Korithi' },
        { variedad: 'Kyoho' },
        { variedad: 'Lameiro' },
        { variedad: 'Magdalena' },
        { variedad: 'Maravilla.de.Malaga' },
        { variedad: 'Medouar' },
        { variedad: 'Mehdik' },
        { variedad: 'Melissa' },
        { variedad: 'Monukka' },
        { variedad: 'Moscatel.Oeiras.Faux' },
        { variedad: 'Moscatel.Rosada' },
        { variedad: 'Olivette' },
        { variedad: 'Orbois' },
        { variedad: 'Orlovi.Nokti' },
        { variedad: 'Patagonia' },
        { variedad: 'Pervenetz' },
        { variedad: 'Plant.de.Maroc' },
        { variedad: 'Pletchistik' },
        { variedad: 'Portugais.Bleu' },
        { variedad: 'Queen' },
        { variedad: 'Red' },
        { variedad: 'Red.Globe' },
        { variedad: 'Retagliado.Bianco' },
        { variedad: 'Ribier' },
        { variedad: 'Ruby.Cabernet' },
        { variedad: 'San.Francisco' },
        { variedad: 'Seleccion.5' },
        { variedad: 'Sultanina.Monococo' },
        { variedad: 'Superior' },
        { variedad: 'Tandaya' },
        { variedad: 'Titsa.Kaprei' },
        { variedad: 'Tsolikouri' },
        { variedad: 'Uva.Rey' },
        { variedad: 'Varadi' },
        { variedad: 'Variete.d.oasis.bou.chemma' },
        { variedad: 'Verdot' },
        { variedad: 'Voskeat' },
        { variedad: 'FLAME SEEDLESS' },
        { variedad: 'AK.ouziom' },
        { variedad: '23' },
        { variedad: 'AG.Isioum' },
    ];

    public plantas = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

    public errorMessages = [
        { message: 'Error en captar la superficie de análisis', code: 201 },
        { message: 'La referencia reconocida no es la indicada', code: 202 },
        { message: 'Sin referencia reconocida', code: 203 },
        { message: 'Sin objetos para analizar', code: 204 },
        { message: 'Error en la comunicación', code: 205 },
        { message: 'OK', code: 200 },
    ];

    public variedad: string;
    public estructuraVar: string;
    public planta: string;
    public repeticionVar: string;
    public harvestVar: string;

    public varCtrl: FormControl;
    public filteredVars: Observable<any[]>;

    public btnVariedades = true;


    // variables de segregantes

    public espalderas = Array.apply(null, { length: 10 }).map(Number.call, Number).filter(x => x).map(x => 'E' + x);
    public hileras = Array.apply(null, { length: 30 }).map(Number.call, Number).filter(x => x).map(x => 'H' + x);
    public posiciones = Array.apply(null, { length: 300 }).map(Number.call, Number).filter(x => x).map(x => 'P' + x);

    public espaldera: string;
    public hilera: string;
    public posicion: string;
    public estructuraSeg: string;
    public repeticionSeg: string;
    public harvestSeg: string;

    public customFirst: string;
    public customStructure: string;
    public customRepeticion: string;
    public btnCustom = true;

    public btnSeg = true;

    // variable de otros

    constructor(
        private _http: Http,
        private sanitizer: DomSanitizer,
        private http: HttpClient
    ) {
        this.varCtrl = new FormControl();
        this.filteredVars = this.varCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterStates(state) : this.variedades.slice())
            );
        this.varCtrl.valueChanges.subscribe(x => {
            this.variedad = x;
        });
    }

    ngOnInit() {
        this.picUrl = localStorage.getItem('picUrl') || 'http://192.168.50.4:3000';
    }

    // metodos de variedades

    filterStates(name: string) {
        return this.variedades.filter(state =>
            state.variedad.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    get variedadName() {
        return `${this.variedad}.${this.harvestVar}.${this.planta}.${this.repeticionVar}.${this.estructuraVar}.png`;
    }
    get varNameOK() {
        if (this.variedad && this.planta && this.estructuraVar && this.repeticionVar && this.harvestVar) {
            return true;
        } else { return false; }
    }

    get customName() {
        return `${this.customFirst}.${this.customStructure}.${this.customRepeticion}.png`;
    }

    get customOK() {
        if (this.customFirst && this.customRepeticion && this.customStructure) { return true; }
        return false;
    }

    customReset() {
        this.customFirst = undefined;
        this.customRepeticion = undefined;
        this.customStructure = undefined;
    }

    varReset() {
        this.variedad = undefined;
        this.planta = undefined;
        this.estructuraVar = undefined;
        this.repeticionVar = undefined;
        this.harvestVar = undefined;
    }

    // metodos segreantes

    get segName() {
        return `${this.espaldera}${this.hilera}${this.posicion}.${this.harvestSeg}.${this.repeticionSeg}.${this.estructuraSeg}.png`;
    }
    get segNameOK() {
        if (this.espaldera && this.hilera && this.posicion && this.estructuraSeg && this.repeticionSeg && this.harvestSeg) {
            return true;
        } else { return false; }
    }

    segReset() {
        this.espaldera = undefined;
        this.hilera = undefined;
        this.posicion = undefined;
        this.estructuraSeg = undefined;
        this.repeticionSeg = undefined;
        this.harvestSeg = undefined;
    }

    // common methods

    download2(tipo) {
        this.captureErrorMessage = undefined;
        console.log('download2');
        this.btnVariedades = false;
        this.btnSeg = false;
        this.btnCustom = false;
        let fileName;

        if (tipo === 'var') {
            this.btnVariedades = false;
            fileName = this.variedadName;
        }

        if (tipo === 'seg') {
            this.btnSeg = false;
            fileName = this.segName;
        }

        if (tipo === 'custom') {
            this.btnCustom = false;
            fileName = this.customName;
        }


        const url = this.picUrl + '/capture?name=' + fileName;
        console.log('url', url);

        // tslint:disable-next-line:max-line-length
        this.downloadSub = this._http.get(this.picUrl + `/capture?name=${fileName}&gs=${this.toGs}`, { responseType: ResponseContentType.Blob })
            .subscribe(x => {
                console.log('status', x.status);
                if (x.status > 200 && !this.toGs) {
                    if (x.status === 201) {
                        this.captureErrorMessage = 'Nombre duplicado, cambia el nombre de la foto para registrar.';
                        if (tipo === 'var') { this.btnVariedades = true; }

                        if (tipo === 'seg') { this.btnSeg = true; }

                        if (tipo === 'custom') { this.btnCustom = true; }
                        return;
                    }
                    if (x.status === 202) {
                        this.captureErrorMessage = 'Se agregó de manera offline';
                    }
                }
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(x.blob());

                if (tipo === 'var') {
                    a.download = this.variedadName;
                    // start download
                    a.click();
                    this.btnVariedades = true;
                }

                if (tipo === 'seg') {
                    a.download = this.segName;
                    // start download
                    a.click();
                    this.btnSeg = true;
                }

                if (tipo === 'custom') {
                    a.download = this.customName;
                    // start download
                    a.click();
                    this.btnCustom = true;
                }

                // start download
                this.btnVariedades = true;
                this.erasePreview();

                this.downloadSub.unsubscribe();
            });
    }

    download2_(tipo) {
        this.btnVariedades = false;
        if (tipo === 'var') { this.btnVariedades = false; }

        if (tipo === 'seg') { this.btnSeg = false; }

        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(this.url);

        if (tipo === 'var') {
            a.download = this.variedadName;
            // start download
            a.click();
            this.btnVariedades = true;
        }

        if (tipo === 'seg') {
            a.download = this.segName;
            // start download
            a.click();
            this.btnSeg = true;
        }

        // start download
        this.btnVariedades = true;
        this.erasePreview();
    }

    getMessage(code) {
        const index = this.errorMessages.map(x => x.code).indexOf(code);
        if (index === -1) {
            return { code, message: 'Error no detectado' };
        }
        return this.errorMessages[index];
    }

    preview_() {
        this.previewImg = undefined;
        this.previewImgLoading = true;
        this.previewCode = undefined;
        this.previewMessage = undefined;

        // tslint:disable-next-line:max-line-length
        this._http.get(this.picUrl + '/preview', { responseType: ResponseContentType.Blob })
            .subscribe(x => {
                console.log('estatus', x.status);
                this.previewCode = this.getMessage(x.status).code;
                this.previewMessage = this.getMessage(x.status).message;

                if (x.status === 200) {
                    const url = window.URL.createObjectURL(x.blob());
                    this.url = x.blob();
                    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                    this.previewImg = this.trustedUrl;
                }
                this.previewImgLoading = false;
            }, (e) => {
                console.log('e', e);
                this.previewImgLoading = false;
            });
    }

    preview() {
        this.previewImg = '';
        this.previewImgLoading = true;
        // tslint:disable-next-line:max-line-length
        this._http
            .get(this.picUrl + '/preview', {
                // params: { encoding: 'jpg', quality: 10},
                responseType: ResponseContentType.Blob
            })
            .subscribe(x => {
                // console.log('status', this.getMessageErrorByStatus(x.status));
                this.previewMessage = this.getMessageErrorByStatus(x.status);
                if (x.status > 200) {
                    this.previewImgLoading = false;
                    return;
                }
                // console.log(x);
                const url = window.URL.createObjectURL(x.blob());
                // console.log(url);
                this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                this.previewImg = this.trustedUrl;
                this.previewImgLoading = false;
            });
    }

    preview4(tipo) {
        this.previewImg = '';
        this.previewImgLoading = true;

        this.downloadSub = this._http.get(this.picUrl + '/tomafoto?encoding=jpg', { responseType: ResponseContentType.Blob })
            .map(x => x.blob())
            .subscribe(x => {
                const a = document.createElement('a');
                a.href = window.URL.createObjectURL(x);

                if (tipo === 'var') {
                    a.download = this.variedadName;
                    // start download
                    a.click();
                    this.btnVariedades = true;
                }

                if (tipo === 'seg') {
                    a.download = this.segName;
                    // start download
                    a.click();
                    this.btnSeg = true;
                }

                // start download
                this.btnVariedades = true;
                this.erasePreview();

                this.downloadSub.unsubscribe();
            });
    }

    preview3() {
        // this.previewImg = '';
        // this.previewImgLoading = true;
        fetch('http://192.168.50.71:3000/frame')
            .then((response) => {
                console.log('response', response.status);

                response.headers.forEach(x => {
                    console.log('entry', x);
                });

                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                this.previewImg = this.sanitizer.bypassSecurityTrustResourceUrl(url);
                // this.previewImg = blob;
                this.previewImgLoading = false;
                console.log('blob', blob);

            });
        // this.previewImg = '';
        // this.previewImgLoading = true;
        // // tslint:disable-next-line:max-line-length
        // this.http.get('http://192.168.50.71:3000/frame', { responseType: 'blob', observe: 'response'})
        //     .map(x => {
        //         console.log('headers', x.headers.get('mensaje-cam'));
        //         // console.log('headers', x.headers.keys());
        //         // console.log('keys', x.headers.keys());
        //         return WURL.createObjectURL(x.body);
        //     })
        //     .subscribe(url => {
        //         // console.log('headers.get', x.headers.get('mensaje-cam'));
        //         console.log(url);
        //         this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        //         this.previewImg = this.trustedUrl;
        //         this.previewImgLoading = false;
        //     });
    }

    erasePreview() {
        this.previewImg = '';
    }

    getMessageErrorByStatus(status: number) {
        const index = this.errorMessages.map(x => x.code).indexOf(status);
        if (index !== -1) {
            return this.errorMessages[index].message;
        }
        return null;
    }
}
