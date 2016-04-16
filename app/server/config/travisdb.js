/**
 * @module travisdb
 * @parent Config
 * This travisdb config file stores the db configurations specially for travis ci server
 */
module.exports = {
    'remote': {
        'url': 'mysql://root:password@localhost:3308/vumix'
    },
    'local': {
        'url': "mysql://root:password@localhost:3306/test"        
    }
};