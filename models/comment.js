const Sequelize = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    )
  }
  // associate 다른 모델 과의 관계 설정
  // 여러 댓글은 한 사용자가 작성할 수 있음
  // 댓글은 사용자에 속함
  // N:1 관계
  //  sourceKey id, targetKey id 둘다 User 의 id 임
  // CF>
  // 1:1 관계
  // 사용자 <-> 사용자 개인정보
  // 사용자 개인정보는 사용자에게 속하는 것이기 때문
  // db.User.hasOne(db.Info,{ foreignKey: 'commenter', sourceKey: 'id' })
  // db.Info.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });

  // N:M 관계
  // 게시글, 태그
  // 한 태그는 여러 게시글을 가질 수 있다. ex> javascript -> react, nodejs, frontend, backend...
  // 한 게시글은 여러 태그를 가질 수 있다. ex> frontend -> javscript, react ..
  // 이런 관계를 N:M 관계라 한다.
  // belongsToMany 메서드를 사용한다.
  /* 
  db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'});
  db.Hashtag.belongsToMany(db.Post,{through:'PostHashtag'});
  => 두 모델을 연결시켜주는 새로운 모델(PostHashtag)이 생성됨

  */

  static associate(db) {
    db.Comment.belongsTo(db.User)
    db.Comment.belongsTo(db.Post)
  }
}
