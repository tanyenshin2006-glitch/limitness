import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneSchema = z.string()
  .refine((val) => {
    // Parses and validates against international standard database
    const phoneNumber = parsePhoneNumberFromString(val);
    return phoneNumber ? phoneNumber.isValid() : false;
  }, {
    message: "Invalid phone number",
});
