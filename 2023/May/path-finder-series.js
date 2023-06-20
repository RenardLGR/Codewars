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

//Same as above

function dijkstra(area){
    let grid = area.split('\n').map(line => line.split(''))
    const N = grid.length
    const distances = Array.from({length:N}, ()=> Array(N).fill(Infinity))
    const visited = Array.from({length:N}, ()=> Array(N).fill(false))

    distances[0][0] = 0 //initialize starting point

    while(true){
        let smallestD = Infinity
        let smallest = null
        //Grab the smallest distance non visited
        for(let line=0 ; line<N ; line++){
            for(let col=0 ; col<N ; col++){
                if(!visited[line][col] && distances[line][col]<smallestD){
                    smallestD = distances[line][col]
                    smallest = [line, col]
                }
            }
        }

        //we have visited every cells
        if(smallest === null){
            break
        }

        visited[smallest[0]][smallest[1]] = true
        
        //set distances to neighbors of the smallest
        let neighboring = getNeighbors(...smallest)
        for(let i=0 ; i<neighboring.length ; i++){
            const nLine = neighboring[i][0]
            const nCol = neighboring[i][1]
            const altitudeDifference = Math.abs(grid[smallest[0]][smallest[1]] - grid[nLine][nCol])

            const newDistance = distances[smallest[0]][smallest[1]] + altitudeDifference
            if(newDistance < distances[nLine][nCol]){
                distances[nLine][nCol] = newDistance
            }
        }
    }

    return distances[N - 1][N - 1]

    function getNeighbors(line, col){
        const neighbors = []
        const cardinalDirections = [ [-1, 0] , [0, 1] , [1, 0] , [0, -1]]
        cardinalDirections.forEach(([dL, dC]) => {
            let newLine = line + dL
            let newCol = col + dC
            //push valid neighbors
            if(newLine>=0 && newCol>=0 && newLine<N && newCol<N){
                neighbors.push([newLine, newCol])
            }
        })

        return neighbors
    }
}

// console.log(dijkstra(`700000
// 077770
// 077770
// 077770
// 077770
// 000007`)) // 14

// console.log(dijkstra(`777000
// 007000
// 007000
// 007000
// 007000
// 007777`)) // 0

// console.log(dijkstra(`000000
// 000000
// 000000
// 000010
// 000109
// 001010`)) // 4

//==============================================================
// https://www.codewars.com/kata/5a0573c446d8435b8e00009f
// Hey, Path Finder, where are you?

function IamHere(path){
    let letters = "rlLR"
    let nums = "0123456789"
    // r is turn right, l is turn left, R is turn right twice, and L is turn left twice (so L & R are U-turns)
    // the number following the letter would indicate how much steps it goes following the given direction, no numbers means we change direction but don't move

    let directions = [ [-1,0] , [0,1] , [1,0] , [0,-1] ] //go north, east, south, west

    let pos = [0, 0] // x and y pos
    let currDirection = 0

    let instructions = []
    // an instruction is a letter followed by its optional number of steps
    for(let i=0 ; i<path.length ; i++){
        if(letters.includes(path[i])){
            let instruction = path[i]
            let j = i + 1
            while(nums.includes(path[j])){
                instruction += path[j]
                j++
            }
            instructions.push(instruction)
        }
    }

    instructions.forEach(i => {
        let d = i[0]
        let steps = Number(i.slice(1)) //as a side note, 'r'.slice(1) returns '' and Number('') returns 0, so we are all good here

        //change the direction
        switch (d) {
            case 'r':
                currDirection = (currDirection + 1) % 4;
                break;

            case 'l':
                currDirection = (currDirection + 3) % 4;
                break;

            case 'R':
                currDirection = (currDirection + 2) % 4; // U-turn
                break;

            case 'L':
                currDirection = (currDirection + 2) % 4; // U-turn
                break;
        
            default:
                break;
        }

        //move if needed
        if(steps > 0){
            pos[0] += directions[currDirection][0] * steps
            pos[1] += directions[currDirection][1] * steps
        }
    })

    return pos
}

// console.log(IamHere('r5L2l4')) // [4,3]

//first attempt, works but actually pos is kept after the calls and we have can have numbers without a direction preceding them, actually let's consider numbers and letters as two types of instructions one is a change of direction, the other is a movement ; pos and currDirection should be global variables (not done here)

function IamHereSecondTry(path){
    let letters = "rlLR"
    let nums = "0123456789"
    // r is turn right, l is turn left, R is turn right twice, and L is turn left twice (so L & R are U-turns)
    // the string will includes numbers and moves not separated by anything, a number calls for moves while a letter calls for a direction change

    let directions = [ [-1,0] , [0,1] , [1,0] , [0,-1] ] //go north, east, south, west

    let pos = [0, 0] // x and y pos
    let currDirection = 0

    let instructions = []
    // an instruction is a letter or a number
    for(let i=0 ; i<path.length ; i++){
        if(letters.includes(path[i])){ //letter instruction
            let instruction = path[i]
            instructions.push(instruction)
        }else{ // number instruction
            let instruction = ''
            let j = i
            while(nums.includes(path[j])){
                instruction += path[j]
                j++
            }
            i = j - 1
            instructions.push(instruction)
        }
    }

    instructions.forEach(i => {
        //change the direction
        if(letters.includes(i)){
            switch (i) {
                case 'r':
                    currDirection = (currDirection + 1) % 4;
                    break;
    
                case 'l':
                    currDirection = (currDirection + 3) % 4;
                    break;
    
                case 'R':
                    currDirection = (currDirection + 2) % 4; // U-turn
                    break;
    
                case 'L':
                    currDirection = (currDirection + 2) % 4; // U-turn
                    break;
            
                default:
                    break;
            }
        }else{
            //move
            let steps = Number(i)
            if(steps > 0){
                pos[0] += directions[currDirection][0] * steps
                pos[1] += directions[currDirection][1] * steps
            }
        }


    })

    return pos
}


//Kata completed :)

//================================================
