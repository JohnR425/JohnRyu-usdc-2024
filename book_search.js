/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    var all_results = []

    scannedTextObj.forEach((book) => {
        var book_isbn = book.ISBN
        var book_content = book.Content
        //For each book, examine it's content
        //Only keep content entries which contain a substring of the searchTerm
        var matched_entries = book_content.filter((content_entry) => {
            var entry_text = content_entry.Text
            return entry_text.includes(searchTerm)
        })

        //Take all matched content entries' page and line, and combine it in one object with the book ISBN
        matched_entries.forEach((match) => {
            all_results.push({
                "ISBN": book_isbn,
                "Page": match.Page,
                "Line": match.Line
            })
        })
    });

    var result = {
        "SearchTerm": searchTerm,
        "Results": all_results
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/**
 * General testing function which compares the inputted testInput object to the expectedOutput object.
 * @param {string} testName - The name of the test to be displayed in the console.
 * @param {JSON} testInput - A JSON object representing the input text.
 * @param {JSON} expectedOutput - A JSON object representing the expected output.
 * @param {string} searchTerm - The term to be searched.
 * @returns - Prints PASS or FAIL in console.
 * */ 
function testEquality(testName, testInput, expectedOutput, searchTerm) {
    const actualOutput = findSearchTermInBooks(searchTerm, testInput);
    if(JSON.stringify(actualOutput) === JSON.stringify(expectedOutput)) {
        console.log("PASS: " + testName);
    }
    else {
        console.log("FAIL: " + testName);
        console.log("Expected:", expectedOutput);
        console.log("Received:", actualOutput);
    }
}

/** No Books -> Empty Output */
const noBookExpected = {
    "SearchTerm": "the",
    "Results": []
}
testEquality("No Book", [], noBookExpected, "the");

/** 1 Book, no scanned content -> Empty Output */
const oneBookNo = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]
const oneBookNoExpected = {
    "SearchTerm": "the",
    "Results": []
}
testEquality("One book, no content", oneBookNo, oneBookNoExpected, "the");

/**1 Book, one match*/
const oneBookOne = [
    {
        "Title": "A",
        "ISBN": "123",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            }
        ] 
    }
]
const oneBookOneExpected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "123",
            "Page": 1,
            "Line": 1
        }
    ]
}
testEquality("One book, one match", oneBookOne, oneBookOneExpected, "the");

/**1 Book, many matches*/
const oneBookMany = [
    {
        "Title": "A",
        "ISBN": "123",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            },
            {
                "Page": 2,
                "Line": 2,
                "Text": "the"
            },
            {
                "Page": 3,
                "Line": 3,
                "Text": "the"
            },
            {
                "Page": 4,
                "Line": 4,
                "Text": "the"
            }
        ] 
    }
]
const oneBookManyExpected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "123",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "123",
            "Page": 2,
            "Line": 2
        },
        {
            "ISBN": "123",
            "Page": 3,
            "Line": 3
        },
        {
            "ISBN": "123",
            "Page": 4,
            "Line": 4
        }
    ]
}
testEquality("One book, many matches", oneBookMany, oneBookManyExpected, "the");

/** Multiple Books no matches*/
const manyBooksNo = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [] 
    }
]
const manyBooksNoExpected = {
    "SearchTerm": "the",
    "Results": []
}
testEquality("Many books, no content", manyBooksNo, manyBooksNoExpected, "the");

/** Multiple Books, many matches in one book */
const manyMatchOneBook = [
    {
        "Title": "A",
        "ISBN": "1",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            },
            {
                "Page": 2,
                "Line": 2,
                "Text": "the"
            },
            {
                "Page": 3,
                "Line": 3,
                "Text": "the"
            },
            {
                "Page": 4,
                "Line": 4,
                "Text": "the"
            },
        ] 
    },
    {
        "Title": "B",
        "ISBN": "2",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": ""
            }
        ] 
    }
]
const manyMatchOneBookExpected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "1",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "1",
            "Page": 2,
            "Line": 2
        },
        {
            "ISBN": "1",
            "Page": 3,
            "Line": 3
        },
        {
            "ISBN": "1",
            "Page": 4,
            "Line": 4
        }
    ]
}
testEquality("Many Books, many matches in one book", manyMatchOneBook, manyMatchOneBookExpected, "the");

/** Multiple Books, many matches across books */
const manyMatchBooks = [
    {
        "Title": "A",
        "ISBN": "1",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            }
        ] 
    },
    {
        "Title": "B",
        "ISBN": "2",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            }
        ] 
    },
    {
        "Title": "C",
        "ISBN": "3",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            }
        ] 
    },
    {
        "Title": "D",
        "ISBN": "4",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "the"
            }
        ] 
    }
]
const manyMatchBooksExpected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "1",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "2",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "3",
            "Page": 1,
            "Line": 1
        },
        {
            "ISBN": "4",
            "Page": 1,
            "Line": 1
        }
    ]
}
testEquality("Many books, many matches across books", manyMatchBooks, manyMatchBooksExpected, "the");

/**Case Sensitivity*/
const caseSens = [
    {
        "Title": "A",
        "ISBN": "123",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "thE tHe The THE t_he t he"
            },
            {
                "Page": 2,
                "Line": 2,
                "Text": "the"
            }
        ] 
    }
]
const caseSensExpected = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "123",
            "Page": 2,
            "Line": 2
        }
    ]
}
testEquality("Case Sensitivity", caseSens, caseSensExpected, "the");

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
