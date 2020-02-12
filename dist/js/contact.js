let firebaseConfig = {
    apiKey: "AIzaSyAZt-BKyuvEbbNPaOS0sEhT-8zt608kOYA",
    authDomain: "localhost",
    projectId: "homework-5-d8930",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let radio = document.getElementsByName('gender');
let male = 0.0, female = 0.0, other = 0.0;
let total = 0.0; 


$('#submit').click(()=>{
    if(validation()===false){
        return;
    }
    else{

   // console.log($('#subject').val())
    db.collection("users").add({
        Email:$('#Email').val(),
        Name:$('#Name').val(),
        Gender:Number($('input[name="gender"]:checked').val()),
        Description:$('#Des').val(),
        Surname:$('#Surname').val(),
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        $('#Email').val('');
        $('#Name').val('');
        $('#Des').val('');
        $('#Surname').val('');
        radio[0].checked=true;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
})

$('#reset').click(() =>{
    $('#Email').val('');
    $('#Name').val('');
    $('#Des').val('');
    $('#Surname').val('');
    radio[0].checked=true;
})

function validation(){
    if($('#Name').val()===null||$('#Name').val()===''){
        alert("please enter a name");
        document.myForm.Name.focus();
        return false;
    }   
    // b=validemail(email);
    // if(b===false){
    //     return false;
    // }
}

db.collection("users").orderBy("Name").onSnapshot(doc=>{
    let table = $('tbody')[0];
   // let pl = document.querySelector('#list');
    // let li=document.createElement('li');
    // let l = document.createElement('br');
    // let newText = document.createTextNode(``);
    //document.querySelectorAll("tbody tr").forEach(item=>item.remove());
    $("tbody tr").remove()
    doc.forEach(item=>{
        let st=(item.data().Name)+'  '+(item.data().Surname)
        let del=String("delete")
        
        let row = table.insertRow(-1)
        let FirstCol = row.insertCell(0)
        let SecondCol = row.insertCell(1)
        let ThirdCol = row.insertCell(2)
        let ForthCol = row.insertCell(3)
        
        FirstCol.textContent=st;

        if(item.data().Gender==1){
            male++;
            SecondCol.textContent="Male";
        }
        if(item.data().Gender==2){
            female++;
            SecondCol.textContent="Female";
        }
        if(item.data().Gender==3){
            other++;
            SecondCol.textContent="Other";
        }
        total = male+female+other;

        let str = String(item.data().Email);
        let buff="";
        for(i=0; i<str.length; i++) {
            if(i===0 || str[i]==="@" || str[i]==="."){
                buff+=str[i];
            }
            else buff +="x";
        }

        console.log(str);

        ThirdCol.textContent=buff;
        ForthCol.textContent=del;
        

        var options = {
            animationEnabled: true,
            title: {
                text: "User gender percentage"
            },
            data: [{
                type: "doughnut",
                innerRadius: "40%",
                showInLegend: true,
                legendText: "{label}",
                indexLabel: "{label}: #percent%",
                dataPoints: [
                    { label: "Male", y: male },
                    { label: "Female", y: female },
                    { label: "Other", y: other },
                ]
            }]
        };
        $("#chartContainer").CanvasJSChart(options); 
    })
})

        
// db.collection("users").orderBy("subject").onSnapshot(doc=>{
//     let table = $('tbody')[0]
//     //document.querySelectorAll("tbody tr").forEach(item=>item.remove());
//     gpa =0;
//     credit=0;
//     $("tbody tr").remove()
//     doc.forEach(item=>{
//         let row = table.insertRow(-1)
//         let firstCell = row.insertCell(0)
//         let secondCell = row.insertCell(1)
//         let thirdCell = row.insertCell(2)
       
//         firstCell.textContent=item.data().subject
        
//         if(item.data().grade===4){
//             secondCell.textContent="A";
//         }
//         if(item.data().grade===3){
//             secondCell.textContent="B";
//         }
//         if(item.data().grade===2){
//             secondCell.textContent="C";
//         }
//         if(item.data().grade===1){
//             secondCell.textContent="D";
//         }
//         if(item.data().grade===0){
//             secondCell.textContent="F";
//         }

//        // secondCell.textContent=item.data().grade
//         thirdCell.textContent=item.data().credit
        
//         gpa+=(item.data().grade*item.data().credit)
//         credit += item.data().credit

//         // let subjectCell = document.createTextNode(item.data().subject); 
//         // let gradeCell = document.createTextNode(item.data().grade); 
//         // firstcell.appendChild(subjectCell);
//         // secondCell.appendChild(gradeCell);
//     })
//     console.log(gpa/credit)
//     $('h4').text(gpa/credit)
// })


// db.collection('users').where('grade','>',3).get().then(res=>{
//     res.forEach(item=>console.log(item.data()))
// })