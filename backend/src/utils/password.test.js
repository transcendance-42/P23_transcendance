import { describe, expect, it } from 'vitest';
import { comparePassword, hashPassword } from './password.js';

describe('password utilities', () => {
  it('verifier reconnaît la bonne valeur', async () => {
    const valeurDepart = 'abc123';
    const valeurTransformee = await hashPassword(valeurDepart);
    const estValide = await comparePassword(valeurDepart, valeurTransformee);

    expect(estValide).toBe(true);
  });

  it('verifier rejette une mauvaise valeur', async () => {
    const valeurDepart = 'abc123';
    const valeurTransformee = await hashPassword(valeurDepart);
    const estValide = await comparePassword('autreChose', valeurTransformee);

    expect(estValide).toBe(false);
  });
});