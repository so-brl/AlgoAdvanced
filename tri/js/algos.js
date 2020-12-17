// Converts from degrees to radians.
Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
};


// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
    const GrenobleLat = 45.166667;
    const GrenobleLong = 5.716667;

    const R = 6371; // metres  6371e3 précision au millième

    const phi1 = GrenobleLat.toRadians(); // phi, λ in radians
    const phi2 = Number(city.latitude).toRadians();

    const deltaPhi = (Number(city.latitude) - GrenobleLat).toRadians();
    const deltaLambda = (Number(city.longitude) - GrenobleLong).toRadians();

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(0); // in metres

}


// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(i, j) {
    displayBuffer.push(['swap', i, j]); // Do not delete this line (for display)
    const temp = csvData[i];
    csvData[i] = csvData[j];
    csvData[j] = temp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
    displayBuffer.push(['compare', i, j]); // Do not delete this line (for display)
    return csvData[i].dist < csvData[j].dist;
}

function insertsort() {
    for (let i = 1; i < csvData.length; i++) {
        for (let j = i; j > 0 && isLess(j, j - 1); j--) {
            swap(j, j - 1);
        }
    }
}

function selectionsort() {
    for (let i = 0; i < csvData.length; i++) {
        let temp = i;
        for (let j = temp + 1; j < csvData.length; j++) {
            if (isLess(j, temp)) {
                temp = j;
            }
        }
        swap(i, temp);
    }
}

function bubblesort() {
    let isSwap;
    let iteration = 0;
    do {
        isSwap = false;
        for (let i = 0; i < csvData.length - 1 - iteration; i++) {
            if (!isLess(i, i + 1)) {
                swap(i, i + 1);
                isSwap = true;
            }
        }
        iteration++;
    } while (isSwap);
}

function shellsort() {
    let espacement = [701, 301, 132, 57, 23, 10, 4, 1];
    let length = espacement.length;
    while (espacement[0] < csvData.length && csvData.length > 1600) {
        espacement.unshift(Math.round(espacement[0] * 2.3));
    }
    for (let e = 0; e < espacement.length; e++) {
        for (let gap = espacement.shift(); gap >= 1; gap = espacement.shift()) {
            for (let start = 0; start < length; start++) {
                for (let i = start + gap; i < csvData.length; i += gap) {
                    for (let k = i; k >= gap && isLess(k, k - gap); k -= gap) {
                        swap(k, k - gap);
                    }
                }
            }
        }
    }
}

function mergesort() {
    tri_fusion(0, csvData.length - 1);
}

function tri_fusion(start, end) {
    if (start < end) {
        let middle = parseInt(start + (end - start) / 2);
        tri_fusion(start, middle);
        tri_fusion(middle + 1, end);
        return fusion(start, middle, end);
    }
}

function fusion(start, middle, end) {
    let a = start;
    let b = middle + 1;

    while (a <= middle && b <= end) {
        if (isLess(a, b)) {
            a++;
        } else {
            let index = b;
            while (index !== a) {
                swap(index, index - 1);
                index--;
            }
            start++;
            b++;
            middle++;
        }
    }
}

function heapsort() {

    let length = csvData.length;

    for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
        heapify(csvData, length, i);
    }
    for (let i = length - 1; i >= 0; i--) {
        swap(0, i);
        heapify(csvData, i, 0);
    }
}

function heapify(csvData, length, i) {
    let higher = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < length && !isLess(left, higher)) {
        higher = left;
    }
    if (right < length && !isLess(right, higher)) {
        higher = right;
    }
    if (higher !== i){
        swap(i,higher);
        heapify(csvData,length,higher);
    }

}


function quicksort() {
    let begin = 0;
    let end = csvData.length - 1;
    quickSortWhithParam(begin, end);
}

function quickSortWhithParam(begin, end) {
    if (end > begin) {
        let indicePivot = partition(begin, end);
        quickSortWhithParam(begin, indicePivot - 1);
        quickSortWhithParam(indicePivot + 1, end);
    }
}

function partition(begin, end) {
    let pivot = Math.floor(Math.random() * (end - begin + 1) + begin);
    let k = begin;
    swap(begin, pivot);
    for (let i = begin + 1; i <= end; i++) {
        if (isLess(i, begin)) {
            swap(i, k + 1);
            k++;
        }
    }
    swap(begin, k);
    return k;
}

function quick3sort() {

    //faire l'opération en 3 fois come le trie de shell

    console.log("quick3sort - implement me !");

}

function sort(algo) {
    switch (algo) {
        case 'insert':
            insertsort();
            break;
        case 'select':
            selectionsort();
            break;
        case 'bubble':
            bubblesort();
            break;
        case 'shell':
            shellsort();
            break;
        case 'merge':
            mergesort();
            break;
        case 'heap':
            heapsort();
            break;
        case 'quick':
            quicksort();
            break;
        case 'quick3':
            quick3sort();
            break;
        default:
            throw 'Invalid algorithm ' + algo;
    }
}
