import * as migration_20250918_061843 from './20250918_061843'

export const migrations = [
  {
    up: migration_20250918_061843.up,
    down: migration_20250918_061843.down,
    name: '20250918_061843',
  },
]
