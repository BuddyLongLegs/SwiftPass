const showTicket = (ticket)=>{
    var bookedon = new Date(ticket.purchasedOn);
    var bookedfor = new Date(ticket.forDate);
    let obj = `
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cookie&family=Lora:ital,wght@1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <style>
        
        body{
    font-family: 'Barlow', sans-serif;
}

.box{
    height: max-content;
}

.ticket{
    width: 110vh;
    height: 38vh;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;
}

.card{
    background: radial-gradient(circle at top, #5EAB4D 10%, #CBD439 60%, #EBF299 100%);
    width: 67vh;
    padding: 3vh;
    padding-top: 1.5vh;
    border-radius: 2vh;
    border-top-right-radius: 0vh;
    border-bottom-right-radius: 0vh;
    height: 100%;
    /* display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap; */
}

.pic{
    padding-left: 0.5vh;
    border-top-right-radius: 2vh;
    border-bottom-right-radius: 2vh;
    border-left: 2px dashed black;
    width: 35.5vh;
    height: 112%;
    overflow: hidden;
}

#sidepic{
    height: 100%;
    /* border-radius: 2vh; */
}

#qr{
    width: 10vh;
}

.last{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
}

.bookedon1{
    display: flex;
    justify-content: end;
    flex-direction: column;
    flex-wrap: wrap;
}

/* Styling Starts from here */

#mn{
    font-size: 3.5vh;
    text-align: left;
    font-weight: 800;
}

.time{
    /* margin-top: -2vh; */
    text-align: right;
    font-weight: 700;
}

.date{
    margin-top: -4vh;
    transform: scaleY(1.1);
    font-size: 6vh;
    font-weight: 900;
}

.card .name{
    font-size: 4vh;
    font-weight: 900;
    padding-left: 3vh;
}

.card .email{
    font-size: 1.5vh;
    font-weight: 700;
    padding-left: 3vh;
}

.noofppl{
    margin-top: 2vh;
    font-size: 3vh;
    font-weight: 800;
    padding-left: 3vh;
}


.last{
    margin-top: 2vh;
}

.ticketcode{
    margin-bottom: 1vh;
    text-align: right;
    font-size: 3vh;
    font-weight: 700;
}

.bookedon2{
    /* font-style: italic; */
    font-size: 2vh;
    font-weight: 400;
}

@media only screen and (max-width: 900px) {
    .ticket{
        width: 70vw;
        margin: auto;
        height: 90vh;
        flex-direction: column;
        align-items: center;
    }

    .card{
        height: 57vh;
        width: 87%;
        border-radius: 2vh;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

    .pic{
        
        height: 27vh;
        width: 100%;
        
        padding-left: 0px;
        padding-top: 0.5vh;
        text-align: center;
        border-radius: 0px;
        border-bottom-right-radius: 2vh;
        border-top: 2px dashed black;
        border-left: none;
    }

    #sidepic{
        background-size: cover;
        width: 100%;
        border-bottom-left-radius: 2vh;
        border-bottom-right-radius: 2vh;
    }
    
    #mn{
        text-align: center;
    }

    .date{
        margin-top: 2vh;
    }

    .month{
        margin-bottom: 2vh;
    }

    .card .name{
        padding-left: 1vh;
    }

    .card .email{
        margin-top: 1vh;
        padding-left: 1vh;
    }

    .card .noofppl{
        padding-left: 1vh;
    }

    .last{
        flex-direction: column-reverse;
        align-items: end;
    }

    .bookedon1, .bookedon2{
        width: 100%;
        text-align: center;
    }

    .bookedon1{
        margin-top: 3vh;
    }
  }
    </style>
    </head>
    <div>
    <div class="box">
        <div class="ticket">
            <div class="card">
                <div id="mn">
                    NATIONAL MUSEUM OF DELHI
                </div>
    
                <div class="time">
                    <div class="date">
                        ${bookedfor.getDate()}
                    </div>
                    <div class="month">
                        ${bookedfor.toLocaleString('default', { month: 'long' })}
                    </div>
                </div>
    
                <div class="name">
                    ${ticket.name}
                </div>
    
                <div class="email">
                    ${ticket.email}
                </div>
    
                <div class="noofppl">
                    Valid for <span id="groupsize">${ticket.groupSize}</span>
                </div>
    
                <div class="ticketcode">
                    ${ticket.code}
                </div>
    
                <div class="last">
                    <div class="bookedon1">
                        <div class="bookedon2">Booked On : <span id="bookdate">${(bookedon.getDate()).toString() + " " +bookedon.toLocaleString('default', { month: 'long' }) +" " + bookedon.getFullYear().toString()}</span> </div>
                        
                    </div>
    
                    <div class="qr">
                        <img src="https://swift-pass.herokuapp.com/resources/qr.png" alt="QR Code" id="qr">
                    </div>
                </div>
    
            </div>
            <div class="pic">
                <img src="https://swift-pass.herokuapp.com/resources/NMD.jpg" alt="" id="sidepic">
            </div>
        </div>
    </div>

    
</div>
    `

    return obj;
}

module.exports.showticket = showTicket;