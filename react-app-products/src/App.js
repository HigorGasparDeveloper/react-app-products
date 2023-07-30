import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [dataTable, setDataTable] = useState([]);

  const changeName = event => {
    const value = event.target.value
    setName(value)
  }

  const changePrice = event => {
    const value = event.target.value
    setPrice(value)
  }

  const onSubmit = event => {
    event.preventDefault()
    //enviar dados para api via post
    //exibir mensagem na tela abaixo da div de form
    fetch('http://localhost/Projetos/Web/simple-exemple-default-structure-php/produto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_name: name,
        product_price: price
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta da API:', data);
        // Faça o que for necessário com a resposta da API
      })
      .catch(error => console.error('Erro ao fazer a requisição:', error));
  }

  useEffect(() => {
    //enviar requisicao get para api
    //pegar os dados
    renderDataAPI()
  }, []);
  

  const renderDataAPI = () => {
    //pegar os dados
    fetch('http://localhost/Projetos/Web/simple-exemple-default-structure-php/produto')
    .then(response => response.json())
    .then(data => {
      if (data.status == 200) {
        setDataTable(data.data)
      }
    })
    .catch(error => console.error('Erro ao obter os dados:', error));

    setTimeout(renderDataAPI, 1000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit} className='App-header-form'>
          <div className='App-div-input-form'>
            <label className='App-label-input-form'>Nome do produto</label>
            <input className='App-input-form' type='text' placeholder='Digite o nome...' value={name} onChange={changeName}/>
          </div>
          <div className='App-div-input-form'>
            <label className='App-label-input-form'>Preço do produto</label>
            <input className='App-input-form' type='number' placeholder='Digite o preço...' value={price} onChange={changePrice}/>
          </div>
          <div className='App-div-button-form'>
            <button className='App-button-form' type='submit'>Salvar</button>
          </div>
        </form>
      </header>
      <main className='App-body'>
        <div className='App-body-div-table'>
          <h1 className='App-body-table-title'>
            Produtos cadastrados no sistema
          </h1>
          <table border={1} className='App-body-table'>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Data de inserção</th>
              </tr>
            </thead>
            <tbody>
              {
                dataTable.map((row, index) => {
                  return (
                  <>
                    <tr key={row.id}>
                      <th>{row.id}</th>
                      <th>{row.product_name}</th>
                      <th>{row.product_price}</th>
                      <th>{row.recorded_datetime}</th>
                    </tr>
                  </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
