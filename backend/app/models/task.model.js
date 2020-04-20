module.exports = (sequelize, Sequelize) => {
    const TaskTable = sequelize.define("tasktables",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taskName: {
            type: Sequelize.STRING
        },
        taskDate: {
            type: Sequelize.DATE
        },
        numberOfResource: {
            type: Sequelize.INTEGER
        },
        numberOfRound: {
            type: Sequelize.INTEGER
        },
        percentOfComplete: {
            type: Sequelize.INTEGER
        },
        ECD: {
            type: Sequelize.DATE
        },
        timeSpent: {
            type: Sequelize.INTEGER
        }

     });
    
    return TaskTable;
};


