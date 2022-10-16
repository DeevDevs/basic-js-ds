const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  data = "";

  getUnderlyingList() {
    return this.data;
  }

  enqueue(value) {
    if (this.data === "") {
      this.data = new ListNode(value);
    } else {
      let node = this.data;
      while (node.next !== null) {
        node = node.next;
      }
      node.next = new ListNode(value);
    }
  }

  dequeue() {
    let searchedValue;
    if (this.data === "") {
      throw new Error("Queue is empty");
    } else {
      let stack = [];
      let thisNode = this.data;
      while (thisNode !== null) {
        stack.push(thisNode.value);
        thisNode = thisNode.next;
      }
      searchedValue = stack[0];
      this.data = "";
      for (let i = 1; i < stack.length; i++) {
        this.enqueue(stack[i]);
      }
      return searchedValue;
    }
  }
}

module.exports = {
  Queue,
};
