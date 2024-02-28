import  * as bcrypt  from 'bcrypt';
import { hashInterface } from './encription.interface';
export class BcryptService implements hashInterface {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}