/**
 * "Static notendagrunnur"
 * Notendur eru harðkóðaðir og ekkert hægt að breyta þeim.
 * Ef við notum notendagagnagrunn, t.d. í postgres, útfærum við leit að notendum
 * hér, ásamt því að passa upp á að lykilorð séu lögleg.
 */

import bcrypt from 'bcrypt';
import { findUserByUsername, findUserById } from './db.js';

export async function comparePasswords(password, user) {
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    return user;
  }

  return false;
}

// Merkjum sem async þó ekki verið að nota await, þar sem þetta er notað í
// app.js gerir ráð fyrir async falli
export async function findByUsername(username) {
  const found = findUserByUsername(username);

  if (found) {
    return found;
  }

  return null;
}

// Merkjum sem async þó ekki verið að nota await, þar sem þetta er notað í
// app.js gerir ráð fyrir async falli
export async function findById(id) {
  const found = findUserById(id);

  if (found) {
    return found;
  }

  return null;
}
