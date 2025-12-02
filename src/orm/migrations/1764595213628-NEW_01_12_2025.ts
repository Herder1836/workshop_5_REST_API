import { MigrationInterface, QueryRunner } from 'typeorm';

export class NEW011220251764595213628 implements MigrationInterface {
  name = 'NEW011220251764595213628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "fuel_min_price" (
                "fmp_id" SERIAL NOT NULL,
                "min_price" numeric(10, 2) NOT NULL,
                "date_from" TIMESTAMP NOT NULL,
                "fuel_fuel_id" integer,
                CONSTRAINT "PK_7f6b453c0dcac57a5abff564a05" PRIMARY KEY ("fmp_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "supplier" (
                "supplier_id" SERIAL NOT NULL,
                "company_name" character varying NOT NULL,
                "contact_person" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                CONSTRAINT "PK_e0f8ee60663218082b83251cd85" PRIMARY KEY ("supplier_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "supply" (
                "supply_id" SERIAL NOT NULL,
                "volume" numeric(10, 2) NOT NULL,
                "delivery_date" TIMESTAMP NOT NULL,
                "supplier_supplier_id" integer,
                "fuel_fuel_id" integer,
                CONSTRAINT "PK_ea803c518d575c82cd33f5668df" PRIMARY KEY ("supply_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "fuel" (
                "fuel_id" SERIAL NOT NULL,
                "fuel_name" character varying NOT NULL,
                "price" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_5a4271e79f33a41d385699f3e5f" PRIMARY KEY ("fuel_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "gas_station" (
                "azs_id" SERIAL NOT NULL,
                "azs_name" character varying NOT NULL,
                "address" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                CONSTRAINT "PK_74e8f6a27a9e868e4ff417952a7" PRIMARY KEY ("azs_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "operator_log" (
                "log_id" SERIAL NOT NULL,
                "action" character varying NOT NULL,
                "changed_at" TIMESTAMP NOT NULL DEFAULT now(),
                "old_data" jsonb,
                "new_data" jsonb,
                "operator_operator_id" integer NOT NULL,
                CONSTRAINT "PK_0786f63946f9403a9c7a02e7242" PRIMARY KEY ("log_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "product" (
                "product_id" SERIAL NOT NULL,
                "product_name" character varying NOT NULL,
                "price" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "shop_sales" (
                "sale_id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "total_price" numeric(10, 2) NOT NULL,
                "payment_method" character varying NOT NULL,
                "date_time" TIMESTAMP NOT NULL,
                "client_client_id" integer,
                "operator_operator_id" integer NOT NULL,
                "product_product_id" integer NOT NULL,
                CONSTRAINT "PK_79ea92f410cd2602684e1c6d472" PRIMARY KEY ("sale_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "operator" (
                "operator_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "shift_number" integer NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" "public"."operator_role_enum" NOT NULL DEFAULT 'OPERATOR',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "gasstation_azs_id" integer,
                CONSTRAINT "UQ_62277fe2d2a98818e7c47cc9071" UNIQUE ("username"),
                CONSTRAINT "PK_ca18369599805e0d60e4ac06525" PRIMARY KEY ("operator_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "fueling" (
                "fueling_id" SERIAL NOT NULL,
                "volume" numeric(10, 2),
                "client_client_id" integer,
                "operator_operator_id" integer,
                "fuel_fuel_id" integer,
                CONSTRAINT "PK_5f8306ab0e358728b1985e87905" PRIMARY KEY ("fueling_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "client" (
                "client_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "phone_number" character varying,
                CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "finance" (
                "finance_id" SERIAL NOT NULL,
                "amount" numeric(10, 2) NOT NULL,
                "date_time" TIMESTAMP NOT NULL,
                "client_client_id" integer,
                "sale_sale_id" integer,
                "fueling_fueling_id" integer,
                "gasstation_azs_id" integer,
                CONSTRAINT "PK_de81a6cd506696c08f6b7f93d98" PRIMARY KEY ("finance_id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "fuel_min_price"
            ADD CONSTRAINT "FK_365dd3e23a1fd1c8a9db3eab6b0" FOREIGN KEY ("fuel_fuel_id") REFERENCES "fuel"("fuel_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "supply"
            ADD CONSTRAINT "FK_ce053f8bd90fa13a348faff7c30" FOREIGN KEY ("supplier_supplier_id") REFERENCES "supplier"("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "supply"
            ADD CONSTRAINT "FK_cce12b6f5c09b6ccfe9b927b48f" FOREIGN KEY ("fuel_fuel_id") REFERENCES "fuel"("fuel_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "operator_log"
            ADD CONSTRAINT "FK_0df2dbc58b16314e3408fb6add5" FOREIGN KEY ("operator_operator_id") REFERENCES "operator"("operator_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales"
            ADD CONSTRAINT "FK_13bacee6486e8fe6132c015f1d6" FOREIGN KEY ("client_client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales"
            ADD CONSTRAINT "FK_b50beba2947b9935bb21691eacb" FOREIGN KEY ("operator_operator_id") REFERENCES "operator"("operator_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales"
            ADD CONSTRAINT "FK_8a77ee8d861ca26d9ec14069811" FOREIGN KEY ("product_product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "operator"
            ADD CONSTRAINT "FK_a939b7480334781d9f31b69b488" FOREIGN KEY ("gasstation_azs_id") REFERENCES "gas_station"("azs_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling"
            ADD CONSTRAINT "FK_51551d53992760c84a5fe706d6d" FOREIGN KEY ("client_client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling"
            ADD CONSTRAINT "FK_7af1af2b1a0b4e5b37000f05083" FOREIGN KEY ("operator_operator_id") REFERENCES "operator"("operator_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling"
            ADD CONSTRAINT "FK_76608b0b1e13fa3e173a85cafdf" FOREIGN KEY ("fuel_fuel_id") REFERENCES "fuel"("fuel_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "finance"
            ADD CONSTRAINT "FK_8d2dc45b4f120b0a6d5006a504c" FOREIGN KEY ("client_client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "finance"
            ADD CONSTRAINT "FK_5947198464e8e098005150a4359" FOREIGN KEY ("sale_sale_id") REFERENCES "shop_sales"("sale_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "finance"
            ADD CONSTRAINT "FK_34c4d0f06407b3c9ecef061a0ff" FOREIGN KEY ("fueling_fueling_id") REFERENCES "fueling"("fueling_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "finance"
            ADD CONSTRAINT "FK_5706be0e29905fdebb2e0124303" FOREIGN KEY ("gasstation_azs_id") REFERENCES "gas_station"("azs_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "finance" DROP CONSTRAINT "FK_5706be0e29905fdebb2e0124303"
        `);
    await queryRunner.query(`
            ALTER TABLE "finance" DROP CONSTRAINT "FK_34c4d0f06407b3c9ecef061a0ff"
        `);
    await queryRunner.query(`
            ALTER TABLE "finance" DROP CONSTRAINT "FK_5947198464e8e098005150a4359"
        `);
    await queryRunner.query(`
            ALTER TABLE "finance" DROP CONSTRAINT "FK_8d2dc45b4f120b0a6d5006a504c"
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling" DROP CONSTRAINT "FK_76608b0b1e13fa3e173a85cafdf"
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling" DROP CONSTRAINT "FK_7af1af2b1a0b4e5b37000f05083"
        `);
    await queryRunner.query(`
            ALTER TABLE "fueling" DROP CONSTRAINT "FK_51551d53992760c84a5fe706d6d"
        `);
    await queryRunner.query(`
            ALTER TABLE "operator" DROP CONSTRAINT "FK_a939b7480334781d9f31b69b488"
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales" DROP CONSTRAINT "FK_8a77ee8d861ca26d9ec14069811"
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales" DROP CONSTRAINT "FK_b50beba2947b9935bb21691eacb"
        `);
    await queryRunner.query(`
            ALTER TABLE "shop_sales" DROP CONSTRAINT "FK_13bacee6486e8fe6132c015f1d6"
        `);
    await queryRunner.query(`
            ALTER TABLE "operator_log" DROP CONSTRAINT "FK_0df2dbc58b16314e3408fb6add5"
        `);
    await queryRunner.query(`
            ALTER TABLE "supply" DROP CONSTRAINT "FK_cce12b6f5c09b6ccfe9b927b48f"
        `);
    await queryRunner.query(`
            ALTER TABLE "supply" DROP CONSTRAINT "FK_ce053f8bd90fa13a348faff7c30"
        `);
    await queryRunner.query(`
            ALTER TABLE "fuel_min_price" DROP CONSTRAINT "FK_365dd3e23a1fd1c8a9db3eab6b0"
        `);
    await queryRunner.query(`
            DROP TABLE "finance"
        `);
    await queryRunner.query(`
            DROP TABLE "client"
        `);
    await queryRunner.query(`
            DROP TABLE "fueling"
        `);
    await queryRunner.query(`
            DROP TABLE "operator"
        `);
    await queryRunner.query(`
            DROP TABLE "shop_sales"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
    await queryRunner.query(`
            DROP TABLE "operator_log"
        `);
    await queryRunner.query(`
            DROP TABLE "gas_station"
        `);
    await queryRunner.query(`
            DROP TABLE "fuel"
        `);
    await queryRunner.query(`
            DROP TABLE "supply"
        `);
    await queryRunner.query(`
            DROP TABLE "supplier"
        `);
    await queryRunner.query(`
            DROP TABLE "fuel_min_price"
        `);
  }
}
