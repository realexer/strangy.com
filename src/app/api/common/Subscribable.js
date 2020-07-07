class Subscribable
{
  constructor(query, onGet = (query) => query, onSubscribe = query => query)
  {
    this.query = query;
    this._onGet = onGet;
    this._onSubscribe = onSubscribe;
  }

  set onGet (callable) {
    this._onGet = callable;
  }

  set onSubscribe (callable) {
    this._onSubscribe = callable;
  }

  async get()
  {
    this.query = this._onGet(this.query, ...arguments);

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

    this.query = this._onSubscribe(this.query, ...args);
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