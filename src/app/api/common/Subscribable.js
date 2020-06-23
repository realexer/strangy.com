class Subscribable
{
  constructor(query, onGet = () => {}, onSubscribe = () => {})
  {
    this.query = query;
    this.onGet = onGet;
    this.onSubscribe = onSubscribe;
  }

  async get()
  {
    this.onGet(...arguments);

    return await this.query.get();
  }

  subscribe(func)
  {
    let args = [];
    let callback = func;

    if(func.args) {
      args = func.args;
      callback = func.func;
    }

    this.onSubscribe(...args);
    return this.query.onSnapshot(callback);
  };
}

class MultiSubscribable
{
  constructor(queries) {
    this.queries = queries;
  }

  async get()
  {
    const results = await Promise.all(this.queries.map((query) => { return query.get()}));

    const values = results.map((res) => {
      return res.docs;
    });

    return values.flat();
  }

  async subscribe(func)
  {
    throw 'Not implemented.';
  }

}

export {Subscribable, MultiSubscribable}