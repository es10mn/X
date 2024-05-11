

let curintpag= 1
lastpage = 1
// infint scrol
window.addEventListener("scroll",function(){
    const endofpage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight
    if(endofpage && curintpag < lastpage)
    {
        curintpag= curintpag +1
        getpost( false, curintpag)
        
    }
})
setupUI()

getpost()

function userclicked( userid)
{
    
    window.location =`profile.html?userID=${userid}`
}

function getpost(page=1,reload=true )
{
    toggleloader(true)
    axios.get(`${baseurl}/posts?limit=20&page=${page}`)
    .then((response) => {
        toggleloader(false)
        const posts = response.data.data
        lastpage = response.data.meta.last_page
        if(reload)
        {
            document.getElementById("posts").innerHTML =""
        }
        // let user = getcurrentuser() 
        // let ismypost =user != null && post.author.id ==user.id
        // let buttoncontint = ``
        // if (ismypost)
        //     {
        //         buttoncontint =
        
        //         `
        //         <button class="btn btn-secondary " style="float:right" onclick="editpost('${encodeURIComponent(JSON.stringify(post))}')"> adit</button>
        //         `
        //     }
        for(post of posts) {
            let user = getcurrentuser() 
            let ismypost =user != null && post.author.id ==user.id
            let buttoncontint = ``
            if (ismypost)
                {
                    buttoncontint =
            
                    `
                    <button class="btn btn-danger " style="margin-left: 5px;  float:right " onclick="deletepost('${encodeURIComponent(JSON.stringify(post))}')"> Delete</button>
                    <button class="btn btn-secondary " style="float:right " onclick="editpost('${encodeURIComponent(JSON.stringify(post))}')"> edit</button>
                    `
                }

            const author = post.author
            
            const postTitle = post.title

            if (postTitle ==" null") {
                postTitle ="hello"
            }
            let content = 
            `
                <div class="card shadow">
                    <div class="card-header">
                        <span onclick="userclicked(${author.id})" style="cursor: pointer">
                            <img src="${author.profile_image}" alt="" style="width: 40px ;" class="rounded-circle border border-2">
                            <b>${author.username}</b>
                        </span>
                            ${buttoncontint}
                    </div>
                    <div class="card-body" onclick="postclicked(${post.id})" style="cursor: pointer">
                            <img src="${post.image}" alt="" style="width: 100%; height: 400px;">
                            <h6 style="color: gray;" class="mt-1">
                                ${post.created_at }
                            </h6>
                            <h5>
                                ${postTitle}
                            </h5>
                            <p>
                                ${post.body}
                            </p>
                            <hr>
                    <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                                </svg>
                                <span>
                                    (${post.comments_count}) comment
                                </span>
                            </div>
                        
                        </div>
                </div>
            `
            document.getElementById("posts").innerHTML += content
        }
    })
    .catch()
}

function  postclicked(postid)
{
    // alert(postid)
    window.location = `post.html?postId=${postid}`
}


function addbtnclick() 
{
    document.getElementById("post-modal-submit").innerHTML ="create"
    document.getElementById("post-id-input").value=""
    document.getElementById("post-modal-title").innerHTML = "Create post"
    document.getElementById("Title-input").value=""
    document.getElementById("post-bady-input").value = ""
    
    let postmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"),{})
    postmodal.toggle()
}

