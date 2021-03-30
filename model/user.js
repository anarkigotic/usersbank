const Validator = require('jsonschema').Validator;
const v = new Validator();

const personEmployedShemma = {
    "id": "/SimplePerson",
    "type": "object",
    "properties": {
        "id": { type: 'number' },
        "name": { type: 'string' },
        "lastName": { type: 'string' },
        "email": { type: 'string', format: "email" },
        "password": { type: 'string' }
    },
    "required": ["name","lastName","lastName","email","password"],

}
v.addSchema(personEmployedShemma, '/SimplePerson');
let validateUser = (object) => {
    let { errors } = v.validate(object, personEmployedShemma)
    return errors
}

module.exports = {
    validateUser
}