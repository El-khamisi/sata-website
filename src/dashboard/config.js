const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Agency = require('../models/agency');

const router = require('../routes')

//register mongoose adapter
AdminJS.registerAdapter(require('@adminjs/mongoose'));

// Pass all configuration settings to AdminJS
const adminJs = new AdminJS({
    resources: [
      {
        resource: User,
        options: {
          properties: {
            encryptedPassword: { isVisible: false },
            password: {
              type: 'string',
              isVisible: { list: false, edit: true, filter: false, show: false },
            },
          },
        },
        actions: {
          new: {
            before: async (req) => {
              if (req.body.password) {
                req.body = {
                  ...req.body,
                  encryptedPassword: await bcrypt.hash(req.payload.password, 10),
                  password: undefined,
                };
              }
              return req;
            },
          },
        },
      },
      {
        resource: Agency,
        options: {
          properties: {
            encryptedPassword: { isVisible: false },
            password: {
              type: 'string',
              isVisible: { list: false, edit: true, filter: false, show: false },
            },
          },
        },
        actions: {
          new: {
            before: async (req) => {
                console.log(req.payload)
              if (req.payload.password) {
                req.payload = {
                  ...req.payload,
                  encryptedPassword: await bcrypt.hash(req.payload.password, 10),
                  password: undefined,
                };
              }
              return req;
            },
          },
        },
      },
    ],
    rootPath: '/admin',
  });

const authRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email })
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword)
        if (matched) {
          return user
        }
      }
      return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})
module.exports = (app)=>{
    app.use(adminJs.options.rootPath,authRouter)
}


