const AccessControl = require('accesscontrol');
const roles = require('../dashboard/roles');



const permissions = new AccessControl();

permissions.grant(roles.Admin)
            .resource('user').readAny().createAny().deleteAny().updateAny()
            .resource('agency').readAny().createAny().deleteAny().updateAny();

permissions.grant(roles.Vice)
            .resource('user').readOwn().updateOwn()
            
permissions.grant(roles.Agency)

permissions.grant(roles.Manager)

permissions.grant(roles.Customer)

permissions.grant(roles.Guest)



permissions.lock();

module.exports = permissions;