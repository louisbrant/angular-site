import {CountryInterface} from "src/app/shared/interfaces/country";

export interface ProfileSinglesFinalsInterface {
  country: {
    code: string;
    name: string;
  }
  court: string;
  date: string;
  name: string;
}

export interface SinglesInterface {
  court: string;
  country: CountryInterface;
  name: string;
  date: string;
}

export interface TitleFinalInterface {
  titles: SinglesInterface[];
  finals: SinglesInterface[];
}
