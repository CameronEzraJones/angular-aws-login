export class UserModel {
  id: string;
  address: string;
  birthdate: Date;
  email: string;
  familyName: string;
  gender: string;
  givenName: string;
  locale: string;
  middleName: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  picture: string;
  preferredUsername: string;
  profile: string;
  zoneinfo: string;
  updatedAt: Date;
  website: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.address = obj && obj.address || null;
    this.birthdate = obj && obj.birthdate || null;
    this.email = obj && obj.email || null;
    this.familyName = obj && obj.familyName || null;
    this.gender = obj && obj.gender || null;
    this.givenName = obj && obj.givenName || null;
    this.locale = obj && obj.locale || null;
    this.middleName = obj && obj.middleName || null;
    this.name = obj && obj.name || null;
    this.nickname = obj && obj.nickname || null;
    this.phoneNumber = obj && obj.phoneNumber || null;
    this.picture = obj && obj.picture || null;
    this.preferredUsername = obj && obj.preferredUsername || null;
    this.profile = obj && obj.profile || null;
    this.zoneinfo = obj && obj.zoneinfo || null;
    this.updatedAt = obj && obj.updatedAt || null;
    this.website = obj && obj.website || null;
  }
}
