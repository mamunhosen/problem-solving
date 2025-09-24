function middleOfList(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

console.log(middleOfList([1, 2, 3, 4, 5]));
