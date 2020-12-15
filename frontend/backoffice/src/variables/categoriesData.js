export class Category {
  constructor(id) {
    this.id = id;
  }
}

export const categories = [new Category(1), new Category(2), new Category(3), new Category(4), new Category(5)];

export const getCategory = categoryId => {
  return categories.filter(category => category.id === categoryId)[0];
};
