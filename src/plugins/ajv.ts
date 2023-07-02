import { schemasJTD } from './schemasJTD';

import Ajv2019, { JSONSchemaType } from "ajv/dist/2019"
import AjvJTD, { JTDSchemaType, JTDDataType, ValidateFunction } from "ajv/dist/jtd"
// const ajv = new Ajv({ removeAdditional: true, useDefaults: true });
// const ajv = new Ajv2019({ removeAdditional: true, useDefaults: true });
import cloneDeep from 'lodash.clonedeep'

export const schemas = { ...schemasJTD } as const

const ajvJTD = new AjvJTD({ removeAdditional: true });

export type Schemas = typeof schemas
export type SchemasKeys = keyof Schemas

// const schemas: Schemas = schemasJTD

export type JTDDataTypeTransform<T> = JTDDataType<T>
export type ValidatorFn<T> = ValidateFunction<T>

export type DataType = {
  [Key in SchemasKeys]: JTDDataTypeTransform<Schemas[Key]>
};

export interface IAppValidatorParam {
  throwIfInvalid?: boolean,
  clone?: boolean
}

export type AppValidator<Key extends SchemasKeys> = {
  (data: any, params: IAppValidatorParam ): DataType[Key] | null;
  ajvValidator: ValidatorFn<DataType[Key]>
}

export type Validators = {
  [Key in SchemasKeys]: AppValidator<Key>
};

function getSchemaValidator<SchemaName extends SchemasKeys>(schemaName: SchemaName): AppValidator<SchemaName> {

  // const schema: Schemas[SchemaName] = schemas[schemaName]
  const schema: Schemas[SchemaName] = schemas[schemaName]

  
  const validator: ValidatorFn<DataType[SchemaName]> = ajvJTD.compile<DataType[SchemaName]>(schema)
  

  const appValidator: AppValidator<SchemaName> = Object.assign(
    function (data: any, params: IAppValidatorParam): DataType[SchemaName] | null {
      const { throwIfInvalid, clone } = params 
      if (validator(data)) {
        if (clone) {
          return cloneDeep(data)
        }
        else return data as DataType[SchemaName]
      }
      else if (throwIfInvalid) {
        console.log("validate item", cloneDeep(data))
        console.log("validate error", validator.errors)
        throw new Error('validation error' )
      }
      else return null

    },
    { ajvValidator: validator }
  )

  return appValidator
}

export const validators: Validators = Object.entries(schemasJTD as typeof schemasJTD).reduce((acc, [k, v]) => { acc[k] = getSchemaValidator(k as SchemasKeys); return acc }, {} as any)

export default validators as Validators