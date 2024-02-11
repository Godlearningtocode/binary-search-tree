#!/usr/bin/env node

function Node(data, left, right) {
    return {
        data: data,
        left: left,
        right: right,
    }
}

function Tree(array) {
    function compareNumbers(a, b) {
        return a - b
    }

    function minValue(root) {
        let minimumValue = root.left;
        while(minimumValue == null) {
            minimumValue = root.data
            root = root.left
        }
        return minimumValue
    }

    array.sort(compareNumbers);
        for(let i = 0; i < array.length; i++) {
            if(array[i] === array[i + 1]) {
                array.splice(i + 1, 1)
            }
        }

    let sorted = array;
    root = buildTree(sorted, 0, sorted.length - 1)
    
    function buildTree(array, start, end, parent = null) {
        if(start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const root = new Node(array[mid], parent);
        root.left = buildTree(array, start, mid - 1, root);
        root.right = buildTree(array, mid + 1, end, root);

        return root;
    }

    function insert(value, parent = this.root) {
        if(parent == null) {return new Node(value, null, null)};
        parent.data < value ? (parent.right = this.insert(value, parent.right)) : (parent.left = this.insert(value, parent.left));
        return parent
    }

    function deleteValue(value, root = this.root) {
        if(root.data === value && root.left == null && root.right == null) return root = null;

        if(value < root.data) {root.left = deleteValue(value, root.left)}
        else if(value > root.data) {root.right = deleteValue(value, root.right)}
        else {
            if(root.left == null) return root.right
            else if(root.right == null) return root.left
            root.data = minValue(root.right)
            root.right = deleteValue(root.data, root.right)
        }

        return root
    }

    function find(value, root = this.root) {
        const node = root;

        if(node == null) return null
        if(node.data !== value) {
            return node.data > value ? find(value, node.left) : find(value, node.right)
        }

        return node
    }

    return {
        buildTree, root, sorted, insert, deleteValue, find
    }
}

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

console.log(test.root);
console.log(test.sorted);
console.log(test.insert(0));
console.log(test.deleteValue(0));
console.log(test.insert(2));
console.log(test.deleteValue(3));
console.log(test.deleteValue(1));
console.log(test.insert(0));
console.log(test.deleteValue(4));
console.log(test.deleteValue(5));
console.log(test.find(6345))