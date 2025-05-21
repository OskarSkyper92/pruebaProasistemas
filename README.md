# pruebaProasistemas
1. Tener Docker instalado en el sistema (windows en este caso)
2. descargar/clonar el contenido del repositorio enviado por correo
3. en un terminal estando en carpeta principal/raiz ../pruebaProasistemas, digitamos el siguiente comando
"docker-compose up --build"
4. Solicitar al endpoint ya sea por postman o algun otra API 
"http://0.0.0.0:5000/create-order"
con el body: ej:
{
    "id": "OS63",
    "items": [
        {
            "name": "Resma",
            "productId": 1,
            "quantity": 20
        },
        {
            "name": "Lapiz",
            "productId": 3,
            "quantity": 10
        }
    ],
    "SN": "00001/19"
}