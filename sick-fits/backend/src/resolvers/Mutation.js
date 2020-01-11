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
  }
};

module.exports = Mutations;
