const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
  // static 인스턴스 전체가 공유하는 변수

  /* 
   {

    "email":"rud285@naver.com",
    "name":"경원",
    "password":"1234"
    
  }
  */
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'local',
        },
        snsId: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }

  static associate(db) {
    db.User.hasMany(db.Post)
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    })
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    })
  }
}
