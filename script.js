import {
db,
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

// ---------- Default Materials ----------
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

// ---------- Live Sync ----------
onSnapshot(materialCollection,async(snapshot)=>{

materials=[];

if(snapshot.empty){

for(const item of defaults){

await addDoc(materialCollection,item);

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

// ---------- Render Table ----------
function renderTable(){

body.innerHTML="";

let grand=0;

materials.forEach((m,index)=>{

let total=(Number(m.cost)||0)*(Number(m.qty)||0);

grand+=total;

body.innerHTML+=`
<tr>
<td>${index+1}</td>
<td><input type="checkbox" ${m.checked?"checked":""} onchange="toggleCheck('${m.id}',this.checked)"></td>
<td><input type="text" value="${m.name}" onchange="changeName('${m.id}',this.value)"></td>
<td><input type="number" value="${m.cost}" onchange="changeCost('${m.id}',this.value)"></td>
<td><input type="number" value="${m.qty}" onchange="changeQty('${m.id}',this.value)"></td>
<td>₹ ${total}</td>
<td><button class="deleteBtn" onclick="deleteItem('${m.id}')">❌</button></td>
</tr>
`;

});

document.getElementById("grandTotal").innerHTML=grand;

}
// ---------- Update Functions ----------

window.changeName = async function(id,value){

const ref = doc(db,"materials",id);

await updateDoc(ref,{
name:value
});

};

window.changeCost = async function(id,value){

const ref = doc(db,"materials",id);

await updateDoc(ref,{
cost:Number(value)||0
});

};

window.changeQty = async function(id,value){

const ref = doc(db,"materials",id);

await updateDoc(ref,{
qty:Number(value)||0
});

};

window.toggleCheck = async function(id,value){

const ref = doc(db,"materials",id);

await updateDoc(ref,{
checked:value
});

};

// ---------- Add Item ----------

addBtn.addEventListener("click",async()=>{

await addDoc(materialCollection,{

name:"New Item",

cost:0,

qty:1,

checked:false

});

});

// ---------- Delete Item ----------

window.deleteItem = async function(id){

if(!confirm("Delete this item?")) return;

const ref = doc(db,"materials",id);

await deleteDoc(ref);

};

// ---------- Search ----------

search.addEventListener("input",function(){

let text=this.value.toLowerCase();

document.querySelectorAll("#body tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(text)
? ""
: "none";

});

});