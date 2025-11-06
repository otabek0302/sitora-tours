import * as migration_20251002_122226_initial from './20251002_122226_initial'

export const migrations = [
  {
    up: migration_20251002_122226_initial.up,
    down: migration_20251002_122226_initial.down,
    name: '20251002_122226_initial',
  },
]
