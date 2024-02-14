#!/usr/bin/env node

const { rulesToMonitor } = require("nodemon/lib/monitor/match");

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

    //function levelOrder using a loop
    function levelOrder(callback) {
        let node = root;
        let stack = [node];
        let traversed = []

        if(node == null) return node;

        while(node) {
            traversed.push(node.data)
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
            if(callback) callback(node)
            node = stack[1]
            stack.shift();
        }

        if(!callback) return traversed;
    }

    function inOrder(node = this.root, callback, result = []) {
        if(!node) return []
        if(node == null) return
        inOrder(node.left, callback, result);
        result.push(node.data)
        inOrder(node.right, callback, result)
        if(result) return result 
    }

    function preOrder(node = this.root, callback, result = []) {
        if(!node) return result;
        if(node == null) return
        result.push(node.data);
        preOrder(node.left, callback, result);
        preOrder(node.right, callback, result);
        return result
    }

    function postOrder(node = this.root, callback, result = []) {
        if(!node) return result;
        if(node == null) return

        postOrder(node.left, callback, result);
        postOrder(node.right, callback, result);
        callback ? callback(node) : result.push(node.data)

        return result;
    }

    function height(root = this.root) {
        if(root == null) return -1;
        let left = height(root.left);
        let right = height(root.right)
        return Math.max(left, right) + 1
    }

    function depth(node, root = this.root) {
        if(root == null) return 

        let distance = -1

        if(root.data === node) return distance += 1;
        if((distance = depth(node, root.left)) >= 0) return distance += 1;
        if((distance = depth(node, root.right)) >= 0) return distance += 1;

        return distance
    }

    function isBalanced(node = this.root) {
        if(node == null) return true;
        let left = height(node.left);
        let right = height(node.right);
        let heightDifference = Math .abs(left - right);

        return (heightDifference && isBalanced(node.left) && isBalanced(node.right))
    }

    function rebalance() {
        if(isBalanced(this.root)) return true
        const data = [...new Set(this.inOrder(el => el, root))]
        root = this.buildTree(data, 0, data.length - 1)
        return root
    }

    return {
        buildTree, root, sorted, insert, deleteValue, find, levelOrder, inOrder, preOrder, postOrder, height, depth, isBalanced, rebalance
    }
}

let script = []
function fillScript(script) {
    for(let i = 0; i < 10; i++) {
        script.push(Math.floor((Math.random() * 1000) + 1))
    }

    return script
}

let test = new Tree(fillScript(script))

console.log(test.root);
console.log(test.sorted);
console.log(test.levelOrder());
console.log(test.inOrder());
console.log(test.preOrder());
console.log(test.postOrder());
console.log(test.height());
console.log(test.depth())
console.log(test.isBalanced());
console.log(test.rebalance())
console.log(test.inOrder());
console.log(test.preOrder());
console.log(test.postOrder());