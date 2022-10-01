const from = document.getElementById("formulario");
        

        document.addEventListener("DOMContentLoaded", function(event){
        from.style.display = "none";
        

        })

        const botonNuevaVianda =  document.getElementById("nuevaVianda");
        botonNuevaVianda.addEventListener("click", (event)=>{
            from.style.display = "block";


            // Controlar que la “Fecha Inicio” sea por lo menos 5 días posterior a la fecha actual.

        })




        from.addEventListener("submit", function(event){
            function sumarDias(fecha, dias){
                fecha.setDate(fecha.getDate() + dias);
                return fecha;
            }
            
            event.preventDefault();
            

            function compararFecha(){
                let fechaInicio=document.getElementById("fechaInicio").value;
                let fechaActual = new Date();
                let fechaMasCinco = sumarDias(fechaActual,5);
                //console.log(fechaMasCinco);
                let mes = (fechaMasCinco.getMonth()+1).toString()
                
                let devolver = false;
                if(mes.length<= 1){
                    mes = "0"+ mes;
                }
                let dia = fechaMasCinco.getDate().toString();
                if(dia.length<= 1){
                    dia = "0"+ dia;
                    
                }
                let fechaActualComparar = fechaMasCinco.getFullYear() + "-" + mes + "-" +dia;
                
                console.log(fechaInicio);
                console.log(fechaActualComparar);
                if(fechaInicio>=fechaActualComparar){
                    
                    devolver= true;
                    return devolver;
                    
                    //return true;
                }else {
                    alert("La fecha de inicio debe por lo menos 5 días posterior a la fecha actual");
                    return devolver;
                }
            }

            //console.log(compararFecha());


            //obtener los campos del formularios (clave,valor)
            //con get("name") obtengo el valor 
                //document.getElementById('test').checked
            let entrada = document.getElementById("entrada").checked;    
            let platoPrincipal = document.getElementById("platoPrincipal").checked;     
            let postre = document.getElementById("postre").checked;     
            const items = true; 
            if(entrada == false && platoPrincipal== false && postre== false){
                alert("Debe seleccionar un items")
                items= false

            }
            console.log(compararFecha());
            if(items== true && compararFecha() == true){
                let fromData = new FormData(from);

                //hago objecto a fromData
                let objectoFromData = formDataToObject(fromData);

                insertarFila(objectoFromData);
                //limpiar un formulario con reset , devuelve el formulario al estado inicial 
                from.reset();


                ////////////////////////////////////////////////
                // hago que el formulario vuelva a desaparecer
                from.style.display = "none";
                    
            
                    
                ////////////////////////////////////////
            }
            
            

            
        })


        //tranformar el formData a objecto
        function formDataToObject(fromData){
            let frecuencia =  fromData.get("frecuencia");
            let tipoMenu =  fromData.get("tipo");
            let entrada =  fromData.get("entrada");
            let platoPrincipal = fromData.get("platoPrincipal");
            let postre = fromData.get("postre");
            let fechaInicio = fromData.get("fechaInicio");
            let cantidad = fromData.get("cantidad");
            
            //retorno el obejecto
            return{
                //calev,valor
                "frecuencia" : frecuencia,
                "tipoMenu" : tipoMenu,
                "entrada" : entrada,
                "platoPrincipal" : platoPrincipal,
                "postre": postre,
                "fechaInicio": fechaInicio,
                "cantidad": cantidad


            }
        }

        function insertarFila(objectoFromData){
            //obtengo la tabla
            let tabla = document.getElementById("tablaRegistro");
            //agregar una fila al ultimo
            let row = tabla.insertRow(-1);
            
            //insertar a la fila una celda
            let insertarCelda = row.insertCell(0);
            //agrego un texto a la celda
            insertarCelda.textContent = objectoFromData.frecuencia;
            
            insertarCelda = row.insertCell(1);
            insertarCelda.textContent = objectoFromData.tipoMenu;
            
            insertarCelda = row.insertCell(2);
            // insertarCelda.textContent = objectoFromData.;

            insertarCelda = row.insertCell(3);
            insertarCelda.textContent = objectoFromData.fechaInicio;

            insertarCelda = row.insertCell(4);
            insertarCelda.textContent = objectoFromData.cantidad;
            //estado
            insertarCelda = row.insertCell(5);
            insertarCelda.textContent = "pendiente";
            

            let insertarCeldaEliminar = row.insertCell(6);
            
            
            let botonEliminar = document.createElement("button")
            botonEliminar.setAttribute("class","bi bi-trash-fill")
            insertarCeldaEliminar.appendChild(botonEliminar);

            
            //evento para eliminar boton 
            botonEliminar.addEventListener("click", (event) => {
                //target me da el boton que preciono 
                //elimino de la tabla 
                var pregunta = window.confirm('¿Estas de que desea eliminarlo?');
                if (pregunta === true) {
                    console.log(event.target.parentNode.parentNode);
                    let fila = event.target.parentNode.parentNode;
                    
                    //borro en html
                    fila.remove();
                } 

                
                
                

            })

        }