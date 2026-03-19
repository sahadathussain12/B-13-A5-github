# B-13-A5-github



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
     <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />


</head>
<body>
 <section>
  <div class="navbar bg-base-100 shadow-sm flex justify-between p-5">

    <div class="flex items-center">
      <img src="assets/github-logo.png" class="w-16 h-16" alt="">
      <a class="btn btn-ghost text-xl">GitHub Issues Tracker</a>
    </div>

    <div class="flex gap-2">
        
      <input id="input-search" type="text" placeholder= "Search issues..." 
      class="input input-bordered w-24 md:w-auto" />
      <button id="btn-search" class="btn btn-primary"> <i class="fa-solid fa-plus"></i>New Issue</button>
    </div>

  </div>
</section>


<section>
    <div class="mx-auto w-[1100px] mt-10">
        <div class="bg-white p-6 rounded-lg shadow flex gap-4">
            <button id="tab-all" onclick="switchtab('all')" class="btn btn-primary">All </button>
            <button id="tab-open" onclick="switchtab('open')" class="btn text-gray-500">Open </button>
            <button id="tab-closed" onclick="switchtab('closed')" class="btn text-gray-500">Closed </button>


        </div>
        
        
    </div>
</section>


<section>
    <div class="bg-white p-6 rounded-xl w-[1100px] mx-auto shadow-md flex justify-between items-center mt-4">

 
  <div class="flex items-center gap-4">

    <div class="bg-purple-100 p-3 rounded-full">
      <img src="assets/Aperture.png" alt="">
    </div>

    <div>
      <h2 class="text-xl font-semibold"><span id="total-issue">50</span> Issues</h2>
      <p class="text-gray-500 text-sm">Track and manage your project issues</p>
    </div>

  </div>


  <div class="flex gap-6 text-sm">

    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-green-500 rounded-full"></span>
      <p>Open</p>
    </div>

    <div class="flex items-center gap-2">
      <span class="w-3 h-3 bg-purple-500 rounded-full"></span>
      <p>Closed</p>
    </div>

  </div>

</div>
</section>

<section id="spainner" class="flex justify-center items-center py-10 hidden">
  <span class="loading loading-bars loading-md"></span>
</section>


<div id="issue-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[1100px]  mx-auto mt-6">
  
</div>

<!-- Open the modal using ID.showModal() method -->
<!-- <button class="btn" onclick="my_modal_5.showModal()">open modal</button> -->
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div id="detail-container" class=""></div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>

<script src="js/load.js"></script>
</body>
</html>




const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

const labelColors = {
  enhancement: "bg-green-100 text-green-700",
  "good first issue": "bg-purple-100 text-purple-700",
  bug: "bg-red-100 text-red-700",
  documentation: "bg-gray-100 text-gray-700",
  "help wanted": "bg-yellow-100 text-yellow-700",
};


const spainner = (spain)=>{
  if(spain == true){
    document.getElementById('spainner').classList.remove('hidden')
    document.getElementById('issue-container').classList.add('hidden')
  }
  else{
    document.getElementById('spainner').classList.add('hidden')
    document.getElementById('issue-container').classList('hidden')
  }
}

let allIssues = [];



async function loadingIssue() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  displayIssue(allIssues);
}

function displayIssue(issue) {
    document.getElementById('total-issue').innerText = issue.length;
  const issueContainer = document.getElementById("issue-container");
  issueContainer.innerHTML = "";

  issue.forEach((issuee) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div onclick="loadWordDetail(${issuee.id})" class=" bg-white shadow border-t-4 rounded-xl  ${issuee.status === "open" ? "border-green-500" : "border-purple-500"}  
       p-4 space-y-3">

            <div   class="flex justify-between items-center">
                <img src="./assets/Open-Status.png" alt="">
                <h2 class="font-medium text-xs bg-yellow-100 px-2 py-1 rounded">
                ${issuee.priority}
                </h2>
            </div>

            <div class="space-y-3">
                <h2 class="text-sm font-semibold text-[#1F2937]">
                ${issuee.title}
                </h2>

                <p class="text-xs text-[#64748B]">
                ${issuee.description}
                </p>

                <div class="flex gap-2">
                    <span class="bg-red-100 text-xs px-2 py-1 rounded">BUG</span>
                    <span class="bg-yellow-100 text-xs px-2 py-1 rounded">HELP</span>
                </div>

                <div class="flex justify-between text-xs text-[#64748B]">
                    <div>
                        <p>${issuee.author}</p>
                    </div>

                    <div>
                        <p>${issuee.createdAt}</p>
                    </div>
                </div>

            </div>

        </div>

       </div> 
        `;

    issueContainer.appendChild(div);
  });
}


function switchtab(tab) {
  // console.log(tab);
  const tabs = ["all", "open", "closed"];
  currentTab = tab;

  for (const teeb of tabs) {
    const tabName = document.getElementById("tab-" + teeb);
    if (teeb === tab) {
      tabName.classList.add("btn-primary");
      tabName.classList.remove("text-gray-500")
    } else {
      tabName.classList.remove("btn-primary");
       tabName.classList.add("text-gray-500")
    }
  }
  if (tab === "all") {
    displayIssue(allIssues);
  } else if (tab === "open") {
    const openIssue = allIssues.filter((issue) => issue.status === "open");
    displayIssue(openIssue);
  } else if (tab === "closed") {
    const closedIssue = allIssues.filter((issue) => issue.status === "closed");
    displayIssue(closedIssue);
  }
}

const loadWordDetail = async (id) =>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  console.log(url);
  const res = await fetch(url)
  const details = await res.json();
 displayDetais(details.data);
}
const displayDetais = (word)=>{
  console.log(word);
  const detataiBox = document.getElementById('detail-container')
  detataiBox.innerHTML = `<div class="space-y-6">
       <div class="space-y-3">
         <h2 class="text-2xl font-bold text-[#1F2937]">${word.title} </h2>
        <div class="flex items-center gap-3"><span class="${word.status === "open" ? "bg-green-500" : "bg-purple-500"} text-white  px-4 rounded-full">
  ${word.status === "open" ? "Open" : "Closed"}
</span> </span><p class="text-xs text-[#64748B]">Opened by ${word.assignee}</p><span class="text-xs text-[#64748B]"><p>${new Date(word.updatedAt).toLocaleDateString()}</p></span></div>
      </div>
      <div class="">
        <div class="flex  flex-wrap gap-2">${word.labels
          .map((label) => {
            const colorClass =
              labelColors[label.toLowerCase()] || "bg-gray-200 text-gray-700";
            return `<span class="${colorClass} px-4 py-1 rounded-full">${label}</span>`;
          })
          .join("")} </div>
      </div>
      <p class="text-[#64748B]">${word.description} </p>
      <div class="flex bg-[#F8FAFC]  rounded-s-lg">
        <div class="w-72 p-4">
                  <p class="text-[#64748B]">Assignee:</p>
                  <spen class="font-semibold text-[#1F2937]">${word.assignee} </spen>
        </div>
        <div class="text-start space-y-1">
         <p class="text-[#64748B]">Priority:</p>
                  <h2 class="font-medium text-xs px-4 py-1 rounded-full ${priorityColors[word.priority.toLowerCase()] || "bg-gray-200"}">${word.priority.toUpperCase()}</h2> 
        </div>
      </div>
       </div>`;
  document.getElementById('my_modal_5').showModal()
}


loadingIssue();

document.getElementById('btn-search').addEventListener('click',()=>{
  const input = document.getElementById('input-search')
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

 fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
  .then((res)=>res.json())
  .then((data)=>{
    const allWord = data.data
    console.log(allWord);
    const filterWord = allWord.filter((title)=>title.title.toLowerCase().includes(searchValue))
   displayIssue(filterWord);
  })
})
