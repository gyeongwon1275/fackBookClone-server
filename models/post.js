const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
  /* 
   {
    "userId":2,
    "contents":"사모예드"
    
  }
  
  */
  static init(sequelize) {
    return super.init(
      {
        contents: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        likes: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        comments: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        likesOfMe: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        img: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }

  static associate(db) {
    db.Post.hasMany(db.Comment)
    db.Post.belongsTo(db.User)
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
  }
}
