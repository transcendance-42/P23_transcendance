const test = require('node:test');
const assert = require('node:assert/strict');
const { hashPassword, comparePassword } = require('./password');

test('verifier reconnaît la bonne valeur', async () => {
  const valeurDepart = 'abc123';
  const valeurTransformee = await hashPassword(valeurDepart);
  const estValide = await comparePassword(valeurDepart, valeurTransformee);
  assert.strictEqual(estValide, true);
});

test('verifier rejette une mauvaise valeur', async () => {
  const valeurDepart = 'abc123';
  const valeurTransformee = await hashPassword(valeurDepart);
  const estValide = await comparePassword('autreChose', valeurTransformee);
  assert.strictEqual(estValide, false);
});