import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import { mutate as mutateGlobal } from "swr";

interface User {
  id: number;
  name: string;
}

const UserList: React.FC = () => {
  const { data, mutate } = useFetch<User[]>('users');
  
  /*const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/users").then((response) => {
      response.json().then((users) => {
        setData(users);
      });
    });
  }, []);*/

  const handleNameChange = useCallback((id: number) => {
    api.put(`users/${id}`, { name: 'Miguel' });

    const updateUsers = data?.map(user =>{
      if(user.id === id){
        return { ...user, name: 'Miguel'}
      }
      return user;
    })
    mutate(updateUsers, false);
    mutateGlobal(`users/${id}`, { name: 'Miguel' })
  }, [data, mutate])

  if(!data) {
    return <p>Carregando ...</p>
  }

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>
          <button type="button" onClick={() => handleNameChange(user.id)}>
            Alterar nome
          </button>
        </li>
      ))}
    </ul>
  )

  /*const { data, mutate } = useFetch<User[]>('users');

  const handleNameChange = useCallback((id: number) => {
    api.put(`users/${id}`, { name: 'Bartolomeu' });

    const updatedUsers = data?.map(user => {
      if (user.id === id) {
        return { ...user, name: 'Bartolomeu' }
      }

      return user;
    })

    mutate(updatedUsers, false)
    mutateGlobal(`users/${id}`, { id, name: 'Bartolomeu' })
  }, [data, mutate]);

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>
            {user.name}
          </Link>
          <button type="button" onClick={() => handleNameChange(user.id)}>
            Alterar nome
          </button>
        </li>
      ))}
    </ul>
  );*/
}

export default UserList;
