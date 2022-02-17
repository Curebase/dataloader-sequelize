var _sequelize = require('sequelize');

const MODEL = 'MODEL';
const ASSOCIATION = 'ASSOCIATION';
const SEQUELIZE = 'SEQUELIZE';

function methods(version) {
  return {
    findByPk: ['findByPk']
  };
}

function method(target, alias) {
  if (type(target) === MODEL) {
    return methods(target.sequelize.constructor.version)[alias][0];
  }
  throw new Error('Unknown target');
}

function type(target) {
  if (target.associationType) {
    return ASSOCIATION;
  } else if (/(SequelizeModel|class extends Model)/.test(target.toString()) || _sequelize.Model.isPrototypeOf(target)) {
    return MODEL;
  } else {
    return SEQUELIZE;
  }
}

module.exports = {
  methods: methods,
  method: method,
  type: type,
  MODEL: MODEL,
  ASSOCIATION: ASSOCIATION,
  SEQUELIZE: SEQUELIZE,
}
