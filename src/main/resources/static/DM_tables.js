//to hit tables
//find right table based on area
//find correct index based on level index
//find correct entry based on ac index
var clericTable = [[25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
                   [23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
                   [21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
                   [20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4],
                   [20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
                   [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                   [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
                  ];

var mageTable = [[26, 25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                 [24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9],
                 [21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
                 [20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3],
                 [20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
                ];

var fighterTable = [  [26, 25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                      [25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
                      [23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
                      [21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
                      [20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4],
                      [20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
                      [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                      [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
                      [16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
                      [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
                   ];

var thiefTable = [[26, 25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                  [24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9],
                  [21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
                  [20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4],
                  [20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
                  [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                  ];

var monsterTable = [ [26, 25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                     [25, 24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
                     [24, 23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9],
                     [23, 22, 21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
                     [21, 20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6],
                     [20, 20, 20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5],
                     [20, 20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3],
                     [20, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
                     [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                     [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
                     [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
                     [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3],
                   ];

//saving throw tables
//find correct table based on area id
//find correct index based on selection
//find correct entry based on level index
//need number or above
var clericSaveTable = [];
var fighterSaveTable = [];
var mageSaveTable = [];
var thiefSaveTable = [];

clericSaveTable ["paralyzation, posion, death magic"] = [10, 9, 7, 6, 5, 4, 2];
clericSaveTable ["petrification, polymorph"] = [13, 12, 10, 9, 8, 7, 5];
clericSaveTable  ["rod, staff, wand"] = [14,13, 11, 10, 9, 8, 6];
clericSaveTable ["breath weapon"] = [16, 15, 13, 12, 11, 10, 8];
clericSaveTable ["spell"] = [15, 14, 12, 11, 10, 9, 7]

fighterSaveTable ["paralyzation, posion, death magic"] = [16, 14, 13, 11, 10, 8, 7, 5, 4, 3];
fighterSaveTable ["petrification, polymorph"] = [17, 15, 14, 12, 11, 9, 8, 6, 5, 4];
fighterSaveTable  ["rod, staff, wand"] = [18, 16, 15, 13, 12, 10, 9, 7, 6, 5];
fighterSaveTable ["breath weapon"] = [20, 17, 16, 13, 12, 9, 8, 5, 4, 4];
fighterSaveTable ["spell"] = [19, 17, 16, 14, 13, 11, 10, 8, 7, 6];

mageSaveTable ["paralyzation, posion, death magic"] = [14, 13, 11, 10, 8];
mageSaveTable ["petrification, polymorph"] = [13, 11, 9, 7, 5];
mageSaveTable  ["rod, staff, wand"] = [11, 9, 7, 5, 3];
mageSaveTable ["breath weapon"] = [15, 13, 11, 9, 7];
mageSaveTable ["spell"] = [12, 10, 8, 6, 4];

thiefSaveTable ["paralyzation, posion, death magic"] = [13, 12, 11, 10, 9, 8];
thiefSaveTable ["petrification, polymorph"] = [12, 11, 10, 9, 8, 7];
thiefSaveTable  ["rod, staff, wand"] = [14, 12, 10, 8, 6, 4];
thiefSaveTable ["breath weapon"] = [16, 15, 14, 13, 12, 11];
thiefSaveTable ["spell"] = [15, 13, 11, 9, 7, 5];


//turn undead table
//find correct index based on selection
//find correct entry based on level
//need number or above
var turnUndeadTable = [];

turnUndeadTable["skeleton"] = [10, 7, 4, "auto", "auto", "dead", "dead", "dead*", "dead*", "dead*"];
turnUndeadTable["zombie"] = [13, 10, 7, "auto", "auto", "dead", "dead", "dead", "dead*", "dead*"];
turnUndeadTable["ghoul"] = [16, 13, 10, 4, "auto", "auto", "dead", "dead", "dead", "dead*"];
turnUndeadTable["shadow"] = [19, 16, 13, 7, 4, "auto", "auto", "dead", "dead", "dead*"];
turnUndeadTable["wight"] = [20, 19, 16, 10, 7, 4, "auto", "auto", "dead", "dead"];
turnUndeadTable["ghast"] = ["nil", 20, 19, 13, 10, 7, 4, "auto", "auto", "dead"];
turnUndeadTable["wraith"] = ["nil", "nil", 20, 16, 13, 10, 7, 4, "auto", "dead"];
turnUndeadTable["mummy"] = ["nil", "nil", "nil", 20, 16, 13, 10, 7, 4, "auto"];
turnUndeadTable["spectre"] = ["nil", "nil", "nil", "nil", 20, 16, 13, 10, 7, "auto"];
turnUndeadTable["vampire"] = ["nil", "nil", "nil", "nil", "nil", 20, 16, 13, 10, 4];
turnUndeadTable["ghost"] = ["nil", "nil", "nil", "nil", "nil", "nil", 20, 16, 13, 7];
turnUndeadTable["lich"] = ["nil", "nil", "nil", "nil", "nil", "nil","nil", 19, 16, 10];
turnUndeadTable["special"] = ["nil", "nil", "nil", "nil", "nil", "nil","nil", 20, 19, 13];


//item saving throw table
//find index based on entry
//display all entries at index in tr
//need to meet or exceed
var itemSaveTable = [];

itemSaveTable["acid"] = [11, 4, 12, 6, 5, 10, 15, 7, 13, 12, 16, 3, 9, 8];
itemSaveTable["crushing blow"] = [16, 18, 6, 19, 20, 4, 0, 6, 14, 20, 11, 17, 13, 10];
itemSaveTable["normal blow"] =[10, 12, 3, 14, 15, 2, 0, 2, 9, 15, 6, 7, 6, 3];
itemSaveTable["disintegration"] = [20, 19, 20, 20, 20, 20, 20, 17, 19, 20, 20, 18, 20, 19];
itemSaveTable["fall"] = [6, 11, 2, 13, 14, 1, 0, 2, 4, 13, 0, 4, 0, 1];
itemSaveTable["fireball"] = [17, 5, 20, 10, 11, 13, 15, 6, 18, 14, 25, 7, 15, 11];
itemSaveTable["magical fire"] = [9, 3, 16, 6, 7, 6, 14, 2, 13, 9, 21, 3, 11, 7];
itemSaveTable["normal fire"] = [3, 2, 13, 3, 4, 4, 13, 1, 5, 5, 18, 2, 9, 5];
itemSaveTable["magical frost"] = [2, 4, 1, 7, 6, 3, 12, 1, 1, 6, 2, 1, 1, 1];
itemSaveTable["lightning bolt"] = [8, 2, 18, 15, 17, 13, 18, 11, 16, 18, 20, 14, 10, 12];
itemSaveTable["electrical discharge/current"] = [1, 1, 1, 5, 1, 1, 15, 1, 1, 1, 1, 2, 1, 1];
