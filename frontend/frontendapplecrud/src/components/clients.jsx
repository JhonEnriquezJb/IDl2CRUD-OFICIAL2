import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosSinToken } from "../helpers/axios";

import { useClients } from "../hooks/useClient";

const classes = {
  main: "list-client",
  title: "list-client__title",
  table: "list-client__table",
  headTh: "list-client__head-th",
  bodyTr: "list-client__body-tr",
  bodyTd: "list-client__body-td",
  edit: "list-client__edit",
  publish: "list-client__publish",
};

export const Clients = () => {
  const [clients, setClients] = useState([]);
  const { clients: listClients } = useClients();

  useEffect(() => {
    setClients(listClients);
  }, [listClients]);

  const onDelete = async (client) => {
    if (confirm(`¿Esta seguro de eliminar al cliente ${client.name} ?`)) {
      const resp = await axiosSinToken(`/clients/${client.id}`, {}, "DELETE");
      if (resp.ok) {
        alert(`Se Eliminó correctamente el cliente ${client.name}`);
        const newClients = listClients.filter(c => c.id !== client.id);
        setClients(newClients);
      }
    }
  };

  return (
    <>
        <h2 className={classes.title}>LISTA DE CLIENTES</h2>
    <div className={classes.main}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.headTh}>N°</th>
            <th className={classes.headTh}>Nombre</th>
            <th className={classes.headTh}>Apellidos</th>
            <th className={classes.headTh}>Edad</th>
            <th className={classes.headTh}>Genero</th>
            <th className={classes.headTh}>Email</th>
            <th className={classes.headTh}></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, idx) => (
            <tr key={`${client.id}-${client.name}`} className={classes.bodyTr}>
              <td className={classes.bodyTd}>{idx + 1}</td>
              <td className={classes.bodyTd}>{client.name}</td>
              <td className={`${classes.bodyTd}`}>{client.lastname}</td>
              <td className={classes.bodyTd}>{client.age}</td>
              <td className={classes.bodyTd}>{client.gender}</td>
              <td className={classes.bodyTd}>{client.email}</td>
              <td className={classes.bodyTd}>
                <Link to={"/form"} state={client}>
                  Editar
                </Link>
                <span onClick={() => onDelete(client)}>Eliminar</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/form">{'Crear Cliente >'}</a>
    </div>
    </>
  );
};


