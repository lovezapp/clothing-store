const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// db mutations go here
const Mutations = {
  // use async / await because the thing returned to createItem is a Promise
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates since we're not updating the ID
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    // set this up assuming we have authentication
    const where = { id: args.id };
    // 1. Find the item
    const item = await ctx.db.query.item({ where }, `{id, title}`);
    // 2. Check if they have permissions to delete it
    // TODO
    // 3. Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash their password with async function "bcrypt"
    // "salting" the password (the 10 argument passed here) gives it a unique hash algorithm
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    // takes "info" as second argument so it knows what data to return to the client
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set a JWT token as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      expiresIn: "365d" // 1 year cookie duration. Used to be option "expires"
    });
    // Finally, return the user to the browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No user found for email address ${email}`);
    }
    // 2. check of their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password.");
    }
    // 3. generate the JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      expiresIn: "365d" // 1 year cookie duration. Used to be option "expires"
    });
    // 5. return the user
    return user;
  },

  async signout(parent, args, ctx, info) {
    // 1. remove cookie
    ctx.response.clearCookie("token");
    // 2. return message
    return { message: "Goodbye!" };
  }
};

module.exports = Mutations;
