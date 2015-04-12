$(document).ready(function(){
    //Section 2 Submit event handler
        $("#submitBtn").click(function(){
            var col1 = "Product Name";
            var col2 = "Quantity Ordered";
            var columnNames = [col1,col2];
            var section = "orderHistory";
            $.when(createTable(columnNames,section)).done(function(){
                $("#inputTableWrap").hide();
                $("#orderHistoryTableWrap").show(500);
                console.log("Table Complete");
            });
        });
        
    // Section dropdown event handler
    $("#sectionDropdown").change(function(){
        var optionName = $("#sectionDropdown option:selected").attr("name");
        // Get id of select option dynamically and show the appropriate section
        if (optionName != "") {
            var sectionElements = document.querySelectorAll("section[name]");
            
            for(var i=0; i < sectionElements.length; i++){
                if (sectionElements[i].getAttribute("name") == optionName) {
                    if (sectionElements[i].getAttribute("name") == "customerList") {
                        //Begin AJAX request logic for getting customer list
                        $.when(getCustomerList()).done(function(){
                            $("#"+sectionElements[i].id).fadeIn();
                            
                        });     
                    }
                    else if (sectionElements[i].getAttribute("name") == "orderHistory") {
                            $("#"+sectionElements[i].id).fadeIn();  
                    }
                }
                else{
                    $("#"+sectionElements[i].id).hide();
                }
            }
        }
    })
    
    /* <><><><><><><><><><><><><><><><><><><><><><><><><><><><> */
    //Request function to be called by all sections
    function sendRequest(protocol,query,async,callback,params) {
        //AJAX Request object
        var request = new XMLHttpRequest();
        
        //Build request Endpoint
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
        if (query != null) {
            url += "/" + query;
        }
        
        //Built Http request
        request.open(protocol,url,async);
        request.send();
        
        //Listen for response and generate JSON output upon success
        request.onreadystatechange = function(){
            if (request.readyState == 4 && request.status == 200){
                var jsonResult = JSON.parse(request.responseText);
                if (jsonResult != null) {
                    callback(jsonResult,params);
                }
            }
        }
    }
    /* <><><><><><><><><><><><><><><><><><><><><>><><><>><><><>><>><><><> */
    
    // Section 1 - Customer list
    function getCustomerList() {
        var col1 = "Customer Name";
        var col2 = "Customer Id";
        var col3 = "Customer City";
        var columnNames = [col1,col2,col3];
        var paramArray = columnNames;
        var section = "customerList"
        $.when(createTable(columnNames,section)).done(function(){
            sendRequest("GET",null,true,populateCustList,paramArray);
        });  
    }
    
    /* --------- Create Table --------- */
    function createTable(columnNames,section){
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
            tableCaption.classList.add("customerTable_caption");
            if (section == "customerList") {
                tableCaption.innerHTML = "Customer List";
            }
            else if (section == "orderHistory") {
                tableCaption.innerHTML = "Order History";
            }
            /* --------------------- */
            
            /* --- Table Header --- */
            var header = newTbl.createTHead();
            header.id = "tableHeader";
            var headerRow = header.insertRow(0);
            headerRow.id = "headerRow";
            for(var i=0; i < columnNames.length; i++){
                var headerCell = headerRow.insertCell(i);
                //headerCell.classList.add("customerTable_header");
                $(headerCell).text(columnNames[i]).appendTo(headerRow);    
            }
            /* --- Display table --- */
            if (section == "customerList") {
                document.getElementById("customerListSection").appendChild(newTbl);
            }
            else if (section == "orderHistory") {
                document.getElementById("orderHistoryTableWrap").appendChild(newTbl);
            }
        }
    }
    
    function populateCustList(result,columnNames){
        var tableBody = document.getElementById("tableBody");
        var columnLength = columnNames.length;
        var type = typeof(result);
        if (type == "object") {
            // code for JSON objects
        }
        else if (test) {
            //code
        }
        for(var i=0; i < result.GetAllCustomersResult.length; i++){
            var row = tableBody.insertRow(i);
            var custNameCell = row.insertCell(0);
            var custIdCell = row.insertCell(1);
            var custCityCell = row.insertCell(2);
            $(custNameCell).text(result.GetAllCustomersResult[i].CompanyName);
            $(custIdCell).text(result.GetAllCustomersResult[i].CustomerID);
            $(custCityCell).text(result.GetAllCustomersResult[i].City);
        }
    }
});