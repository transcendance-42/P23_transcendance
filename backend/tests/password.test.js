import { describe, expect, it } from 'vitest';
import { comparePassword, hashPassword } from '../src/utils/password.js';

describe('password utilities', () => {
  it('verifier reconnaît la bonne valeur', async () => {
    const valeurDepart = 'abc123';
    const valeurTransformee = await hashPassword(valeurDepart);
    const estValide = await comparePassword(valeurDepart, valeurTransformee);

    expect(estValide).toBe(true);
    expect(valeurTransformee).not.toBe(valeurDepart);
    expect(valeurTransformee).toMatch(/^\$2[aby]\$/);
  });

  it('verifier rejette une mauvaise valeur', async () => {
    const valeurDepart = 'abc123';
    const valeurTransformee = await hashPassword(valeurDepart);
    const estValide = await comparePassword('autreChose', valeurTransformee);

    expect(estValide).toBe(false);
    await expect(comparePassword(valeurDepart, 'not-a-bcrypt-hash')).resolves.toBe(
      false,
    );
  });
});