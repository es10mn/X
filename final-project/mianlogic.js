const baseurl ="https://tarmeezacademy.com/api/v1"




function profileclicked() 
{
    const user = getcurrentuser()
    const userid= user.id
    window.location =`profile.html?userID=${userid}`
}

function setupUI()
    {
        const token= localStorage.getItem("token")

        const loginid =document.getElementById("logindiv")
        const logoutid = document.getElementById("logoutdiv")
        const addpost = document.getElementById("add-btn")
        if(token == null) // uoser not longin
        {
            if(addpost != null)
                {
                    addpost.style.setProperty("display", "none", "important")
                }
            loginid.style.setProperty("display", "flex", "important")
            logoutid.style.setProperty("display", "none", "important")
            

        }else{
            // for logged in
            loginid.style.setProperty("display", "none", "important")
            logoutid.style.setProperty("display", "flex", "important")
            if(addpost != null){
            addpost.style.setProperty("display", "block", "important")
            }
            const user =getcurrentuser()
            document.getElementById("nav-username").innerHTML =user.username
            document.getElementById("nav-user-image").src=user.profile_image

        }
    }
//  auth
function loginBtncliched()
    {
        const username = document.getElementById("username-input").value
        const password = document.getElementById("PassWord-input").value

        const params = {
            "username" : username,
            "password" : password
        }
        toggleloader(true)
        const url = `${baseurl}/login`
        axios.post(url, params)
        .then((response) => {
            toggleloader(false)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user",JSON.stringify( response.data.user))

            const modal =document.getElementById("ex")

            const modalinstance = bootstrap.Modal.getInstance(modal)
            modalinstance.hide()
            showalert("login up seccessfully","success")
            setupUI()
        }).catch((error)=> {
            const message = error.response.data.message
            showalert(message , "danger")
        })

    }

function registerbtnclick()
    {
        const name =document.getElementById("register-name-input").value
        const username = document.getElementById("register-username-input").value
        const password = document.getElementById("rigister-PassWord-input").value
        const image = document.getElementById("register-image-input").files[0]

        // const params = {
            
        //     "username" : username,
        //     "password" : password,
        //     "name" : name
        // }

        let x = new FormData()
        x.append("name",name)
        x.append("username",username)
        x.append("password",password)
        x.append("image",image)


        const url = `${baseurl}/register`
        toggleloader(true)
        axios.post(url, x , {
            headers :{
                "Content-Type":"multipart/form-data"
                
            }
        })
        .then((response) => {
            toggleloader(false)
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user",JSON.stringify( response.data.user))

            const modal =document.getElementById("register-modal")

            const modalinstance = bootstrap.Modal.getInstance(modal)
            modalinstance.hide()
            showsuccessalert("New User Registered Successfally")
            setupUI()
        }).catch((error)=> {
            const message = error.response.data.message
            showalert(message , "danger")
        })
    }

function logout()
    {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        showalert("Logged out seccessfully", "success")

        setupUI()
    }

function getcurrentuser() 
    {
        let user = null
        const storageuser = localStorage.getItem("user")
        if (storageuser !=null)
        {
            user = JSON.parse(storageuser)
        }
        return user
    }

function showalert(custommessage,type)
    {
    const alertPlaceholder = document.getElementById('success-alert')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    }

        // appendAlert(custommessage, type)
        // //  to do HIED ALERT
        // setTimeout(()=> {
        // const alert = bootstrap.alert.getOrCreateInstance('#success-alert')
        // // alert.close()
        // },2000 )
        
    
    }



function editpost(postobj)
{
    document.getElementById("post-modal-submit").innerHTML ="Update"
    let post = JSON.parse(decodeURIComponent(postobj))
    document.getElementById("post-id-input").value=post.id
    document.getElementById("post-modal-title").innerHTML = "Edit Post"
    document.getElementById("Title-input").value=post.title
    document.getElementById("post-bady-input").value = post.body
    
    let postmodal = new bootstrap.Modal(document.getElementById("creat-post-modal"),{})
    postmodal.toggle()
}

function deletepost(postobj)
{
    
    let post = JSON.parse(decodeURIComponent(postobj))
    
    document.getElementById("delete-post-id-input").value=post.id
    let postmodal = new bootstrap.Modal(document.getElementById("delete-post-modal"),{})
    postmodal.toggle()
}

function confirmdelete()
{
        const postid = document.getElementById("delete-post-id-input").value
        const token = localStorage.getItem("token")
        
        const url = `${baseurl}/posts/${postid}`
        axios.delete(url,{
            headers :{
                "Content-Type":"multipart/form-data",
                "authorization" :`Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response)

            console.log(response)
            const modal =document.getElementById("delete-post-modal")
            const modalinstance = bootstrap.Modal.getInstance(modal)
            modalinstance.hide()
            showalert("The post hea been deleted successfulye","success")
            getpost()
        }).catch((error)=> {
            const message = error.response.data.message
            showalert(message , "danger")
        })
}


function createnewpost() 
{
    let postId =document.getElementById("post-id-input").value
    let iscreate= postId  == null || postId ==""
    


    const token = localStorage.getItem("token")
    const title = document.getElementById("Title-input").value
    const body = document.getElementById("post-bady-input").value
    const image = document.getElementById("post-image-input").files[0]
    
    let x = new FormData()
    x.append("body",body)
    x.append("title",title)
    x.append("image",image)



    let url = ``
    if(iscreate)
        {
            url=`${baseurl}/posts`
            toggleloader(true)
            axios.post(url, x , {
                headers :{
                    "Content-Type":"multipart/form-data",
                    "authorization" :`Bearer ${token}`
                }
            })
            .then((response) => {

                toggleloader(false)
                const modal =document.getElementById("creat-post-modal")
                const modalinstance = bootstrap.Modal.getInstance(modal)
                modalinstance.hide()
                showalert("New post Has Been Created","success")
                getpost()
        
            }).catch((error)=> {
                const message = error.response.data.message
                showalert(message , "danger")
            })
        }
        else
        {
            x.append("_method", "put")
            url=`${baseurl}/posts/${postId}`
            toggleloader(true)
            axios.post(url, x , {
                headers :{
                    "Content-Type":"multipart/form-data",
                    "authorization" :`Bearer ${token}`
                }
            })
            .then((response) => {
                toggleloader(false)
                const modal =document.getElementById("creat-post-modal")
                const modalinstance = bootstrap.Modal.getInstance(modal)
                modalinstance.hide()
                showalert("New post Has Been Updated","success")
                getpost()
        
            }).catch((error)=> {
                const message = error.response.data.message
                showalert(message , "danger")
            })
        }

    
}

function toggleloader(show=true)
{
    if(show)
        {
            document.getElementById("loader").style.visibility ="visible"
        }else {
            document.getElementById("loader").style.visibility ="hidden"
        }
}
