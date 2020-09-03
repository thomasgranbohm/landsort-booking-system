import { Migration } from '@mikro-orm/migrations';

export class Migration20200903134429 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "room" ("id" serial primary key, "location" varchar(255) not null);');

    this.addSql('create table "bunk" ("id" serial primary key, "location" varchar(255) not null, "room_id" int4 not null);');

    this.addSql('create table "booking" ("uuid" varchar(255) not null, "start_date" timestamptz(0) not null, "end_date" timestamptz(0) not null, "bunk_id" int4 not null);');
    this.addSql('alter table "booking" add constraint "booking_pkey" primary key ("uuid");');

    this.addSql('alter table "bunk" add constraint "bunk_room_id_foreign" foreign key ("room_id") references "room" ("id") on update cascade;');

    this.addSql('alter table "booking" add constraint "booking_bunk_id_foreign" foreign key ("bunk_id") references "bunk" ("id") on update cascade;');
  }

}
