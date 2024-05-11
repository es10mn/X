setupUI()
getuser()
getpost()

function getcurrentuserid()
{
    const urlparams = new URLSearchParams(window.location.search)
    const id= urlparams.get("userID")
    return id
}
function getuser()
{
    const id = getcurrentuserid()
    axios.get(`${baseurl}/users/${id}`)
    .then((response) => {
        const user = response.data.data
        document.getElementById("main-info-email").innerHTML = user.email
        document.getElementById("main-info-name").innerHTML = user.name
        document.getElementById("main-info-username").innerHTML = user.username
        document.getElementById("post-count").innerHTML = user.posts_count
        document.getElementById("post-comment-count").innerHTML = user.comments_count
        document.getElementById("header-image").src = user.profile_image
        document.getElementById("name-post").innerHTML=user.username

    })
}


function getpost()
{
    const id = getcurrentuserid()
    axios.get(`${baseurl}/users/${id}/posts`)
    .then((response) => {
        
        const posts = response.data.data
        document.getElementById("user-posts").innerHTML=""

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

                            <img src="${author.profile_image}" alt="" style="width: 40px ;" class="rounded-circle border border-2">
                            <b>${author.username}</b>
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
            document.getElementById("user-posts").innerHTML += content
        }
    })
    .catch()
}