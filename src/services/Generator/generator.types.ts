export interface IProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  placeOfBirth: string;
  address: string;
  city: string;
  zipCode: string;
  dateOfLeave: string;
  hourOfLeave: string;
  reasons: string;
}

export enum IReason {
  work = 'travail',
  purchase = 'achats',
  health = 'sante',
  family = 'famille',
  handicap = 'handicap',
  pets = 'sport_animaux',
  summons = 'convocation',
  missions = 'missions',
  children = 'enfants',
}
