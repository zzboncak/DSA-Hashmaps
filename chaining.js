class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertFirst(item) {
        this.head = new _Node(item, null);
    }

    insertLast(item) {
        if(this.head === null) {
            this.insertFirst(item);
        }
        else {
            let tempNode = this.head;
            while(tempNode.next !== null) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
    }

    insertBefore(item, itemToFollow) {
        //if the item is to be inserted before the first item
        if(this.head.value === itemToFollow || this.head === null) {
            this.insertFirst(item);
        }
        //if itemToFollow doesn't exist in the list, return out of the function
        let currNode = this.head;

        let previousNode = this.head;
        while((currNode !== null) && (currNode.value !== itemToFollow)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if(currNode === null) {
            console.log("Could not find desired position");
        }
        previousNode.next = new _Node(item, currNode);
    }

    insertAfter(item, key) {
        let currNode = this.head;

        let nextNode = this.head.next;

        while((currNode !== null) && (currNode.value !== key)) {
            currNode = currNode.next;
            nextNode = nextNode.next;
        }
        if(currNode === null) {
            console.log("Could not find desired position");
        }
        currNode.next = new _Node(item, nextNode);
    }

    insertAt(item, position) {
        let currNode = this.head;

        let nextNode = this.head.next;

        for(let i = 1; i < position; i ++) {
            currNode = currNode.next;
            nextNode = nextNode.next;
        }
        currNode.next = new _Node(item, nextNode);
    }

    remove(item) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }

        let currNode = this.head;

        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
        }
        previousNode.next = currNode.next;
    }

    find(item) {
        let currNode = this.head;

        if(!this.head) {
            return null;
        }

        while (currNode.value !== item) {
            if(currNode.next === null) {
                return null;
            }
            else {
                currNode = currNode.next;
            }
        }

        return currNode;
    }

    printList() {
        let current = this.head;

        while (current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }

}

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > this.MAX_LOAD_RATIO) {
            this._resize(this._capacity * this.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (this._hashTable[index] === undefined) {
            let newList = new LinkedList();
            this._hashTable[index] = newList;
            newList.insertFirst({key: value});
        } else {
            this._hashTable[index].insertLast({key: value});
        }

        this.length++;
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const index = hash % this._capacity;

        return index;

        // for (let i=start; i<start + this._capacity; i++) {
        //     const index = i % this._capacity;
        //     const slot = this._hashTable[index];
        //     if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        //         return index;
        //     }
        // }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        // need to put another for loop to check each linked list item

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = HashMap;