$(document).ready(function(){
    // Section dropdown event handler
    $("#sectionDropdown").change(function(){
        // Get id of select option dynamically and show the appropriate section
        var optionId = $("#sectionDropdown option:selected").prop("id");
        if (optionId == "customerList") {
            //Begin AJAX request logic for getting customer list
            getCustomerList();
        }
        if (optionId != " ") {
            var sectionElements = document.querySelectorAll("section.sectionClass");
            for (var i=0; i < sectionElements.length; i++){
                if (sectionElements[i].id == optionId) {
                    $(sectionElements[i]).show();
                }
                else{
                    $(sectionElements[i]).hide();
                }
            }
        }
    })
    
    // Section 1 - Customer list
    function getCustomerList() {
        var col1 = "Customer Name";
        var col2 = "Customer Id";
        var col3 = "Customer City";
        var columnNames = [col1,col2,col3];
        createTable(columnNames);
        
        //AJAX Request object
        var request = new XMLHttpRequest();
        
        //Build request Endpoint
        var requestURL = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
        
        //Built Http request
        request.open("GET",requestURL,true);
        request.send();
        
        //Listen for response and generate JSON output upon success
        request.onreadystatechange = function(){
            if (request.readyState == 4 && request.status == 200){
                var jsonResult = JSON.parse(request.responseText);
                populateCustList(jsonResult);
            }
        }
        
        
        
    }
    
    /* --------- Create Table --------- */
    function createTable(columnNames){
        var tbl = document.getElementById("customerTable");
        if (tbl == null){
            
            /* --- Create table in DOM ---*/
            var newTbl = document.createElement("TABLE");
            newTbl.id = "customerTable";
            newTbl.classList.add("customerTable");
            /* -------------------------- */
            
            /* --- Table Body --- */
            var tblBody = document.createElement("TBODY");
            tblBody.id = "tableBody";
            tblBody.classList.add("customerTable_tbody");
            newTbl.appendChild(tblBody);
            /* ------------------- */
            
            /* --- Table Caption --- */
            var tableCaption = newTbl.createCaption();
            tableCaption.innerHTML = "Customer List";
            /* --------------------- */
            
            /* --- Table Header --- */
            var header = newTbl.createTHead();
            header.id = "tableHeader";
            header.classList.add(/*some class*/);
            var headerRow = header.insertRow(0);
            headerRow.id = "headerRow";
            for(var i=0; i < columnNames.length; i++){
                var headerCell = headerRow.insertCell(i);
                headerCell.classList.add("customerTable_header");
                $(headerCell).text(columnNames[i]).appendTo(headerRow);    
            }
            /* --- Display table --- */
            document.getElementById("customerListWrap").appendChild(newTbl);
        }
    }
    
    function populateCustList(result){
        var tableBody = document.getElementById("tableBody");
        for(var i=0; i < result.GetAllCustomersResult.length; i++){
            
        }
    }
});