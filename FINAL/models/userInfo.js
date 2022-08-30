const Sequelize = require('sequelize');

class UserInfo extends Sequelize.Model {
    static init(sequelize) {
        const b = {
            age : {
                type : Sequelize.NUMBER(2),
                allowNull: true,
            }, 
            gender : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            address : {
                type: Sequelize.STRING(3),
                allowNull : true,
            },
        };


        const a = {
            sequelize,
            timeStamps : true,
            underscored: false,
            modelName : 'UserInfo',
            tableName: 'userInfo',
            paranoid: true,
            charset: 'uft8mb4',
            collate: 'utf8mb4_unicode_ci',
        };

        return super.init(b, a);
    }

    static associate(db) {
        db.UserInfo.belongsTo(db.User);
    }
}

module.exports = UserInfo;