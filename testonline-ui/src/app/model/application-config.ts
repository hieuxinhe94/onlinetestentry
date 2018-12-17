export class ApplicationConfig {
  key: string;
  val: string;


  constructor(data: any) {
    this.key = data.key;
    this.val = data.val;
  }

}

export enum Language {
  VN, EN, JP
}
