var paginationContainer = document.getElementById("pagination-container");
var paginationList = document.getElementById("pagination-list");

var currentPage = 1;
var totalPages = 10; // Example: 10 pages in total

// Function to handle page click
function goToPage(page) {
    // Update current page
    currentPage = page;

    // Remove active class from all pagination items
    var paginationItems = paginationList.getElementsByTagName("a");
    for (var i = 0; i < paginationItems.length; i++) {
        paginationItems[i].classList.remove("active");
    }

    // Add active class to the clicked pagination item
    var selectedPage;
    if (page === 1) {
        selectedPage = paginationList.querySelector(".first");
    } else if (page === totalPages) {
        selectedPage = paginationList.querySelector(".last");
    } else {
        selectedPage = paginationList.querySelector(
            "li:nth-child(" + (page + 2) + ") a"
        );
    }
    selectedPage.classList.add("active");

    // Perform actions for the selected page
    // ...

    // Example: Log the current page
    console.log("Current page:", currentPage);
}

// Function to generate pagination items
function generatePagination() {
    // Clear previous pagination items
    paginationList.innerHTML = "";

    // First button
    var firstButton = document.createElement("li");
    var firstLink = document.createElement("a");
    firstLink.href = "#";
    firstLink.textContent = "First";
    firstLink.classList.add("first");
    firstLink.addEventListener("click", function () {
        if (currentPage !== 1) {
            goToPage(1);
        }
    });
    firstButton.appendChild(firstLink);
    paginationList.appendChild(firstButton);

    // Previous button
    var previousButton = document.createElement("li");
    var previousLink = document.createElement("a");
    previousLink.href = "#";
    previousLink.textContent = "Previous";
    previousLink.addEventListener("click", function () {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });
    previousButton.appendChild(previousLink);
    paginationList.appendChild(previousButton);

    // Generate numbered pagination items
    for (var i = 1; i <= totalPages; i++) {
        var paginationItem = document.createElement("li");
        var paginationLink = document.createElement("a");
        paginationLink.href = "#";
        paginationLink.textContent = i;
        paginationLink.addEventListener("click", function () {
            goToPage(parseInt(this.textContent));
        });

        if (i === currentPage) {
            paginationLink.classList.add("active");
        }

        paginationItem.appendChild(paginationLink);
        paginationList.appendChild(paginationItem);
    }

    // Next button
    var nextButton = document.createElement("li");
    var nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "Next";
    nextLink.addEventListener("click", function () {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });
    nextButton.appendChild(nextLink);
    paginationList.appendChild(nextButton);

    // Last button
    var lastButton = document.createElement("li");
    var lastLink = document.createElement("a");
    lastLink.href = "#";
    lastLink.textContent = "Last";
    lastLink.classList.add("last");
    lastLink.addEventListener("click", function () {
        if (currentPage !== totalPages) {
            goToPage(totalPages);
        }
    });
    lastButton.appendChild(lastLink);
    paginationList.appendChild(lastButton);
}

// Initial pagination generation
generatePagination();
