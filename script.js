import {
db,
materialsRef,
materialCollection,
addDoc,
updateDoc,
deleteDoc,
doc,
onSnapshot
} from "./firebase.js";

let materials=[];

const body=document.getElementById("body");
const search=document.getElementById("search");
const addBtn=document.getElementById("addBtn");

const saveBtn=document.getElementById("saveBtn");

// ---------------- DEFAULT MATERIALS ----------------

const defaults=[
{name:"9V Water Pump",qty:2,cost:0,checked:false},
{name:"L Pipe",qty:3,cost:0,checked:false},
{name:"9V Gear Motor",qty:2,cost:0,checked:false},
{name:"Fevicol 60 g",qty:1,cost:0,checked:false},
{name:"Hot Glue Stick (Big Size)",qty:7,cost:0,checked:false},
{name:"Aluminium Wire",qty:5,cost:0,checked:false},
{name:"LED White",qty:5,cost:0,checked:false},
{name:"LED Red",qty:4,cost:0,checked:false},
{name:"LED Blue",qty:4,cost:0,checked:false},
{name:"LED Green",qty:4,cost:0,checked:false},
{name:"Foil Paper",qty:1,cost:0,checked:false},
{name:"Tissue Paper",qty:1,cost:0,checked:false},
{name:"Acrylic Colour Red",qty:1,cost:0,checked:false},
{name:"Acrylic Colour Yellow",qty:1,cost:0,checked:false},
{name:"Oil Paint Brown",qty:1,cost:0,checked:false},
{name:"Cello Tape (1 Inch)",qty:1,cost:0,checked:false},
{name:"Masking Tape",qty:2,cost:0,checked:false},
{name:"USB Female Connector Circuit",qty:2,cost:0,checked:false},
{name:"Red Marker (Big Size)",qty:1,cost:0,checked:false},
{name:"Thermocol Ball",qty:1,cost:0,checked:false},
{name:"Glitter Red",qty:1,cost:0,checked:false},
{name:"Glitter Blue",qty:1,cost:0,checked:false},
{name:"Glitter Silver",qty:1,cost:0,checked:false},
{name:"Fan Hook",qty:2,cost:0,checked:false},
{name:"Soldering Iron",qty:1,cost:0,checked:false},
{name:"Soldering Wire",qty:1,cost:0,checked:false},
{name:"Soldering Paste",qty:1,cost:0,checked:false},
{name:"Plywood",qty:1,cost:0,checked:false},
{name:"Power Booster Module",qty:2,cost:0,checked:false},
{name:"Phone Control Chipset",qty:1,cost:0,checked:false},
{name:"Screw",qty:15,cost:0,checked:false},
{name:"Cycle Fork",qty:5,cost:0,checked:false},
{name:"Thermocol Cutter",qty:1,cost:15,checked:false},
{name:"Switch",qty:4,cost:0,checked:false},
{name:"Resistor (1/4W)",qty:6,cost:0,checked:false},
{name:"M-Seal",qty:2,cost:0,checked:false},
{name:"Plastic Box",qty:2,cost:0,checked:false},
{name:"Cotton Roll",qty:1,cost:0,checked:false},
{name:"9V Battery",qty:1,cost:0,checked:false}

];

// ---------------- FIRESTORE LIVE SYNC ----------------

onSnapshot(materialCollection, async(snapshot)=>{

materials=[];

if(snapshot.empty){

for(let i=0;i<defaults.length;i++){

await addDoc(materialsRef,{

...defaults[i],

order:i+1

});

}

return;

}

snapshot.forEach(d=>{

materials.push({

id:d.id,

...d.data()

});

});

renderTable();

});
// ---------------- RENDER TABLE ----------------

function renderTable(){

body.innerHTML="";

let grand=0;

materials.forEach((m,index)=>{

const total=(Number(m.cost)||0)*(Number(m.qty)||0);

grand+=total;

body.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>
<input
type="checkbox"
${m.checked?"checked":""}
onchange="toggleCheck('${m.id}',this.checked)">
</td>

<td>
<input
type="text"
value="${m.name}"
onchange="changeName('${m.id}',this.value)">
</td>

<td>
<input
type="number"
value="${m.cost}"
min="0"
onchange="changeCost('${m.id}',this.value)">
</td>

<td>
<input
type="number"
value="${m.qty}"
min="0"
onchange="changeQty('${m.id}',this.value)">
</td>

<td>₹ ${total}</td>

<td>
<button
class="deleteBtn"
onclick="deleteItem('${m.id}')">
❌
</button>
</td>

</tr>

`;

});

document.getElementById("grandTotal").textContent=grand;

}
// ---------------- ADD ITEM ----------------

addBtn.addEventListener("click", async ()=>{

let nextOrder = 1;

if(materials.length>0){

nextOrder = Math.max(
...materials.map(m=>m.order||0)
)+1;

}

await addDoc(materialsRef,{

name:"New Item",
cost:0,
qty:1,
checked:false,
order:nextOrder

});

});

// ---------------- DELETE ITEM ----------------

window.deleteItem = async function(id){

if(!confirm("Delete this item?"))
return;

await deleteDoc(
doc(db,"materials",id)
);

};

// ---------------- SEARCH ----------------

search.addEventListener("input",function(){

const text=this.value.toLowerCase();

document.querySelectorAll("#body tr").forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(text)
? ""
: "none";

});

});
saveBtn.addEventListener("click",()=>{

document.querySelectorAll("input").forEach(input=>{

input.blur();

});

alert("✅ Changes Saved");

});