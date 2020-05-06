import * as jwt from 'jsonwebtoken';
import config from '../config/keys';

export class GenerateToken {
  public static generate(data: any) {
    const payload = { id: data.id, name: data.name, email: data.email };
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '7 days',
    });
  }

  public static payload(data: any) {
    return { id: data.id, name: data.name, email: data.email };
  }
}
