const { emailRegex, passwordRegex } = require('../utils/regex');

describe('emailRegex', () => {
  test('debería pasar para un correo electrónico válido', () => {
    expect(emailRegex.test('usuario@example.com')).toBe(true);
  });

  test('debería fallar para un correo electrónico inválido', () => {
    expect(emailRegex.test('usuarioexample.com')).toBe(false);
  });
});

describe('passwordRegex', () => {
  test('debería pasar para una contraseña válida', () => {
    expect(passwordRegex.test('Manolit@8')).toBe(true);
  });

  test('debería fallar para una contraseña inválida', () => {
    expect(passwordRegex.test('manolit8')).toBe(false);
  });
});
