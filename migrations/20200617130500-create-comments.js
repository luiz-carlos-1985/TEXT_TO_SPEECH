export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('comments',
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      st_comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    }
  );
}
export function down(queryInterface, _Sequelize) {

  return queryInterface.dropTable('comments');
}
