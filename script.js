// ---------- Load Saved Data ----------
let saved = localStorage.getItem("rdt_materials");

if(saved){
    try{
        let temp = JSON.parse(saved);
        if(Array.isArray(temp)){
            materials.length = 0;
            temp.forEach(item=>materials.push(item));
        }
    }catch(e){}
}

const body = document.getElementById("body");
const search = document.getElementById("search");
const addBtn = document.getElementById("addBtn");

// ---------- Save ----------
function saveData(){

    localStorage.setItem(
        "rdt_materials",
        JSON.stringify(materials)
    );

}

// ---------- Render Table ----------
function renderTable(){

    body.innerHTML="";

    materials.forEach((m,index)=>{

        let total=m.cost*m.qty;

        body.innerHTML+=`

<tr>

<td>${index+1}</td>

<td>
<input type="checkbox"
${m.checked?"checked":""}
onchange="toggleCheck(${index},this.checked)">
</td>

<td>
<input
type="text"
value="${m.name}"
oninput="changeName(${index},this.value)">
</td>

<td>
<input
type="number"
value="${m.cost}"
oninput="changeCost(${index},this.value)">
</td>

<td>
<input
type="number"
value="${m.qty}"
oninput="changeQty(${index},this.value)">
</td>

<td>₹ ${total}</td>

<td>
<button
class="deleteBtn"
onclick="deleteItem(${index})">
❌
</button>
</td>

</tr>

`;

    });

    updateGrandTotal();

}
// ---------- Update Grand Total ----------
function updateGrandTotal(){

let grand=0;

document.querySelectorAll("#body tr").forEach((row,index)=>{

let total=materials[index].cost*materials[index].qty;

row.cells[5].innerHTML="₹ "+total;

grand+=total;

});

document.getElementById("grandTotal").innerHTML=grand;

saveData();

}

// ---------- Edit Functions ----------
function changeName(i,v){

materials[i].name=v;

saveData();

}

function changeCost(i,v){

materials[i].cost=Number(v)||0;

updateGrandTotal();

}

function changeQty(i,v){

materials[i].qty=Number(v)||0;

updateGrandTotal();

}

function toggleCheck(i,v){

materials[i].checked=v;

saveData();

}

// ---------- Add Item ----------
addBtn.onclick=function(){

materials.push({

name:"New Item",

cost:0,

qty:1,

checked:false

});

renderTable();

};

// ---------- Delete ----------
function deleteItem(i){

if(confirm("Delete this item?")){

materials.splice(i,1);

renderTable();

}

}

// ---------- Search ----------
search.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll("#body tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)?"":"none";

});

});

// ---------- Start ----------
renderTable();