export class TokenUtil {
  static decodeToken(token: string): any {
    try {
      // Decode JWT token
      const [headerBase64, payloadBase64] = token.split('.');

      if (!headerBase64 || !payloadBase64) {
        throw new Error('Invalid token format');
      }

      // Decode payload
      const payload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
      const decodedPayload = JSON.parse(payload);

      // Validate required fields
      if (!decodedPayload.id) {
        throw new Error('Token payload must contain customer id');
      }

      return {
        id: decodedPayload.id,
        email: decodedPayload.email,
        firstName: decodedPayload.firstName,
        lastName: decodedPayload.lastName,
        // Add other customer fields as needed
      };
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }
}
