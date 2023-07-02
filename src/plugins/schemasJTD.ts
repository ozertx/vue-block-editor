
export const schemasJTD = {
  "User": {
    "properties": {
      "id": { "type": "string" },
      "username": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "password": { "type": "string" },
      "createdAt": { "type": "string", "format": "date-time" },
      "updatedAt": { "type": "string", "format": "date-time" }
    },
    "required": ["id", "username", "email", "password", "createdAt", "updatedAt"],
    "additionalProperties": false
  },
  "AppModel": {
    "properties": {
      "user": { "type": "string", },
      "schemas": { "type": "string", "additionalProperties": true },
      "data": { "type": "string", "additionalProperties": true }
    },
    "required": ["user", "schemas", "data"],
    "additionalProperties": false
  },
  "BlockSchema": {
    "properties": {
      "dependencies": {
        "type": "string",
        "properties": {
          "input": {
            "type": "array",
            "items": { "type": "string" }
          },
          "output": {
            "type": "array",
            "items": { "type": "string" }
          },
          "top": {
            "type": "array",
            "items": { "type": "string" }
          },
          "bottom": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["input", "output", "top", "bottom"],
        "additionalProperties": false
      },
      "BlockName": { "type": "string" },
      "BlockType": { "type": "string" },
      "BlockInfo": { "type": "string" },
      "BlockConfig": { "type": "string", "additionalProperties": true }
    },
    "required": ["dependencies", "BlockName", "BlockType", "BlockInfo", "BlockConfig"],
    "additionalProperties": false
  },
} as const