export default class List<T> {
  private items: T[];

  constructor(items: T[] = []) {
    this.items = [...items];
  }

  addItem(item: T): this {
    this.items.push(item);
    return this;
  }

  removeItem(item: T): this {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    return this;
  }

  removeBy(predicate: (item: T) => boolean): this {
    this.items = this.items.filter((item) => !predicate(item));
    return this;
  }

  clearItems(): this {
    this.items = [];
    return this;
  }

  getItems(): T[] {
    return [...this.items];
  }

  isInList(item: T): boolean {
    return this.items.includes(item);
  }

  get length(): number {
    return this.items.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.items[Symbol.iterator]();
  }

  at(index: number): T | undefined {
    return this.items[index];
  }

  map<U>(callback: (item: T) => U): List<U> {
    return new List(this.items.map(callback));
  }
}
