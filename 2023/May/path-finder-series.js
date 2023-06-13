// https://www.codewars.com/kata/5765870e190b1472ec0022a2
// Task
// You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return true if you can reach position [N-1, N-1] or false otherwise.

// Empty positions are marked ..
// Walls are marked W.
// Start and exit positions are empty in all test cases.
// Path Finder Series:
// #1: can you reach the exit?
// https://www.codewars.com/kata/5765870e190b1472ec0022a2
// #2: shortest path
// https://www.codewars.com/kata/57658bfa28ed87ecfa00058a
// #3: the Alpinist
// https://www.codewars.com/kata/576986639772456f6f00030c
// #4: where are you?
// https://www.codewars.com/kata/5a0573c446d8435b8e00009f
// #5: there's someone here
// https://www.codewars.com/kata/5a05969cba2a14e541000129

function pathFinder(maze){
    //flooding algorithm : starting from [0, 0], if possible mark cardinal cells as accessible, repeat this process with the newly found accessible cells until no more accessible cells are added.
    //Check if [N-1, N-1] belongs to the accessible cells
    maze = maze.split('\n').map(line => line.split(''))

    maze[0][0] = 'A' //mark [0, 0] as accessible
    const max = maze.length - 1
    let isDone = false
    while(!isDone){
        isDone = true
        for(let l=0 ; l<=max ; l++){
            for(let c=0 ; c<=max ; c++){
                if(maze[l][c]==='A' && markAccessible(l, c)){
                    //if maze[l][c]!=='A', markAccessible is not even called
                    isDone = false
                }
            }
        }
    }

    // console.log(maze);
    return maze[max][max] === 'A'

    function markAccessible(line, col){ //return true if a changed has been made
        let north = markNorthAccessible(line, col)
        let east = markEastAccessible(line, col)
        let west = markWestAccessible(line, col)
        let south = markSouthAccessible(line, col)
        return (north || east || west || south)
    }
   function markNorthAccessible(line, col){ //return true if a changed has been made
        if(line === 0){
            return false
        }else{
            if(maze[line-1][col] !== 'W' && maze[line-1][col] !== 'A'){
                maze[line-1][col] = 'A'
                return true
            }
            return false
        }
    }
    function markEastAccessible(line, col){ //return true if a changed has been made
        if(col === max){
            return false
        }else{
            if(maze[line][col+1] !== 'W' && maze[line][col+1] !== 'A'){
                maze[line][col+1] = 'A'
                return true
            }
            return false
        }
    }
    function markWestAccessible(line, col){ //return true if a changed has been made
        if(col === 0){
            return false
        }else{
            if(maze[line][col-1] !== 'W' && maze[line][col-1] !== 'A'){
                maze[line][col-1] = 'A'
                return true
            }
            return false
        }
    }
    function markSouthAccessible(line, col){ //return true if a changed has been made
        if(line === max){
            return false
        }else{
            if(maze[line+1][col] !== 'W' && maze[line+1][col] !== 'A'){
                maze[line+1][col] = 'A'
                return true
            }
            return false
        }
    }
}

// console.log(pathFinder(`.W.
// .W.
// ...`)) // true
// console.log(pathFinder(`.W.
// .W.
// W..`)) // false

//It takes too much time for big mazes but otherwise works

function pathFinderBis(maze){
    //flooding algorithm with backtracking
    maze = maze.split('\n').map(line => line.split(''))

    maze[0][0] = 'A' //mark [0, 0] as accessible
    const max = maze.length - 1

    markNeighborsAccessible(0, 0)

    // console.log(maze);
    return maze[max][max] === 'A'

    function markNeighborsAccessible(line, col){
        markNorthAccessible(line, col)
        markEastAccessible(line, col)
        markWestAccessible(line, col)
        markSouthAccessible(line, col)
    }


    function markNorthAccessible(line, col){
        if(line === 0){
            return
        }else{
            if(maze[line-1][col] !== 'W' && maze[line-1][col] !== 'A'){
                maze[line-1][col] = 'A'
                markNeighborsAccessible(line-1, col)
            }
            return
        }
    }
    function markEastAccessible(line, col){
        if(col === max){
            return
        }else{
            if(maze[line][col+1] !== 'W' && maze[line][col+1] !== 'A'){
                maze[line][col+1] = 'A'
                markNeighborsAccessible(line, col+1)
            }
            return
        }
    }
    function markWestAccessible(line, col){
        if(col === 0){
            return
        }else{
            if(maze[line][col-1] !== 'W' && maze[line][col-1] !== 'A'){
                maze[line][col-1] = 'A'
                markNeighborsAccessible(line, col-1)
            }
            return
        }
    }
    function markSouthAccessible(line, col){
        if(line === max){
            return
        }else{
            if(maze[line+1][col] !== 'W' && maze[line+1][col] !== 'A'){
                maze[line+1][col] = 'A'
                markNeighborsAccessible(line+1, col)
            }
            return
        }
    }
}

// console.log(pathFinderBis(`.W.
// .W.
// ...`)) // true
// console.log(pathFinderBis(`.W.
// .W.
// W..`)) // false

//======================================================
// https://www.codewars.com/kata/57658bfa28ed87ecfa00058a
// Task
// You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return the minimal number of steps to exit position [N-1, N-1] if it is possible to reach the exit from the starting position. Otherwise, return false.

// Empty positions are marked .. Walls are marked W. Start and exit positions are guaranteed to be empty in all test cases.

function pathFinderShorterPath(maze) {
    //flooding algorithm with weighted cells
    maze = maze.split('\n').map(line => line.split(''))

    maze[0][0] = 'A0' //mark [0, 0] as accessible with a weight of 0
    const max = maze.length - 1
    let lastFloodedCells = [[0, 0]]
    let newlyFloodedCells = []
    let weight = 1

    markNeighborsAccessible()

    // console.log(maze);
    if(maze[max][max][0] === 'A'){
        return Number(maze[max][max].slice(1))
    }else{
        return false
    }


    function markNeighborsAccessible(){
        newlyFloodedCells = []
        //flood the neighboring cells, push the newly flooded cells in the same time
        lastFloodedCells.forEach(([l, c]) => {
            markNorthAccessible(l, c)
            markEastAccessible(l, c)
            markWestAccessible(l, c)
            markSouthAccessible(l, c)
        })
        if(newlyFloodedCells.length > 0){ //if cells have been flooded, rerun the function
            //We could check and stop earlier if the maze[max][max] was flooded
            lastFloodedCells = [...newlyFloodedCells]
            weight++
            markNeighborsAccessible()
        }else{
            return
        }
    }


    function markNorthAccessible(line, col){
        if(line === 0){
            return
        }else{
            if(maze[line-1][col] !== 'W' && maze[line-1][col][0] !== 'A'){
                maze[line-1][col] = `A${weight}`
                newlyFloodedCells.push([line-1, col])
                return
            }
            return
        }
    }
    function markEastAccessible(line, col){
        if(col === max){
            return
        }else{
            if(maze[line][col+1] !== 'W' && maze[line][col+1][0] !== 'A'){
                maze[line][col+1] = `A${weight}`
                newlyFloodedCells.push([line, col+1])
                return
            }
            return
        }
    }
    function markWestAccessible(line, col){
        if(col === 0){
            return
        }else{
            if(maze[line][col-1] !== 'W' && maze[line][col-1][0] !== 'A'){
                maze[line][col-1] = `A${weight}`
                newlyFloodedCells.push([line, col-1])
                return
            }
            return
        }
    }
    function markSouthAccessible(line, col){
        if(line === max){
            return
        }else{
            if(maze[line+1][col] !== 'W' && maze[line+1][col][0] !== 'A'){
                maze[line+1][col] = `A${weight}`
                newlyFloodedCells.push([line+1, col])
                return
            }
            return
        }
    }
}

// console.log(pathFinderShorterPath(`.W.
// .W.
// ...`)) // 4
// console.log(pathFinderShorterPath(`.W.
// .W.
// W..`)) // false

//========================================================
// https://www.codewars.com/kata/576986639772456f6f00030c
// You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).

// Location altitude is defined as an integer number (0-9).

function pathFinderAltitudes(area){
    //Dijkstra's algorithm, from now on we will be using the term distance as a way to represent the sum of altitudes differences from the starting point to another point
    //We will also call nodes each locations

    //readable 2D array
    let grid = area.split('\n').map(line => line.split(''))
    const N = grid.length;
    const distances = Array.from({length: N}, () => Array(N).fill(Infinity)) //keeps track of the minimum distances from the start location to each location in the grid. Initially, all distances are set to infinity except for the start location, which is set to 0.
    const visited = Array.from({length: N}, () => Array(N).fill(false))

    distances[0][0] = 0 //initialize starting point at [0, 0]

    while(true){
        let minDistance = Infinity
        let currentNode = null

        // Find the unvisited node with the smallest distance
        for(let line=0 ; line<N ; line++){
            for(let col=0 ; col<N ;col++){
                if(!visited[line][col] && distances[line][col]<minDistance){
                    minDistance = distances[line][col]
                    currentNode = [line, col]
                }
            }
        }

        if(currentNode === null){
            //no more nodes to visit
            break
        }

        const [curL, curC] = currentNode
        visited[curL][curC] = true
        
        // Update distances of neighbors, knowing our current distance from the start
        const neighbors = getNeighbors(curL, curC);
        neighbors.forEach(([nL, nC]) => {
            const altitudeDifference = Math.abs(grid[curL][curC] - grid[nL][nC])
            const newDistance = distances[curL][curC] + altitudeDifference
            //Update distances if needed
            if(newDistance < distances[nL][nC]){
                distances[nL][nC] = newDistance
            }
        })
    }

    return distances[N - 1][N - 1]

    //check if I don't hop out of the grid
    function isValid(line, col){
        return line < N && line >= 0 && col < N && col >= 0
    }

    //get up to 4 neighbors coordinates
    function getNeighbors(line, col){
        const cardinalDirections = [ [-1, 0] , [0, 1] , [1, 0] , [0, -1] ] //North, East, South, West
        const neighbors = []
        cardinalDirections.forEach(([dL, dC]) => {
            const newL = line + dL
            const newC = col + dC

            if(isValid(newL, newC)){
                neighbors.push([newL, newC])
            }
        })

        return neighbors
    }
}

// console.log(pathFinderAltitudes(`700000
// 077770
// 077770
// 077770
// 077770
// 000007`)) // 14

// console.log(pathFinderAltitudes(`777000
// 007000
// 007000
// 007000
// 007000
// 007777`)) // 0

// console.log(pathFinderAltitudes(`000000
// 000000
// 000000
// 000010
// 000109
// 001010`)) // 4

//=============================================================
