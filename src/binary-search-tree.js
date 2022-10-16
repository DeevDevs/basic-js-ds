const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  data = null;
  root() {
    return this.data;
  }

  add(data) {
    this.data = addTheNode(data, this.data);

    function addTheNode(newData, thisNode) {
      if (thisNode === null) return new Node(newData);
      if (thisNode.data === newData) return thisNode;

      if (newData < thisNode.data) {
        thisNode.left = addTheNode(newData, thisNode.left);
      }
      if (newData > thisNode.data) {
        thisNode.right = addTheNode(newData, thisNode.right);
      }
      return thisNode;
    }
  }

  has(data) {
    function isMatching(data, thisNode) {
      if (thisNode === null) return false;
      if (thisNode.data === data) return true;
      if (thisNode.data > data) {
        return isMatching(data, thisNode.left);
      } else return isMatching(data, thisNode.right);
    }
    return isMatching(data, this.data);
  }

  find(data) {
    let foundNode;
    function isMatching(data, thisNode) {
      if (thisNode === null) return (foundNode = thisNode);
      if (thisNode.data === data) return (foundNode = thisNode);
      if (thisNode.data > data) {
        return isMatching(data, thisNode.left);
      } else return isMatching(data, thisNode.right);
    }
    isMatching(data, this.data);
    return foundNode;
  }

  remove(data) {
    // if (!this.has(data)) throw new Error("There is no such value!");

    let parentNode = this.data;
    let foundNode = findNodeAndParent(parentNode, data);
    let side = parentNode.left === foundNode ? "left" : "right";

    function seekForTheBiggestLeft(node) {
      let targetNode = node;
      let parentOfWithdrawnNode;
      let withdrawnNode;
      if (!node.left.right) {
        targetNode.data = node.left.data;
        node.left.left
          ? (targetNode.left = node.left.left)
          : (targetNode.left = null);
        return;
      }
      parentOfWithdrawnNode = node.left;
      withdrawnNode = parentOfWithdrawnNode.right;
      if (withdrawnNode.right) {
        while (withdrawnNode.right) {
          parentOfWithdrawnNode = withdrawnNode;
          withdrawnNode = withdrawnNode.right;
        }
        targetNode.data = withdrawnNode.data;
        parentOfWithdrawnNode.right - withdrawnNode.left;
        return;
      } else {
        targetNode.data = withdrawnNode.data;
        parentOfWithdrawnNode.right - withdrawnNode.left;
      }
    }

    function findNodeAndParent(node, searchedData) {
      if (node.data === searchedData) return node;
      if (node.data < data && node.right !== null) {
        parentNode = node;
        return findNodeAndParent(node.right, searchedData);
      }
      if (node.data > data && node.left !== null) {
        parentNode = node;
        return findNodeAndParent(node.left, searchedData);
      }
    }

    if (this.data.data === data) {
      if (!this.data.left && this.data.right) {
        return (this.data = this.data.right);
      } else if (this.data.left && !this.data.right) {
        return (this.data = this.data.left);
      } else if (!this.data.left && !this.data.right) {
        return (this.data = null);
      } else {
        seekForTheBiggestLeft(this.data);
      }
    }

    if (!foundNode.left && foundNode.right) {
      return (parentNode[side] = foundNode.right);
    } else if (foundNode.left && !foundNode.right) {
      return (parentNode[side] = foundNode.left);
    } else if (!foundNode.left && !foundNode.right) {
      return (parentNode[side] = null);
    } else {
      return seekForTheBiggestLeft(foundNode);
    }
  }

  min() {
    if (!this.data) return null;
    let minValue = this.data.data;
    if (!this.data.left) return minValue;
    if (this.data.left) {
      let node = this.data;
      while (node.left !== null) {
        node = node.left;
      }
      minValue = node.data;
    }
    return minValue;
  }

  max() {
    if (!this.data) return null;
    let maxValue = this.data.data;
    if (!this.data.right) return maxValue;
    if (this.data.right) {
      let node = this.data;
      while (node.right !== null) {
        node = node.right;
      }
      maxValue = node.data;
    }
    return maxValue;
  }
}

module.exports = {
  BinarySearchTree,
};
