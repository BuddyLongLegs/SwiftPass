function payment(){
    const groupSize = document.getElementById("group-size").value;
    const forDate = document.getElementById("for-date").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    axios
        .post("/user/new", {
            name: name,
            email: email,
            forDate: forDate,
            groupSize: groupSize
        })
        .then((res)=>{
            console.log(res);
            let options = {
                "key": "rzp_test_t58oM6vP45QaCj", // Enter the Key ID generated from the Dashboard
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": res.data.currency,
                "name": "SwiftPass",
                "description": "Test Transaction",
                "image": "/resources/museum_logo.png",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
                "handler": function (response){
                    axios
                        .post(`/user/pay/verify/${res.data.receipt}`, {response: response})
                        .then((resp)=>{
                            location.href = "/ticket.html?id="+resp.data.hashedID;
                             // Do your work here FrontEnd
                        })
                },
                "prefill": {
                    "name": name,
                    "email": email
                }
            };
            var rpPay = new Razorpay(options);
            rpPay.open();
        })
}

document.getElementById("rp").addEventListener("click", (e)=>{
    payment();
    e.preventDefault();
})