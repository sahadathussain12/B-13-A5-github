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


 loadingIssue()