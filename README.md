
# IMDv-movie

IMDv-movie es una aplicación web que permite a los usuarios ver y buscar películas.

## Autores
IMDv-movie fue desarrollado por Manuel, Ana, Jorge.

## Rutas

1º Inicio de la app:
    http://localhost:3000/
Vista Bienvenida:
![Bienvenida.png](/public/assets/Bienvenida.png)

Desde esta pagina puedes Logearte, si ya eres usuario o registrarte. 

Vista de Login:
![Login.png](/public/assets/Login.png)

Vista de Registro:
![Register.png](/public/assets/Register.png)

Si te registras, al darle al botón iras a la pantalla de login donde tendras que logearte.

Resgistrate como Usuario porfavor.



3º 
Si te logeas con ADMIN:
    - En tu vista podras, crear peliculas, editar peliculas, borrar peliculas que esten en la base de datos (MONGODB).

Si te logeas como USER:
Iras a la vista Index, donde apareceran 3 botones,
Vista Dasboard Usuario:
![Register.png](/public/assets/Dashboard_User.png)
    - Mis peliculas favoritas: En desarrollo...
    - Buscador de peliculas: 
        al pulsar, iras a una vista donde aparece un input que podras rellenar con la pelicula que quieres buscar.

Vista Buscador:
![Dashboard](/public/assets/Buscador_Peliculas2.png)
    - Logout: que te devuelve al inicio.


Esperemos que la disfruteis!

Un saludo

En proceso de desarrollo:
    - Login con Google, Facebook,...
    - Guardar mis peliculas favoritas segun el usuario logeado
    - Mensaje de bienvenida al usuario logeado
    - Testing
    - Despliegue en Vercel


## Descripción


| Acción                                  | Reacción                                                          |
| --------------------------------------- | ------------------------------------------------------------------ |
| [Podrás Logearte](#) | Diferentes formas de conectarte. Con email y password o mediante Google. |
| [Podrás Buscar cualquier peliculas](#) | Usamos la APi de IMDB!!!.   |
| [Tendrás todos los detalles de las peliculas que quieras!](#) | Director, actores, año, opiniones, ranking...   |
| [Dispondrás de tus peliculas favoritas](#) | Añádelas a tus pelis favoritas para poder acceder a ellas en cualquier momento.   |
| [App adaptable](#) | Válido para todos los dispositivos: móvil, tablet o PC.
| [Dinos tus sugerencias](#) | Cualquier mejora o accion que te gustaría que se te ocurra haznosla llegar y valoraremos su implementacion. |

## Archivo principal
app.js

## Instalación

Para instalar las dependencias, ejecute el siguiente comando en su terminal:

npm install


## Scripts de desarrollo

- Para iniciar el servidor en modo desarrollo, ejecute:

npm run dev


## Repositorio

IMDv-movie es un proyecto de código abierto y se encuentra alojado en GitHub: https://github.com/MMurilloP/IMDv-movie

## Licencia
IMDv-movie está licenciado bajo la Licencia ISC.

## Información sobre errores
Para informar errores o realizar sugerencias, por favor visite la página de issues de IMDv-movie en Github: Issues IMDv-movie