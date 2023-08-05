import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  pupulateDB() {
    return 'SEED executed';
  }
}
