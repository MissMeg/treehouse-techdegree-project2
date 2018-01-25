$(document).ready(() => {
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    ////////////////////////////PAGINATION////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    
    //Get the total number of students on the page via class name
    const numberOfStudents = $('.student-item').length;
    
    //Get the number of pages needed to display 10 students per page
    const numberOfPages = Math.ceil(numberOfStudents / 10);
    
    //Give each student li item data-page attribute for showing/hiding the correct students
    const setPages = (element) => {
        //starting a counter to count to 10
        let counter = 0;
        //starting page counter
        let pageCounter = 1;
        //function to set the correct page number to each item for the inputted element
        element.each((index, el) => {
            //making sure we reach the correct number of pages
            if (pageCounter <= numberOfPages) {
                //checking to see if we have reached 10 items yet - adding correct page number and adding 1 to the counter
                if (counter < 10) {
                    $(el).attr('data-page', pageCounter);
                } else {
                    //resetting the counter to count to 10 again and changing to the next page
                    pageCounter++;
                    $(el).attr('data-page', pageCounter);
                    counter = 0;
                }
            }
            //adding one to the counter each time
            counter++;
        });
    }
    
    //call function to number the items
    setPages($('li'));
    
    //create pagination links by looping through thr number of pages to create a li+a for each
    const pagination = (pages) => {
        let html = '<div class="pagination"><ul>';
        for (let i=1; i<=pages; i++) {
            html+= `<li><a href="#">${i}</a></li>`;
        }
        html+= '</ul></div>';
        //adding the list to the page
        $('.student-list').append(html);
        //giving the first page the active class
        $('.pagination li').first().addClass('active');
    }
    
    //calling the pagination function to print out the links
    pagination(numberOfPages);
    
    
    
    //show only the first 10 students when the page loads
    //also adding the search bar when the page loads
    $('.student-item').hide();
    $(`[data-page="1"]`).show();
    $('.page-header').append(
        '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>'
    );
        
    
    
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////SEARCH//////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    
    //Search through the students and find those that match the search
    const findPerson = () => {
        //get the item that was searched
        let searchItem = $('.student-search input').val();
        //find all items that contain the searched item
        let returnedItems = $(`li:contains('${searchItem}')`)
        //return the search box value to empty
        $('.student-search input').val('');
        //return the results to create the page
        return returnedItems;
    }
    //get number of pages needed for search results to show 10 per page & show the results
    const searchPages = (results) => {
        //if there are no results - hide pagination, hide list, tell user no results found
        if (results[0] === undefined) {
            $('.student-item').hide();
            $('.pagination').hide();
            $('.student-list').prepend('<p id="noData">No Student(s) Found</p>');
        //if there are results then make sure to hide any previous "no students found" messages
        } else {
            $('#noData').remove();
            //determine the number of pages needed to show results
            let numberSearchPages = Math.ceil(results.length / 10);
            //remove previous pagination and set the new pagination
            $('.pagination').remove();
            pagination(numberSearchPages);
            //set counters for updating the data-page attribute for the search results
            let counter = 0;
            let pageCounter = 1;
            //clear previous page numbers
            $('.student-item').each((index, el) => {
                $(el).attr('data-page', '');
            });
            //set new data-page numbers based on the results
            setPages(results);
            //show only page one of the results
            results.show();
            $('.student-item').hide();
            $('[data-page="1"]').show();
            //don't show pagination if there is only one page
            if (numberSearchPages === 1) {
                $('.pagination').hide();
            }
        }
    }
    //call searchPages on either button click or keyboard enter to show results
    $('.student-search input').bind('keypress', (event) => {
        if (event.keyCode === 13) {
            searchPages(findPerson());
        }
    });
    $('.student-search button').click(() => {
        searchPages(findPerson());
    });
    
    //show only the correct students based on the page number clicked matching the data-page attribute
    $(document).on('click', '.pagination', (event) => {
        $('.student-item').hide();
        let clickedPage = $(event.target).text();
        $(`[data-page="${clickedPage}"]`).show();
    });
});