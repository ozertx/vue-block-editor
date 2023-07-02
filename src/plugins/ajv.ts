import { schemasJTD } from './schemasJTD';

import Ajv2019, { JSONSchemaType } from "ajv/dist/2019"
import AjvJTD, { JTDSchemaType, JTDDataType, ValidateFunction } from "ajv/dist/jtd"
// const ajv = new Ajv({ removeAdditional: true, useDefaults: true });
// const ajv = new Ajv2019({ removeAdditional: true, useDefaults: true });
const ajvJTD = new AjvJTD({ removeAdditional: true });

export const schemas = { ...schemasJTD } as const


export type Schemas = typeof schemas
export type SchemasKeys = keyof Schemas

// const schemas: Schemas = schemasJTD

export type JTDDataTypeTransform<T> = JTDDataType<T>
export type ValidatorFn<T> = ValidateFunction<T>

export type DataType = {
  [Key in SchemasKeys]: JTDDataTypeTransform<Schemas[Key]>
};

export type Validators = {
  [Key in SchemasKeys]: ValidatorFn<DataType[Key]>
};

function getSchemaValidator<SchemaName extends SchemasKeys>(schemaName: SchemaName): ValidatorFn<DataType[SchemaName]> {

  // const schema: Schemas[SchemaName] = schemas[schemaName]
  const schema: Schemas[SchemaName] = schemas[schemaName]

  const validator: ValidatorFn<DataType[typeof schemaName]> = ajvJTD.compile<DataType[typeof schemaName]>(schema)

  return validator
}

export const validators: Validators = Object.entries(schemasJTD as typeof schemasJTD).reduce((acc, [k, v]) => { acc[k] = getSchemaValidator(k as SchemasKeys); return acc }, {} as any)

export default validators as Validators