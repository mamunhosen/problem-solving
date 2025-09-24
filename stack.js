class Stack {
  constructor() {
    this.items = [];
    this.emptyMessage = "Stack is empty";
  }

  isEmpty() {
    return this.items.length === 0;
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) return this.emptyMessage;
    return this.items.pop();
  }

  print() {
    console.log(this.items);
  }

  peek() {
    if (this.isEmpty()) return this.emptyMessage;
    return this.items[this.items.length - 1];
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

stack.print();

stack.pop();
stack.pop();
stack.pop();

stack.print();
console.log(stack.peek());
