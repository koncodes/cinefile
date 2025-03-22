export default class List<T> extends Array<T> {
  constructor(items: T[] = []) {
    super(...items);
  }

  addItem(item: T): this {
    this.push(item);
    return this;
  }

  removeItem(item: T): this {
    const index = this.indexOf(item);
    if (index !== -1) {
      this.splice(index, 1);
    }
    return this;
  }

  clearItems(): this {
    this.splice(0, this.length);
    return this;
  }

  getItems(): T[] {
    return [...this];
  }

  isInList(item: T): boolean {
    return this.includes(item);
  }
}
