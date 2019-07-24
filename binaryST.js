class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
      /* If the existing node does not have a left child, 
         meaning that if the `left` pointer is empty, 
         then we can just instantiate and insert the new node 
         as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node has an existing left child, 
         then we recursively call the `insert` method 
         so the node is added further down the tree */
      else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the node's key 
    then you do the same thing, but on the right - hand side */

      else {
        if (this.right == null) {
          this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    /* If the item you are looking for is less than the root 
       then follow the left child.
       If there is an existing left child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
       then follow the right child.
       If there is an existing right child, 
       then recursively check its left and/or right child
       until you find the item */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child, 
         then you replace the node with its left child */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* And similarly if the node only has a right child 
         then you replace it with its right child */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children then
         simply remove it and any references to it 
         by calling "this._replaceWith(null)" */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }


}

const BST = new BinarySearchTree()

BST.insert(3, 3)
BST.insert(1, 1)
BST.insert(4, 4)
BST.insert(6, 6)
BST.insert(9, 9)
BST.insert(2, 2)
BST.insert(5, 5)
BST.insert(7, 7)

// 3A. console.log(BST)


const BST2 = new BinarySearchTree()
BST2.insert('E', 'E')
BST2.insert('A', 'A')
BST2.insert('S', 'S')
BST2.insert('Y', 'Y')
BST2.insert('Q', 'Q')
BST2.insert('U', 'U')
BST2.insert('E', 'E')
BST2.insert('S', 'S')
BST2.insert('T', 'T')
BST2.insert('I', 'I')
BST2.insert('O', 'O')
BST2.insert('N', 'N')

// 3B. console.log(BST2)

const BST3 = new BinarySearchTree()

BST3.insert(3, 3)
BST3.insert(0, 0)
BST3.insert(1, 1)
BST3.insert(2, 2)

function tree(t) {
  if (!t) {
    return 0;
  }

  return tree(t.left) + t.value + tree(t.right)
}

// 4. console.log(tree(BST3))

// 5. Height of a BST
// Write an algorithm to find the height of a binary search tree.What is the time complexity of your algorithm ?

function heightBST(bst) {
  const branchTotals = []

  if(!bst) {
    return 0
  }

  let count = 0
  while(bst.left) {
    count++
    bst = bst.left
  }
  branchTotals.push(count)

  count = 0
  while(bst.right) {
    count++
    bst = bst.right
  }
  branchTotals.push(count)

  return branchTotals
}

console.log(heightBST(BST3))

// 6. Is it a BST ?
//   Write an algorithm to check whether an arbitrary binary tree is a binary search tree, assuming the tree does not contain duplicates.

