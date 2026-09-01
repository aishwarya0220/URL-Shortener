#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2c410957fe825dbea7fa5ab4459ec054cd4c327baf4e950c0c70f81f9bd2bfbf/contract';
import endContract from '../../snapshots/2c410957fe825dbea7fa5ab4459ec054cd4c327baf4e950c0c70f81f9bd2bfbf/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'link',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('longUrl', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('shortCode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'link',
        constraint: 'link_shortCode_key',
        columns: ['shortCode'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
