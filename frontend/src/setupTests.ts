// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Поліфіл для TextEncoder та TextDecoder
import { TextEncoder, TextDecoder } from 'util';
// НОВИЙ поліфіл для window.crypto
// Node.js має вбудований модуль webcrypto з версії 15+
import * as nodeCrypto from 'crypto';

Object.assign(global, { TextDecoder, TextEncoder });

Object.defineProperty(global, 'crypto', {
  value: {
    // Використовуємо webcrypto з Node.js для імітації браузерного API
    subtle: nodeCrypto.webcrypto.subtle,
    getRandomValues: nodeCrypto.webcrypto.getRandomValues,
  },
});
