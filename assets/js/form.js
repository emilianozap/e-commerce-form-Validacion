const registrarse = document.querySelector(".registrarse")
const yaRegistrado = document.querySelector(".ya-estoy-registrado")
const containerRegistrarse = document.querySelector(".contenedor-registrarse")
const containerLogin = document.querySelector(".contenedor-login")
const email = document.getElementById("email-input")
const password = document.getElementById("password")
const usuario = document.getElementById("usuario")
const formIngresar = document.getElementById("form-ingresar")
const formRegistrarse = document.getElementById("form-registrarse")
const parrafo = document.getElementById("parrafo")
const parrafo2 = document.getElementById("parrafo2")
  
registrarse.addEventListener("click", () =>{
    containerRegistrarse.classList.add("open-container")
    containerLogin.classList.add("close-container")
    containerRegistrarse.classList.remove("close-container")

    
})

yaRegistrado.addEventListener("click", ()=>{
    containerLogin.classList.add("open-container")
    containerRegistrarse.classList.add("close-container")
    containerLogin.classList.remove("close-container")
})

  formIngresar.addEventListener("submit", e =>{
    e.preventDefault()
    let msjError = ""
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexContraseña =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    let entrar = false
    parrafo.innerHTML =""

    if (!regexEmail.test(email.value)) {
        msjError += `- su email es incorrecto <br>`
        entrar = true
      }
       if (!regexContraseña.test(password.value)){
        console.log("hola contraseña");
        msjError += `su contraseña no es valida debe contener:<br>
         * un minimo de 8 caracteres <br>
         * una letra mayuscula <br>
         * un numero y algun caracter espacial`
        entrar = true
       }
       if (entrar) {
         parrafo.innerHTML = msjError
       }else{
        parrafo.innerHTML = "enviado"
       }
})


formRegistrarse.addEventListener("submit", e =>{
    e.preventDefault();
    let msjError = ""
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexContraseña =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    let entrar = false
    parrafo2.innerHTML =""
    if (usuario.value.length <6 || usuario.value.length >20) {
        console.log("nombre");
        msjError += `- el nombre de ususario no es valido, 
        ingrese un nombre con mas de 6 caracteres y menos de 20 caracteres <br>`
        entrar = true
        
    }
   if (!regexEmail.test(email.value)) {
     msjError += `- su email es incorrecto <br>`
     entrar = true
   }
   if (!regexContraseña.test(password.value)){
    console.log("hola contraseña");
    msjError += `su contraseña no es valida debe contener:<br>
     * un minimo de 8 caracteres <br>
     * una letra mayuscula <br>
     * un numero y algun caracter espacial`
    entrar = true
   }
   if (entrar) {
    parrafo2.innerHTML = msjError
  }else{
   parrafo2.innerHTML = "enviado"
  }

})












