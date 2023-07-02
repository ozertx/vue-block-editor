
export const schemasJTD = {
  "User": {
    "properties": {
      "id": { "type": "string" },
      "username": { "type": "string" },
      // "email": { "type": "string", "format": "email" },
      "password": { "type": "string" },
      "createdAt": { "type": "string" },
      "updatedAt": { "type": "string" }
    },
    "additionalProperties": false
  },
  "AppModel": {
    "additionalProperties": false,
    "properties": {
      "components": { "type": "string" },
      "schemas":  { "type": "string" },
      "config":  { "type": "string" },
    },
    // "required": ["user", "schemas", "data"],
    "definitions": {
      "baselist": {
        "properties": {
          "sss": {
            "type": "string"
          }
        },
      }
    }
  },
  "BlockSchema": {
    "additionalProperties": false,
    "properties": {
      "socets": {
        "properties": {
          "input": {
            "elements": { "type": "string" }
          },
          "output": {
            "elements": { "type": "string" }
          },
          "top": {
            "elements": { "type": "string" }
          },
          "bottom": {
            "elements": { "type": "string" }
          }
        },
        "additionalProperties": false
      },
      "BlockName": { "type": "string" },
      "BlockType": { "type": "string" },
      "BlockInfo": { "type": "string" },
      "BlockConfig": { "type": "string" }
    },
  },
} as const