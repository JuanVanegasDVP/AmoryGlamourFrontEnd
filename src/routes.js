/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";
import Estilista from "views/Estilistas";
import { layouts } from "chart.js";
import Proveedor from "views/Proveedores";
import Cliente from "views/Clientes";
import Horario from "views/Horarios";
import Usuarios from "views/Usuarios"; // Asegúrate de proporcionar la ruta correcta

// Resto de las importaciones de componentes


var routes = [
  {
    path: "/dashboard",
    name: "Página de inicio",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin" 
  },
  {
    path: "/usuarios", // Nueva ruta para usuarios
    name: "Usuarios", // Nombre del elemento en la barra lateral
    icon: "nc-icon nc-circle-10",
    component: <Usuarios />, // Componente asociado (debes importarlo)
    layout: "/admin" // Layout de tu aplicación
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  {
    path: "/estilista",
    name: "Estilistas",
    icon: "nc-icon nc-tie-bow",
    component: <Estilista/>,
    layout: "/admin"

  },
  {
    path: "/cliente",
    name: "Gestion de clientes",
    icon: "nc-icon nc-single-02",
    component: <Cliente />,
    layout: "/admin",
  },
  {
    path: "/horario",
    name: "Horarios",
    icon: "nc-icon nc-watch-time",
    component: <Horario />,
    layout: "/admin",
  },
  {
    path: "/proveedor",
    name: "Proveedores",
    icon: "nc-icon nc-delivery-fast",
    component: <Proveedor />,
    layout: "/admin",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "Perfil",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
];
export default routes;
